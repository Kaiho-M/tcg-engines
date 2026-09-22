import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st33Smoker003 } from "../../../../cards/src/cards/characters/st33-003-smoker.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST33-003 Smoker", () => {
  test("[On Play] trashes a card from hand to bottom-deck up to 2 opposing Characters with cost 2 or less", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st33Smoker003, eb01Doma005, eb01MountainGod018], activeDon: 2 },
      {
        character: [
          { card: eb01Doma005, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0 },
        ],
        deck: 3,
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const paymentId = engine.findCardInZone("south", "hand", eb01Doma005);
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(st33Smoker003, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [paymentId] }, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Smoker's return target.");
    // Mountain God costs 5 and is not a legal target.
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([domaId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [domaId] }, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.map((card) => card?.instanceId)).not.toContain(domaId);
    expect(view.players.north.deckCount).toBe(4);
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(paymentId);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] may be declined so nothing leaves the field", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st33Smoker003, eb01Doma005], activeDon: 2 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }], deck: 3 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(st33Smoker003, "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.map((card) => card?.instanceId)).toContain(domaId);
    expect(view.players.north.deckCount).toBe(3);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });
});
