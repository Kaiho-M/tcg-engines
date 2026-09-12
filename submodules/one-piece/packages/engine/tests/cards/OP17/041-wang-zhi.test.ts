import { describe, expect, test } from "vite-plus/test";
import { op17WhiteyBay014 } from "../../../../cards/src/cards/OP17/characters/014-whitey-bay.ts";
import { op17WangZhi041 } from "../../../../cards/src/cards/OP17/characters/041-wang-zhi.ts";
import { op17Kyo045 } from "../../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP17-041 Wang Zhi", () => {
  test("[On Play] trashing 1 card places every opposing Character with a base cost of 1 at the bottom of the deck", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        hand: [op17WangZhi041, op17Kyo045, op17Kyo045],
        activeDon: 10,
      },
      {
        character: [
          { card: op17WhiteyBay014, playedOnTurn: 0 },
          { card: op17Kyo045, playedOnTurn: 0 },
        ],
        deck: 5,
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(op17WangZhi041, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const costId = engine.findCardInZone("south", "hand", op17Kyo045);
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [costId] }, "south");

    const north = engine.getState().players.north;
    const remaining = north.characterArea
      .filter((id): id is string => Boolean(id))
      .map((id) => engine.getState().cards[id]?.cardId);
    expect(remaining).toEqual([op17Kyo045.id]);
    expect(north.deck).toHaveLength(6);
    expect(engine.getState().cards[north.deck.at(-1)!]?.cardId).toBe(op17WhiteyBay014.id);
  });
});
