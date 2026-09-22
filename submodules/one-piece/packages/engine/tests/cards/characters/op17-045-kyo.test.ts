import { describe, expect, test } from "vite-plus/test";
import { op02MeteorVolcano119 } from "@tcg/op-cards";
import { op17WhiteyBay014 } from "../../../../cards/src/cards/characters/op17-014-whitey-bay.ts";
import { op17Kyo045 } from "../../../../cards/src/cards/characters/op17-045-kyo.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

function setup() {
  const engine = OnePieceTestEngine.create(
    {
      leaderCardId: op17RocksDXebec039,
      character: [
        { card: op17Kyo045, playedOnTurn: 0 },
        { card: op17WhiteyBay014, playedOnTurn: 0 },
      ],
      hand: 3,
    },
    { hand: [op02MeteorVolcano119], activeDon: 5 },
    { firstPlayer: "south", activeSeat: "north" },
  );
  engine.playCard(op02MeteorVolcano119, "north");
  const targetId = engine.findCardInZone("south", "character", op17WhiteyBay014);
  engine.resolveDecision("effectTargetSelection", { selectedIds: [targetId] }, "north");
  return { engine, targetId };
}

describe("OP17-045 Kyo", () => {
  test("may trash 2 cards from hand instead of letting an opponent's effect remove a Character", () => {
    const { engine, targetId } = setup();
    engine.resolveDecision("effectKoReplacement", { optionId: "yes" }, "south");
    const trashed = engine.getState().players.south.hand.slice(0, 2);
    engine.resolveDecision("effectTrashFromHandSelection", { selectedIds: trashed }, "south");

    const south = engine.getState().players.south;
    expect(south.characterArea).toContain(targetId);
    expect(south.hand).toHaveLength(1);
    expect(south.trash).toHaveLength(2);
  });

  test("declining the replacement lets the K.O. happen", () => {
    const { engine, targetId } = setup();
    engine.resolveDecision("effectKoReplacement", { optionId: "no" }, "south");

    const south = engine.getState().players.south;
    expect(south.characterArea).not.toContain(targetId);
    expect(south.hand).toHaveLength(3);
  });
});
