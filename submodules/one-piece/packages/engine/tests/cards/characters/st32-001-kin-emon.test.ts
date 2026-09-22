import { describe, expect, test } from "vite-plus/test";
import { op14eb04DraculeMihawkOp14020020 } from "../../../../cards/src/cards/leaders/op14-020-dracule-mihawk-op14-020.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/leaders/op16-001-portgas-d-ace.ts";
import { st32KinEmon001 } from "../../../../cards/src/cards/characters/st32-001-kin-emon.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST32-001 Kin'emon", () => {
  test("[On Play] may rest the (Slash) Leader: draw 2, trash 1", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op14eb04DraculeMihawkOp14020020,
        hand: [st32KinEmon001],
        deck: 5,
        activeDon: 3,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(st32KinEmon001, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const leaderId = engine.leader("south");
    const prompt = engine
      .getState()
      .promptQueue.find(
        (candidate) =>
          candidate.status === "pending" &&
          candidate.resolutionContext?.intent === "effectCostRestCards",
      );
    expect(prompt?.options.map((option) => option.id)).toEqual([leaderId, "rest-don:1"]);
    engine.resolveDecision("effectCostRestCards", { selectedIds: [leaderId] }, "south");
    expect(engine.getState().cards[leaderId]!.rested).toBe(true);
    expect(engine.getState().players.south.activeDon).toBe(2);
    expect(engine.getView("south").players.south.hand).toHaveLength(2);
    engine.resolveDecision(
      "effectTrashFromHandSelection",
      { selectedIds: [engine.getState().players.south.hand[0]!] },
      "south",
    );
    expect(engine.getView("south").players.south.hand).toHaveLength(1);
  });

  test("or rest 1 DON!! instead of the Leader", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op14eb04DraculeMihawkOp14020020,
        hand: [st32KinEmon001],
        deck: 5,
        activeDon: 3,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(st32KinEmon001, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostRestCards", { selectedIds: ["rest-don:1"] }, "south");
    expect(engine.getState().cards[engine.leader("south")]!.rested).toBe(false);
    expect(engine.getState().players.south.activeDon).toBe(1);
    expect(engine.getState().players.south.restedDon).toBe(2);
    expect(engine.getView("south").players.south.hand).toHaveLength(2);
  });

  test("a Leader without the (Slash) attribute is not offered; only the DON!! can be rested", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op16PortgasDAce001, hand: [st32KinEmon001], deck: 5, activeDon: 3 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(st32KinEmon001, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    // The Leader is not a candidate; with only the DON!! left there is nothing to choose.
    const prompt = engine
      .getState()
      .promptQueue.find(
        (candidate) =>
          candidate.status === "pending" &&
          candidate.resolutionContext?.intent === "effectCostRestCards",
      );
    if (prompt) {
      expect(prompt.options.map((option) => option.id)).toEqual(["rest-don:1"]);
      engine.resolveDecision("effectCostRestCards", { selectedIds: ["rest-don:1"] }, "south");
    }
    expect(engine.getState().cards[engine.leader("south")]!.rested).toBe(false);
    expect(engine.getState().players.south.restedDon).toBe(2);
    expect(engine.getView("south").players.south.hand).toHaveLength(2);
  });
});
