import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { op15Alvida003 } from "../../../../cards/src/cards/characters/op15-003-alvida.ts";
import { op15Mohji018 } from "../../../../cards/src/cards/characters/op15-018-mohji.ts";
import { op15MeowbanBrothers028 } from "../../../../cards/src/cards/characters/op15-028-meowban-brothers.ts";
import { op15Krieg001 } from "../../../../cards/src/cards/leaders/op15-001-krieg.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP15 East Blue: giving the opponent's DON!! to their own cards", () => {
  test("OP15-028 moves one of the opponent's active DON!! onto their Character", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op15Krieg001, hand: [op15MeowbanBrothers028], activeDon: 1 },
      { character: [eb01Doma005], activeDon: 3 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(op15MeowbanBrothers028, "south");
    engine.resolveDecision("effectGiveDonCount", { optionId: "1" }, "south");

    const state = engine.getState();
    expect(state.cards[domaId]?.attachedDon).toBe(1);
    expect(state.players.north.activeDon).toBe(2);
    expect(state.players.south.activeDon).toBe(0);
  });

  test("OP15-003 pays the opponent's rested DON!! onto a chosen opposing Character", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: op15Alvida003, playedOnTurn: 0 }] },
      { character: [eb01Doma005, eb01MountainGod018], restedDon: 1, activeDon: 2 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const alvidaId = engine.findCardInZone("south", "character", op15Alvida003);
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.activateEffect(alvidaId, "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const recipient = engine.pendingDecision("effectCostGiveDon", "south").steps[0];
    if (recipient?.kind !== "payCost") throw new Error("Expected the recipient choice.");
    expect(recipient.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [domaId, engine.findCardInZone("north", "character", eb01MountainGod018)].sort(),
    );
    engine.resolveDecision("effectCostGiveDon", { selectedIds: [domaId] }, "south");

    const state = engine.getState();
    expect(state.cards[domaId]?.attachedDon).toBe(1);
    expect(state.players.north.restedDon).toBe(0);
    // No rested DON!! is left for the effect itself, so it ends without moving another.
    expect(engine.getView("south").prompts).toHaveLength(0);
  });

  test("OP15-018 can only K.O. an opposing Character that has DON!! given", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: op15Mohji018, playedOnTurn: 0 }] },
      { character: [{ card: eb01Doma005, attachedDon: 1 }, eb01Doma005] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const mohjiId = engine.findCardInZone("south", "character", op15Mohji018);
    const [withDonId, withoutDonId] = engine
      .getState()
      .players.north.characterArea.filter((id): id is string => Boolean(id));

    engine.declareAttack(mohjiId, engine.leader("north"), "south");
    // Only one legal candidate, but "up to 1" still asks; Doma with DON!! is the only choice.
    const ko = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (ko?.kind !== "selectEntity") throw new Error("Expected Mohji's K.O. choice.");
    expect(ko.candidates.filter((candidate) => candidate.legal).map((c) => c.ref.id)).toEqual([
      withDonId,
    ]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [withDonId!] }, "south");

    const north = engine.getState().players.north;
    expect(north.trash).toContain(withDonId);
    expect(north.characterArea).toContain(withoutDonId);
  });
});
