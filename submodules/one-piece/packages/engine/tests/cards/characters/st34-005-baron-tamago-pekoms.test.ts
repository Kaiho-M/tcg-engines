import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st34BaronTamagoPekoms005 } from "../../../../cards/src/cards/characters/st34-005-baron-tamago-pekoms.ts";
import { st36Bartolomeo004 } from "../../../../cards/src/cards/characters/st36-004-bartolomeo.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST34-005 Baron Tamago & Pekoms", () => {
  test("[When Attacking] DON!! -1 K.O.s an opposing Character with 2000 base power or less", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st34BaronTamagoPekoms005, playedOnTurn: 0 }], activeDon: 2 },
      {
        character: [
          { card: eb01Doma005, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0 },
          { card: st36Bartolomeo004, playedOnTurn: 0 },
        ],
        hand: 1,
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const tamagoId = engine.findCardInZone("south", "character", st34BaronTamagoPekoms005);
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);
    const bartoId = engine.findCardInZone("north", "character", st36Bartolomeo004);
    const donDeckBefore = engine.getView("south").players.south.donDeckCount;

    engine.declareAttack(tamagoId, engine.leader("north"), "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    try {
      engine.resolveDecision("effectCostReturnDon", { selectedIds: ["active-don:0"] }, "south");
    } catch {
      // The DON!! is returned automatically when only one payment is possible.
    }
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected the K.O. target.");
    // Doma (3000) and Mountain God (7000) are above 2000 base power.
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([bartoId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [bartoId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.donDeckCount).toBe(donDeckBefore + 1);
    expect(view.players.north.characters.map((card) => card?.instanceId)).toContain(domaId);
    expect(view.players.north.characters.map((card) => card?.instanceId)).not.toContain(bartoId);
    expect(view.players.north.trash.map((card) => card.instanceId)).toContain(bartoId);
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });

  test("[When Attacking] may decline paying DON!! -1", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st34BaronTamagoPekoms005, playedOnTurn: 0 }], activeDon: 2 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const tamagoId = engine.findCardInZone("south", "character", st34BaronTamagoPekoms005);
    const before = engine.getView("south").players.south;

    engine.declareAttack(tamagoId, engine.leader("north"), "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const after = engine.getView("south").players.south;
    expect(after.activeDon + after.restedDon).toBe(before.activeDon + before.restedDon);
    expect(after.donDeckCount).toBe(before.donDeckCount);
    expect(engine.getView("south").players.north.characters.filter(Boolean)).toHaveLength(1);
  });
});
