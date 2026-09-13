import { describe, expect, test } from "vite-plus/test";
import {
  eb01Doma005,
  eb01Fourtricks025,
  op04Chaka008,
  op14eb04NefeltariVivi025,
} from "@tcg/op-cards";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("EB04-025 Nefeltari Vivi", () => {
  test("plays an eligible non-Vivi Alabasta Character, then the opponent places one of their own hand cards at the bottom of their deck", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [op14eb04NefeltariVivi025, op04Chaka008, op14eb04NefeltariVivi025],
        activeDon: 7,
      },
      { hand: [eb01Doma005, eb01Fourtricks025] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const playableId = engine.findCardInZone("south", "hand", op04Chaka008);
    const excludedViviId = engine
      .getState()
      .players.south.hand.find(
        (instanceId) =>
          instanceId !== engine.findCardInZone("south", "hand", op14eb04NefeltariVivi025) &&
          engine.getState().cards[instanceId]?.cardId === op14eb04NefeltariVivi025.id,
      );
    const bottomedId = engine.findCardInZone("north", "hand", eb01Doma005);
    const northDeckBefore = engine.getView("north").players.north.deckCount;

    engine.playCard(op14eb04NefeltariVivi025, "south");

    const play = engine.pendingDecision("effectPlaySelection", "south").steps[0];
    expect(play?.kind).toBe("selectEntity");
    if (play?.kind !== "selectEntity") throw new Error("Expected Vivi's Alabasta play choice.");
    expect(play.candidates.map((candidate) => candidate.ref.id)).toEqual([playableId]);
    expect(play.candidates.map((candidate) => candidate.ref.id)).not.toContain(excludedViviId);
    engine.resolveDecision("effectPlaySelection", { selectedIds: [playableId] }, "south");

    const handChoice = engine.pendingDecision("effectTargetSelection", "north").steps[0];
    expect(handChoice?.kind).toBe("selectEntity");
    if (handChoice?.kind !== "selectEntity") {
      throw new Error("Expected the opponent's own-hand choice.");
    }
    expect(handChoice.candidates.map((candidate) => candidate.ref.id)).toEqual(
      engine.getState().players.north.hand,
    );
    engine.resolveDecision("effectTargetSelection", { selectedIds: [bottomedId] }, "north");

    const southView = engine.getView("south");
    const northView = engine.getView("north");
    expect(
      southView.players.south.characters.find((card) => card?.instanceId === playableId),
    ).toBeDefined();
    expect(southView.players.south.hand).toHaveLength(1);
    expect(northView.players.north.hand.map((card) => card.instanceId)).not.toContain(bottomedId);
    expect(northView.players.north.deckCount).toBe(northDeckBefore + 1);
    expect(engine.getState().players.north.deck.at(-1)).toBe(bottomedId);
    expect(southView.prompts).toHaveLength(0);
    expect(northView.prompts).toHaveLength(0);
  });

  test("still makes the opponent bottom a card after the optional play is declined", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [op14eb04NefeltariVivi025, op04Chaka008], activeDon: 7 },
      { hand: [eb01Doma005] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const declinedId = engine.findCardInZone("south", "hand", op04Chaka008);
    const bottomedId = engine.findCardInZone("north", "hand", eb01Doma005);

    engine.playCard(op14eb04NefeltariVivi025, "south");
    engine.resolveDecision("effectPlaySelection", { selectedIds: [] }, "south");

    expect(engine.getView("south").players.south.hand.map((card) => card.instanceId)).toContain(
      declinedId,
    );
    expect(engine.getView("north").players.north.hand).toHaveLength(0);
    expect(engine.getState().players.north.deck.at(-1)).toBe(bottomedId);
    expect(engine.getView("south").prompts).toHaveLength(0);
  });
});
