import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, op06Shanks007 } from "@tcg/op-cards";
import { op15eb04Enel060 } from "../../../../cards/src/cards/OP15EB04/characters/060-enel.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("OP15-060 Enel", () => {
  test("gains +2000 power and cannot be removed by opponent effects with 6 or less DON!! on the field", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [op06Shanks007], activeDon: op06Shanks007.cost },
      { character: [op15eb04Enel060, eb01Doma005], activeDon: 4, restedDon: 2 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const enelId = engine.findCardInZone("north", "character", op15eb04Enel060);
    const otherId = engine.findCardInZone("north", "character", eb01Doma005);

    expect(
      engine.getView("north").players.north.characters.find((card) => card?.instanceId === enelId)
        ?.power,
    ).toBe(10000);

    engine.playCard(op06Shanks007, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Shanks' K.O. target.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([otherId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [otherId] }, "south");

    const view = engine.getView("north");
    expect(view.players.north.characters.map((card) => card?.instanceId)).toContain(enelId);
    expect(view.players.north.trash.map((card) => card.instanceId)).toContain(otherId);
    expect(view.prompts).toHaveLength(0);
  });

  test("has no bonus and can be K.O.'d with 7 or more DON!! on the field", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [op06Shanks007], activeDon: op06Shanks007.cost },
      { character: [op15eb04Enel060], activeDon: 7 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const enelId = engine.findCardInZone("north", "character", op15eb04Enel060);

    expect(
      engine.getView("north").players.north.characters.find((card) => card?.instanceId === enelId)
        ?.power,
    ).toBe(8000);

    engine.playCard(op06Shanks007, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Shanks' K.O. target.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([enelId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [enelId] }, "south");

    expect(engine.getView("north").players.north.trash.map((card) => card.instanceId)).toContain(
      enelId,
    );
  });

  test("counts DON!! given to Characters as DON!! on the field", () => {
    const engine = OnePieceTestEngine.create(
      { character: [op15eb04Enel060], activeDon: 6, donDeckCount: 0 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const enelId = engine.findCardInZone("south", "character", op15eb04Enel060);

    engine.attachDon(enelId, 1, "south");
    // 6 DON!! on the field (5 active + 1 given): base 8000 + 2000 + 1000 from the given DON!!.
    expect(
      engine.getView("south").players.south.characters.find((card) => card?.instanceId === enelId)
        ?.power,
    ).toBe(11000);
  });

  test("[Activate: Main] DON!! -1 grants Blocker through the opponent's next End Phase and trashes a card", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [op15eb04Enel060],
        hand: [eb01Doma005],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const enelId = engine.findCardInZone("south", "character", op15eb04Enel060);
    const handId = engine.findCardInZone("south", "hand", eb01Doma005);

    const donDeckBefore = engine.getView("south").players.south.donDeckCount;

    engine.activateEffect(enelId, "activateMain", "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(0);
    expect(view.players.south.donDeckCount).toBe(donDeckBefore + 1);
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(handId);
    expect(view.prompts).toHaveLength(0);
    expect(getKeywords(engine.getState(), enelId).has("blocker")).toBe(true);

    engine.endTurn("south");
    expect(getKeywords(engine.getState(), enelId).has("blocker")).toBe(true);
    engine.endTurn("north");
    expect(getKeywords(engine.getState(), enelId).has("blocker")).toBe(false);
  });
});
