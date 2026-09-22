import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { pRoronoaZoro141 } from "../../../../cards/src/cards/characters/p-141-roronoa-zoro.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("P-141 Roronoa Zoro", () => {
  test("[On Play] gives an opposing Character -1000 power and can attack at once with [Rush]", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pRoronoaZoro141], activeDon: 7 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0, rested: true }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(pRoronoaZoro141, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Zoro's power target.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([
      engine.leader("north"),
      domaId,
    ]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [domaId] }, "south");

    const zoroId = engine.findCardInZone("south", "character", pRoronoaZoro141);
    const view = engine.getView("south");
    expect(view.players.north.characters.find((card) => card?.instanceId === domaId)?.power).toBe(
      2000,
    );
    expect(view.players.south.activeDon).toBe(0);
    engine.declareAttack(zoroId, domaId, "south");
    expect(engine.getState().battle?.attackerId).toBe(zoroId);
  });

  test("[On Play] may pick no target and the opponent keeps its power", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pRoronoaZoro141], activeDon: 7 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(pRoronoaZoro141, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [] }, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.find((card) => card?.instanceId === domaId)?.power).toBe(
      3000,
    );
    expect(view.players.north.leader.power).toBe(5000);
    expect(view.prompts).toHaveLength(0);
  });
});
