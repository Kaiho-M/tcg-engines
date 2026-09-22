import { describe, expect, test } from "vite-plus/test";
import {
  eb01Doma005,
  op06Tashigi050,
  op12Kuzan040,
  op12MonkeyDGarp056,
  op12ZephyrNavy046,
} from "@tcg/op-cards";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP12-040 Kuzan", () => {
  test("draws the same number after a Navy effect trashes multiple cards from hand", () => {
    const engine = OnePieceTestEngine.create({
      leaderCardId: op12Kuzan040,
      hand: [op12ZephyrNavy046, eb01Doma005, eb01Doma005],
      deck: [eb01Doma005, eb01Doma005],
      activeDon: 5,
    });
    const zephyrId = engine.findCardInZone("south", "hand", op12ZephyrNavy046);
    const paymentIds = engine
      .getView("south")
      .players.south.hand.filter((card) => card.cardId === eb01Doma005.id)
      .map((card) => card.instanceId)
      .filter((id): id is string => Boolean(id));

    engine.playCard(op12ZephyrNavy046, "south");

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.south.trash.map((card) => card.instanceId)).toEqual(
      expect.arrayContaining(paymentIds),
    );
    expect(view.players.south.characters.some((card) => card?.instanceId === zephyrId)).toBe(true);
    expect(engine.getState().capabilityHistory).toHaveLength(0);
  });

  // Garp OP12-056: "[On Play] You may trash 1 card from your hand: Play up to 1 blue
  // "Navy" type Character card with 8000 power or less other than [Monkey.D.Garp] from
  // your hand." Paying that cost trashes a card from hand by a Navy card's effect.
  test("draws when a hand card is trashed as the cost of a Navy card's effect", () => {
    const engine = OnePieceTestEngine.create({
      leaderCardId: op12Kuzan040,
      hand: [op12MonkeyDGarp056, op06Tashigi050, op06Tashigi050],
      deck: [eb01Doma005, eb01Doma005, eb01Doma005],
      activeDon: 8,
    });

    engine.asSouth().play(op12MonkeyDGarp056);
    engine.asSouth().acceptOptional();
    const costId = engine.asSouth().findInZone("hand", op06Tashigi050);
    engine.asSouth().choose("effectCostTrashFromHand", [costId]);
    // Decline Garp's play so only Kuzan's draw changes the hand.
    engine.asSouth().chooseNoPlay();

    const south = engine.asSouth().view().players.south;
    expect(south.trash.map((card) => card.instanceId)).toContain(costId);
    // 3 in hand, minus Garp and the trashed Tashigi, plus Kuzan's draw.
    expect(south.hand).toHaveLength(2);
    expect(south.deckCount).toBe(2);
    expect(engine.asSouth().view().prompts).toHaveLength(0);
    expect(engine.getState().capabilityHistory).toHaveLength(0);
  });

  test("does not draw when the optional cost is declined", () => {
    const engine = OnePieceTestEngine.create({
      leaderCardId: op12Kuzan040,
      hand: [op12MonkeyDGarp056, op06Tashigi050],
      deck: [eb01Doma005, eb01Doma005],
      activeDon: 8,
    });

    engine.asSouth().play(op12MonkeyDGarp056);
    engine.asSouth().declineOptional();

    const south = engine.asSouth().view().players.south;
    expect(south.hand).toHaveLength(1);
    expect(south.trash).toHaveLength(0);
    expect(south.deckCount).toBe(2);
    expect(engine.asSouth().view().prompts).toHaveLength(0);
  });
});
