import { describe, expect, test } from "vite-plus/test";
import { op06Tashigi050 } from "../../../../cards/src/cards/OP06/characters/050-tashigi.ts";
import { op12MonkeyDGarp056 } from "../../../../cards/src/cards/OP12/characters/056-monkey-d-garp.ts";
import { op12Kuzan040 } from "../../../../cards/src/cards/OP12/leaders/040-kuzan.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP12-040 Kuzan", () => {
  test("draws when a hand card is trashed as the cost of a {Navy} card's effect (Garp OP12-056)", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op12Kuzan040,
        hand: [op12MonkeyDGarp056, op06Tashigi050, op06Tashigi050],
        activeDon: 10,
        deck: 5,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(op12MonkeyDGarp056, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const costId = engine.findCardInZone("south", "hand", op06Tashigi050);
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [costId] }, "south");
    // Decline Garp's optional play so only Kuzan's draw changes the hand.
    engine.resolveDecision("effectPlaySelection", { selectedIds: [] }, "south");

    const south = engine.getView("south").players.south;
    expect(south.trash.map((card) => card.instanceId)).toContain(costId);
    // 3 in hand − Garp − Tashigi + 1 drawn by Kuzan
    expect(south.hand).toHaveLength(2);
    expect(south.deckCount).toBe(4);
  });
});
