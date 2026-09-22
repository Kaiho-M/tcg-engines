import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st33MonkeyDGarp005 } from "../../../../cards/src/cards/characters/st33-005-monkey-d-garp.ts";
import { st33Koby001 } from "../../../../cards/src/cards/characters/st33-001-koby.ts";
import { op02Smoker093 } from "../../../../cards/src/cards/leaders/op02-093-smoker.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST33-005 Monkey.D.Garp", () => {
  test("[On Play] under a Navy Leader plays a blue Navy Character with 8000 power or less from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op02Smoker093,
        hand: [st33MonkeyDGarp005, st33Koby001, st33MonkeyDGarp005, eb01Doma005],
        activeDon: 6,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const kobyId = engine.findCardInZone("south", "hand", st33Koby001);

    engine.playCard(st33MonkeyDGarp005, "south");
    const play = engine.pendingDecision("effectPlaySelection", "south").steps[0];
    if (play?.kind !== "selectEntity") throw new Error("Expected Garp's play choice.");
    // The other Garp is excluded by name and Doma is red.
    expect(play.candidates.map((candidate) => candidate.ref.id)).toEqual([kobyId]);
    engine.resolveDecision("effectPlaySelection", { selectedIds: [kobyId] }, "south");
    // Koby's own [On Play] "you may trash 1 card" then opens; decline it.
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(kobyId);
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.south.activeDon).toBe(0);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] under another Leader plays nothing", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st33MonkeyDGarp005, st33Koby001], activeDon: 6 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st33MonkeyDGarp005, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.filter(Boolean)).toHaveLength(1);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] may play nothing (up to 1)", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op02Smoker093, hand: [st33MonkeyDGarp005, st33Koby001], activeDon: 6 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st33MonkeyDGarp005, "south");
    engine.resolveDecision("effectPlaySelection", { selectedIds: [] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.filter(Boolean)).toHaveLength(1);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });
});
