import { describe, expect, test } from "vite-plus/test";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";
import { st17BoaHancock004 } from "../../../../cards/src/cards/characters/st17-004-boa-hancock.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST17-004 Boa Hancock", () => {
  test("[On Play] rearranges the top 3 cards, then gives a rested DON!! to a Seven Warlords card", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        hand: [st17BoaHancock004],
        activeDon: 8,
        restedDon: 2,
        deck: 5,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(st17BoaHancock004, "south");
    const hancockId = engine.findCardInZone("south", "character", st17BoaHancock004);

    const order = engine.pendingDecision("effectRearrangeDeckOrder", "south").steps[0];
    if (order?.kind !== "orderItems") throw new Error("Expected Hancock's three-card order.");
    expect(order.candidates).toHaveLength(3);
    const chosenOrder = order.candidates.map((candidate) => candidate.ref.id).reverse();
    engine.resolveDecision("effectRearrangeDeckOrder", { selectedIds: chosenOrder }, "south");
    engine.resolveDecision("effectRearrangeDeckPosition", { optionId: "bottom" }, "south");
    expect(engine.getState().players.south.deck.slice(-3)).toEqual(chosenOrder);

    // Hancock herself is the only {The Seven Warlords of the Sea} card on the field.
    engine.resolveDecision("effectGiveDonCount", { optionId: "1" }, "south");
    expect(engine.getState().cards[hancockId]!.attachedDon).toBe(1);
    expect(engine.getView("south").players.south).toMatchObject({ restedDon: 5 });
  });
});
