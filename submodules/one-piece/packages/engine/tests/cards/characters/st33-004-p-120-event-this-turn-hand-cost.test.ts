import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import type { CharacterCard } from "@tcg/op-types";
import { pSanji120 } from "../../../../cards/src/cards/characters/p-120-sanji.ts";
import { st33Borsalino004 } from "../../../../cards/src/cards/characters/st33-004-borsalino.ts";

import { registerCards } from "../../../../cards/src/runtime-catalog.ts";
import { OnePieceTestEngine } from "../../../src/index.ts";
import { getCardCost } from "../../../src/shared.ts";
import { SOUTH_ATTACKS_WITHOUT_TURN_SETUP } from "../events/battle-fixture.shared.ts";

// A stand-in for any effect that trashes a card from its controller's hand.
const handTrasher: CharacterCard = {
  ...eb01Doma005,
  id: "TEST-HAND-TRASHER",
  canonicalId: "TEST-HAND-TRASHER",
  name: "Hand Trasher Test",
  cost: 0,
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [{ action: "trashFromHand", player: "self", amount: 1 }],
      },
    ],
  },
};

registerCards([handTrasher]);

describe("hand cost reductions keyed to an event earlier this turn", () => {
  test("ST33-004 costs 3 less once a card in hand was trashed by an effect this turn", () => {
    const engine = OnePieceTestEngine.create({
      hand: [handTrasher, eb01Doma005, st33Borsalino004],
      activeDon: 1,
    });
    const borsalinoId = engine.findCardInZone("south", "hand", st33Borsalino004);
    const fodderId = engine.findCardInZone("south", "hand", eb01Doma005);
    expect(getCardCost(engine.getState(), borsalinoId)).toBe(st33Borsalino004.cost);

    engine.playCard(handTrasher);
    engine.resolveDecision("effectTrashFromHandSelection", { selectedIds: [fodderId] }, "south");

    expect(getCardCost(engine.getState(), borsalinoId)).toBe(st33Borsalino004.cost - 3);
  });

  test("P-120 costs 2 less once a card left the opponent's Life this turn", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pSanji120] },
      { life: 2 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const sanjiId = engine.findCardInZone("south", "hand", pSanji120);
    expect(getCardCost(engine.getState(), sanjiId)).toBe(pSanji120.cost);

    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");

    expect(engine.getView("south").players.north.lifeCount).toBe(1);
    expect(getCardCost(engine.getState(), sanjiId)).toBe(pSanji120.cost - 2);
  });
});
