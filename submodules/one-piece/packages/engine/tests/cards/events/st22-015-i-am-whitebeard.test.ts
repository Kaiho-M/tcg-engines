import { describe, expect, test } from "vite-plus/test";
import { op12EdwardNewgate002 } from "../../../../cards/src/cards/characters/op12-002-edward-newgate.ts";
import { st22IAmWhitebeard015 } from "../../../../cards/src/cards/events/st22-015-i-am-whitebeard.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/leaders/op16-001-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

function playEvent(engine: OnePieceTestEngine) {
  engine.playCard(st22IAmWhitebeard015, "south");
  const newgateId = engine.findCardInZone("south", "hand", op12EdwardNewgate002);
  engine.resolveDecision("effectPlaySelection", { selectedIds: [newgateId] }, "south");
  expect(
    engine.getView("south").players.south.characters.some((card) => card?.instanceId === newgateId),
  ).toBe(true);
}

describe("ST22-015 I Am Whitebeard!!", () => {
  test("[Main] plays Newgate; taking a Life card to hand is optional and then powers up the Leader", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        hand: [st22IAmWhitebeard015, op12EdwardNewgate002],
        activeDon: 10,
        life: 3,
      },
      { hand: 2 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    playEvent(engine);
    engine.resolveDecision("effectActionOptional", { optionId: "yes" }, "south");
    const position = engine.pendingDecision("effectLifePosition", "south").steps[0];
    if (position?.kind !== "chooseOption")
      throw new Error("Expected the top-or-bottom Life choice.");
    engine.resolveDecision("effectLifePosition", { optionId: "top" }, "south");
    // "Up to 1 of your Leader" still asks which (single) Leader to power up.
    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [engine.leader("south")] },
      "south",
    );

    const south = engine.getView("south").players.south;
    expect(south.lifeCount).toBe(2);
    expect(south.hand).toHaveLength(1);
    expect(south.leader?.power).toBe(7000);
  });

  test("[Main] declining the Life card leaves the Leader's power alone", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        hand: [st22IAmWhitebeard015, op12EdwardNewgate002],
        activeDon: 10,
        life: 3,
      },
      { hand: 2 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    playEvent(engine);
    engine.resolveDecision("effectActionOptional", { optionId: "no" }, "south");

    const south = engine.getView("south").players.south;
    expect(south.lifeCount).toBe(3);
    expect(south.leader?.power).toBe(5000);
    expect(engine.getView("south").prompts).toHaveLength(0);
  });
});
