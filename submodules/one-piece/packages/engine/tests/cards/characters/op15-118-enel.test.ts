import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01Fourtricks025, eb01MountainGod018, op06Shanks007 } from "@tcg/op-cards";
import { op15Enel118 } from "../../../../cards/src/cards/characters/op15-118-enel.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP15-118 Enel", () => {
  test("gains +2000 power and cannot be removed by opponent effects with 6 or less DON!! on the field", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [op06Shanks007], activeDon: op06Shanks007.cost },
      { character: [op15Enel118, eb01Doma005], activeDon: 6 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const enelId = engine.findCardInZone("north", "character", op15Enel118);
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
    expect(view.prompts).toHaveLength(0);
  });

  test("has no bonus with 7 or more DON!! on the field", () => {
    const engine = OnePieceTestEngine.create(
      { character: [op15Enel118], activeDon: 7 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const enelId = engine.findCardInZone("south", "character", op15Enel118);

    expect(
      engine.getView("south").players.south.characters.find((card) => card?.instanceId === enelId)
        ?.power,
    ).toBe(8000);
  });

  test("[On Play] DON!! -1 looks at 5, adds 1 to hand, bottoms the rest, then trashes 1 from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [op15Enel118, eb01Doma005],
        deck: [
          eb01Fourtricks025,
          eb01Doma005,
          eb01MountainGod018,
          eb01Doma005,
          eb01Doma005,
          eb01MountainGod018,
        ],
        activeDon: op15Enel118.cost + 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const wantedId = engine.findCardInZone("south", "deck", eb01Fourtricks025);
    const keptId = engine.findCardInZone("south", "hand", eb01Doma005);
    const donDeckBefore = engine.getView("south").players.south.donDeckCount;

    engine.playCard(op15Enel118, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostReturnDon", { selectedIds: ["active-don:0"] }, "south");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected Enel's search choice.");
    expect(search).toMatchObject({ min: 0, max: 1 });
    expect(search.candidates).toHaveLength(5);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [wantedId] }, "south");

    const order = engine
      .getState()
      .promptQueue.find(
        (prompt) =>
          prompt.status === "pending" &&
          prompt.resolutionContext?.intent === "effectSearchRemainderOrder",
      );
    if (!order) throw new Error("Expected Enel's remainder order.");
    expect(order.options).toHaveLength(4);
    engine.exec({
      type: "resolvePrompt",
      seat: "south",
      promptId: order.id,
      selectedIds: order.options.map((option) => option.id),
    });

    let view = engine.getView("south");
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(wantedId);
    expect(view.players.south.activeDon).toBe(0);
    expect(view.players.south.donDeckCount).toBe(donDeckBefore + 1);

    const trash = engine.pendingDecision("effectTrashFromHandSelection", "south").steps[0];
    if (trash?.kind !== "selectEntity") throw new Error("Expected Enel's trash choice.");
    expect(trash).toMatchObject({ min: 1, max: 1 });
    engine.resolveDecision("effectTrashFromHandSelection", { selectedIds: [keptId] }, "south");

    view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(keptId);
    expect(view.players.south.hand.map((card) => card.instanceId)).toEqual([wantedId]);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.prompts).toHaveLength(0);
  });
});
