import { describe, expect, test } from "vite-plus/test";
import { op01RoronoaZoro001 } from "../../../../cards/src/cards/leaders/op01-001-roronoa-zoro.ts";
import { st36ScratchmenApoo003 } from "../../../../cards/src/cards/characters/st36-003-scratchmen-apoo.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST36-003 Scratchmen Apoo", () => {
  test("[Trigger] draws 1 card and sets the {Supernovas} Leader's base power to 7000 this turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op01RoronoaZoro001,
        life: [st36ScratchmenApoo003, st36ScratchmenApoo003],
        hand: 0,
        deck: 5,
      },
      { leaderCardId: op01RoronoaZoro001, hand: 1 },
      { firstPlayer: "south", activeSeat: "north" },
    );
    engine.declareAttack(engine.leader("north"), engine.leader("south"), "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "south");

    const south = engine.getView("south").players.south;
    expect(south.hand).toHaveLength(1);
    expect(south.leader?.power).toBe(7000);
    expect(south.trash.map((card) => card.cardId)).toContain(st36ScratchmenApoo003.id);

    engine.endTurn("north");
    expect(engine.getView("south").players.south.leader?.power).toBe(5000);
  });
});
