import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st21RoronoaZoro015 } from "../../../../cards/src/cards/characters/st21-015-roronoa-zoro.ts";
import { pRoronoaZoro141 } from "../../../../cards/src/cards/characters/p-141-roronoa-zoro.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("ST21-015 Roronoa Zoro", () => {
  test("[DON!! x2] grants [Rush] so it can attack the turn it is played", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st21RoronoaZoro015], activeDon: 6 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st21RoronoaZoro015, "south");
    const zoroId = engine.findCardInZone("south", "character", st21RoronoaZoro015);
    expect(getKeywords(engine.getState(), zoroId)).not.toContain("rush");
    engine.expectFailure({
      type: "declareAttack",
      seat: "south",
      attackerId: zoroId,
      targetId: engine.leader("north"),
    });

    engine.attachDon(zoroId, 2, "south");
    expect(getKeywords(engine.getState(), zoroId)).toContain("rush");
    engine.declareAttack(zoroId, engine.leader("north"), "south");
    expect(engine.getState().battle?.attackerId).toBe(zoroId);
  });

  test("[On K.O.] plays a red Character with 6000 power or less other than [Roronoa Zoro] from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st21RoronoaZoro015, playedOnTurn: 0, rested: true }],
        hand: [eb01Doma005, pRoronoaZoro141],
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const zoroId = engine.findCardInZone("south", "character", st21RoronoaZoro015);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);
    const domaId = engine.findCardInZone("south", "hand", eb01Doma005);

    engine.declareAttack(godId, zoroId, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
    const play = engine.pendingDecision("effectPlaySelection", "south").steps[0];
    if (play?.kind !== "selectEntity") throw new Error("Expected Zoro's replacement play.");
    // The other Zoro in hand is excluded by name.
    expect(play.candidates.map((candidate) => candidate.ref.id)).toEqual([domaId]);
    engine.resolveDecision("effectPlaySelection", { selectedIds: [domaId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(domaId);
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(zoroId);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });
});
