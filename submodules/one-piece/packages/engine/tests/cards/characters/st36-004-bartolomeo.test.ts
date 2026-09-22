import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st36Bartolomeo004 } from "../../../../cards/src/cards/characters/st36-004-bartolomeo.ts";
import { st36Killer002 } from "../../../../cards/src/cards/characters/st36-002-killer.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST36-004 Bartolomeo", () => {
  test("[On Play] trashes a Supernovas card from hand to draw 2", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st36Bartolomeo004, st36Killer002, st36Killer002, eb01Doma005], deck: 5, activeDon: 1 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const killerId = engine.findCardInZone("south", "hand", st36Killer002);

    engine.playCard(st36Bartolomeo004, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const payment = engine.pendingDecision("effectCostTrashFromHand", "south").steps[0];
    if (payment?.kind !== "payCost") throw new Error("Expected Bartolomeo's hand-trash payment.");
    // Doma is not a Supernovas card and cannot pay.
    expect(payment.candidates.map((candidate) => candidate.ref.id)).toContain(killerId);
    expect(payment.candidates).toHaveLength(2);
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [killerId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(killerId);
    expect(view.players.south.hand).toHaveLength(4);
    expect(view.players.south.deckCount).toBe(3);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] may be declined", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st36Bartolomeo004, st36Killer002], deck: 5, activeDon: 1 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st36Bartolomeo004, "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.players.south.trash).toHaveLength(0);
  });
});
