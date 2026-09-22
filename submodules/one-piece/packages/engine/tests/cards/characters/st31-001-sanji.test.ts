import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st31Sanji001 } from "../../../../cards/src/cards/characters/st31-001-sanji.ts";
import { st29Jinbe005 } from "../../../../cards/src/cards/characters/st29-005-jinbe.ts";
import { st29NicoRobin009 } from "../../../../cards/src/cards/characters/st29-009-nico-robin.ts";
import { st29Sanji004 } from "../../../../cards/src/cards/characters/st29-004-sanji.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("ST31-001 Sanji", () => {
  test("[On Play] draws 1 and plays a Straw Hat Crew Character with cost 5 or less other than [Sanji] from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st31Sanji001, st29Sanji004, eb01Doma005],
        deck: [st29Jinbe005, eb01Doma005],
        activeDon: 5,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const jinbeId = engine.findCardInZone("south", "deck", st29Jinbe005);

    engine.playCard(st31Sanji001, "south");
    // The drawn Jinbe (cost 6) is too expensive, the other Sanji is excluded by name and
    // Doma is not Straw Hat Crew: nothing can be played, so no choice opens.
    expect(engine.getView("south").prompts).toHaveLength(0);

    const view = engine.getView("south");
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(jinbeId);
    expect(view.players.south.hand).toHaveLength(3);
    expect(view.players.south.deckCount).toBe(1);
  });

  test("[On Play] plays a legal Straw Hat Crew Character from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st31Sanji001, st29NicoRobin009, st29Sanji004],
        deck: [eb01Doma005, eb01Doma005],
        activeDon: 5,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const robinId = engine.findCardInZone("south", "hand", st29NicoRobin009);

    engine.playCard(st31Sanji001, "south");
    const play = engine.pendingDecision("effectPlaySelection", "south").steps[0];
    if (play?.kind !== "selectEntity") throw new Error("Expected Sanji's play choice.");
    // Robin (cost 4, Straw Hat Crew) qualifies; the other Sanji is excluded by name.
    expect(play.candidates.map((candidate) => candidate.ref.id)).toEqual([robinId]);
    engine.resolveDecision("effectPlaySelection", { selectedIds: [robinId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(robinId);
    expect(view.players.south.characters.filter(Boolean)).toHaveLength(2);
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.prompts).toHaveLength(0);
  });

  test("[DON!! x2] grants [Rush]", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st31Sanji001, playedOnTurn: 0 }], activeDon: 2 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const sanjiId = engine.findCardInZone("south", "character", st31Sanji001);
    expect(getKeywords(engine.getState(), sanjiId)).not.toContain("rush");

    engine.attachDon(sanjiId, 2, "south");
    expect(getKeywords(engine.getState(), sanjiId)).toContain("rush");
  });
});
