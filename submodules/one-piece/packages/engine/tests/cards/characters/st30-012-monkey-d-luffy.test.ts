import { describe, expect, test } from "vite-plus/test";
import { eb01TonyTonyChopper006 } from "@tcg/op-cards";
import { st30MonkeyDLuffy012 } from "../../../../cards/src/cards/characters/st30-012-monkey-d-luffy.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("ST30-012 Monkey.D.Luffy", () => {
  test("[On Play] rests a DON!! for [Rush], and [When Attacking] rests an opposing [Blocker]", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st30MonkeyDLuffy012], activeDon: 5 },
      { character: [{ card: eb01TonyTonyChopper006, playedOnTurn: 0 }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const chopperId = engine.findCardInZone("north", "character", eb01TonyTonyChopper006);

    engine.playCard(st30MonkeyDLuffy012, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const luffyId = engine.findCardInZone("south", "character", st30MonkeyDLuffy012);
    expect(getKeywords(engine.getState(), luffyId)).toContain("rush");
    expect(engine.getView("south").players.south.restedDon).toBe(5);

    engine.declareAttack(luffyId, engine.leader("north"), "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected the Blocker to rest.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([chopperId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [chopperId] }, "south");

    const view = engine.getView("south");
    expect(
      view.players.north.characters.find((card) => card?.instanceId === chopperId)?.rested,
    ).toBe(true);
    // A rested Blocker cannot block: straight to the Counter step.
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });

  test("[On Play] may keep the DON!! and Luffy cannot attack this turn", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st30MonkeyDLuffy012], activeDon: 5 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st30MonkeyDLuffy012, "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");
    const luffyId = engine.findCardInZone("south", "character", st30MonkeyDLuffy012);

    expect(getKeywords(engine.getState(), luffyId)).not.toContain("rush");
    expect(engine.getView("south").players.south.activeDon).toBe(1);
    engine.expectFailure({
      type: "declareAttack",
      seat: "south",
      attackerId: luffyId,
      targetId: engine.leader("north"),
    });
  });
});
