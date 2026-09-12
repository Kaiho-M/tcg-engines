import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { op17Kyo045 } from "../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17RocksDXebec039 } from "../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../src/index.ts";

const fullArea = () =>
  Array.from({ length: 5 }, () => ({ card: eb01MountainGod018, playedOnTurn: 0 }));

describe("Playing a Character with a full character area (rule 6-2-2-1)", () => {
  test("naming an occupied slot trashes that Character and plays the new one there", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, character: fullArea(), hand: [op17Kyo045], activeDon: 5 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const replacedId = engine.getState().players.south.characterArea[2]!;
    const result = engine.playCard(op17Kyo045, "south", 2);
    expect(result.accepted).toBe(true);
    const state = engine.getState();
    expect(state.cards[replacedId]!.zone).toBe("trash");
    expect(state.cards[state.players.south.characterArea[2]!]!.cardId).toBe("OP17-045");
    expect(state.players.south.characterArea.filter(Boolean)).toHaveLength(5);
  });

  test("without a slot the play is still rejected (the player must choose what to trash)", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, character: fullArea(), hand: [op17Kyo045], activeDon: 5 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(
      engine.expectFailure({
        type: "playCard",
        seat: "south",
        instanceId: engine.findCardInZone("south", "hand", op17Kyo045),
      }).accepted,
    ).toBe(false);
  });
});
