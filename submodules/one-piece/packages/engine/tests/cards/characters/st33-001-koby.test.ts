import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st33Koby001 } from "../../../../cards/src/cards/characters/st33-001-koby.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("ST33-001 Koby", () => {
  test("[On Play] trashes a card from hand to draw 1, and has [Blocker]", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st33Koby001, eb01Doma005, eb01MountainGod018], deck: 5, activeDon: 2 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("south", "hand", eb01Doma005);

    engine.playCard(st33Koby001, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [domaId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(domaId);
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.south.deckCount).toBe(4);
    expect(
      getKeywords(engine.getState(), engine.findCardInZone("south", "character", st33Koby001)),
    ).toContain("blocker");
  });

  test("[On Play] may be declined and the hand stays as it was", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st33Koby001, eb01Doma005, eb01MountainGod018], deck: 5, activeDon: 2 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st33Koby001, "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.players.south.trash).toHaveLength(0);
    expect(view.prompts).toHaveLength(0);
  });
});
