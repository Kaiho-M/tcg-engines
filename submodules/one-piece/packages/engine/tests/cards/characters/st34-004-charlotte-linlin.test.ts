import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st34CharlotteLinlin004 } from "../../../../cards/src/cards/characters/st34-004-charlotte-linlin.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

function payDonMinusFour(engine: OnePieceTestEngine) {
  try {
    engine.resolveDecision(
      "effectCostReturnDon",
      { selectedIds: ["active-don:0", "active-don:1", "active-don:2", "active-don:3"] },
      "south",
    );
  } catch {
    // Paid automatically when exactly four DON!! are available.
  }
}

describe("ST34-004 Charlotte Linlin", () => {
  test("[On Play] DON!! -4 and a hand card: adds the top deck card to Life, then an opposing Character's base power becomes 0", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st34CharlotteLinlin004, eb01Doma005, eb01MountainGod018],
        deck: 3,
        life: 2,
        activeDon: 10,
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);
    const paymentId = engine.findCardInZone("south", "hand", eb01Doma005);
    const donDeckBefore = engine.getView("south").players.south.donDeckCount;

    engine.playCard(st34CharlotteLinlin004, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    payDonMinusFour(engine);
    try {
      engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [paymentId] }, "south");
    } catch {
      // The hand card is trashed automatically alongside the DON!! payment.
    }
    engine.resolveDecision("effectAddToLifeFromDeck", { optionId: "1" }, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [godId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.donDeckCount).toBe(donDeckBefore + 4);
    expect(view.players.south.trash).toHaveLength(1);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.lifeCount).toBe(3);
    expect(view.players.north.characters.find((card) => card?.instanceId === godId)?.power).toBe(0);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] may be declined", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st34CharlotteLinlin004, eb01Doma005, eb01MountainGod018],
        deck: 3,
        life: 2,
        activeDon: 10,
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);
    const donDeckBefore = engine.getView("south").players.south.donDeckCount;

    engine.playCard(st34CharlotteLinlin004, "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.donDeckCount).toBe(donDeckBefore);
    expect(view.players.south.lifeCount).toBe(2);
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.north.characters.find((card) => card?.instanceId === godId)?.power).toBe(
      7000,
    );
  });
});
