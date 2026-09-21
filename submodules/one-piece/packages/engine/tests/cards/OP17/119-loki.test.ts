import { describe, expect, test } from "vite-plus/test";
import { op17WhiteyBay014 } from "../../../../cards/src/cards/OP17/characters/014-whitey-bay.ts";
import { op17WangZhi041 } from "../../../../cards/src/cards/OP17/characters/041-wang-zhi.ts";
import { op17Kyo045 } from "../../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17Loki119 } from "../../../../cards/src/cards/OP17/characters/119-loki.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP17-119 Loki", () => {
  test("[On Play] K.O.s any number of opposing Characters whose total cost is at most 4", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, hand: [op17Loki119], activeDon: op17Loki119.cost },
      {
        character: [
          { card: op17WhiteyBay014, playedOnTurn: 0 },
          { card: op17Kyo045, playedOnTurn: 0 },
          { card: op17WangZhi041, playedOnTurn: 0 },
        ],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const costOneId = engine.findCardInZone("north", "character", op17WhiteyBay014);
    const costTwoId = engine.findCardInZone("north", "character", op17Kyo045);
    const costFourId = engine.findCardInZone("north", "character", op17WangZhi041);

    engine.playCard(op17Loki119, "south");

    const decision = engine.pendingDecision("effectTargetSelection", "south");
    const target = decision.steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Loki's K.O. choice.");
    expect(target).toMatchObject({ min: 0, max: 3 });
    expect(target.constraints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "totalConstraint", operator: "lte", value: 4 }),
      ]),
    );
    expect(
      engine.expectFailure({
        type: "resolvePrompt",
        seat: "south",
        promptId: decision.id,
        selectedIds: [costFourId, costOneId],
      }).accepted,
    ).toBe(false);

    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [costOneId, costTwoId] },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.north.trash.map((card) => card.instanceId)).toEqual(
      expect.arrayContaining([costOneId, costTwoId]),
    );
    expect(view.players.north.characters.map((card) => card?.instanceId)).toContain(costFourId);
    expect(view.prompts).toHaveLength(0);
  });
});
