import { describe, expect, test } from "vite-plus/test";
import { op06Shuraiya009, op13MonkeyDLuffy001 } from "@tcg/op-cards";
import { op17EdwardNewgate005 } from "../../../../cards/src/cards/OP17/characters/005-edward-newgate.ts";
import { op17EdwardNewgate001 } from "../../../../cards/src/cards/OP17/leaders/001-edward-newgate.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP17-005 Edward.Newgate", () => {
  test("[On Play] sets a monocolored Leader to 8000 base power until the end of the opponent's next End Phase", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17EdwardNewgate001, hand: [op17EdwardNewgate005], activeDon: 10 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const leaderPower = () => engine.getView("south").players.south.leader?.power;

    engine.playCard(op17EdwardNewgate005, "south");
    expect(leaderPower()).toBe(8000);

    engine.endTurn("south");
    expect(leaderPower()).toBe(8000);

    engine.endTurn("north");
    expect(leaderPower()).toBe(op17EdwardNewgate001.power);
  });

  test("does nothing for a multicolored Leader", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op13MonkeyDLuffy001, hand: [op17EdwardNewgate005], activeDon: 10 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(op17EdwardNewgate005, "south");
    expect(engine.getView("south").players.south.leader?.power).toBe(op13MonkeyDLuffy001.power);
    expect(engine.getView("south").prompts).toHaveLength(0);
  });

  test("a 'becomes the same as the Leader' copy reads the 8000, not the printed value", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: op06Shuraiya009, playedOnTurn: 0 }] },
      { leaderCardId: op17EdwardNewgate001, hand: [op17EdwardNewgate005], activeDon: 10 },
      { firstPlayer: "north", activeSeat: "north" },
    );
    engine.playCard(op17EdwardNewgate005, "north");
    engine.endTurn("north");

    const shuraiyaId = engine.findCardInZone("south", "character", op06Shuraiya009);
    engine.declareAttack(shuraiyaId, engine.leader("north"), "south");
    expect(
      engine
        .getView("south")
        .players.south.characters.find((card) => card?.instanceId === shuraiyaId)?.power,
    ).toBe(8000);
  });
});
