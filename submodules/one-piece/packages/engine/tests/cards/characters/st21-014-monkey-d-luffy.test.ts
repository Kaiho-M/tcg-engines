import { describe, expect, test } from "vite-plus/test";
import { st21MonkeyDLuffy014 } from "../../../../cards/src/cards/characters/st21-014-monkey-d-luffy.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST21-014 Monkey.D.Luffy", () => {
  test("[Rush] attacks the turn it is played and [When Attacking] gives a rested DON!! to the Leader", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st21MonkeyDLuffy014], activeDon: 5, restedDon: 1 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st21MonkeyDLuffy014, "south");
    const luffyId = engine.findCardInZone("south", "character", st21MonkeyDLuffy014);
    engine.declareAttack(luffyId, engine.leader("north"), "south");
    engine.resolveDecision("effectGiveDonCount", { optionId: "1" }, "south");
    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [engine.leader("south")] },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.south.leader.attachedDon).toBe(1);
    // The 5 DON!! paid for Luffy rest, so the pool holds 6 rested minus the 1 given.
    expect(view.players.south.restedDon).toBe(5);
    expect(engine.getState().battle?.attackerId).toBe(luffyId);
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });

  test("[When Attacking] may give no DON!! (up to 1)", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st21MonkeyDLuffy014, playedOnTurn: 0 }], restedDon: 1 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const luffyId = engine.findCardInZone("south", "character", st21MonkeyDLuffy014);

    engine.declareAttack(luffyId, engine.leader("north"), "south");
    engine.resolveDecision("effectGiveDonCount", { optionId: "0" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(0);
    expect(view.players.south.restedDon).toBe(1);
    expect(view.players.south.leader.attachedDon).toBe(0);
  });
});
