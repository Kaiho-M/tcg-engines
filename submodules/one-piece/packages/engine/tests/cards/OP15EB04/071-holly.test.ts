import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { op15eb04Holly071 } from "../../../../cards/src/cards/OP15EB04/characters/071-holly.ts";
import { op15eb04Ohm061 } from "../../../../cards/src/cards/OP15EB04/characters/061-ohm.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";
import { matchesTargetFilter } from "../../../src/effects/targeting.ts";

describe("OP15-071 Holly", () => {
  test("gives itself and every [Ohm] Double Attack", () => {
    const engine = OnePieceTestEngine.create(
      { character: [op15eb04Holly071, op15eb04Ohm061, eb01Doma005] },
      { character: [op15eb04Ohm061] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const hollyId = engine.findCardInZone("south", "character", op15eb04Holly071);
    const ohmId = engine.findCardInZone("south", "character", op15eb04Ohm061);
    const otherId = engine.findCardInZone("south", "character", eb01Doma005);
    const opposingOhmId = engine.findCardInZone("north", "character", op15eb04Ohm061);
    const state = engine.getState();

    expect(getKeywords(state, hollyId).has("doubleAttack")).toBe(true);
    expect(getKeywords(state, ohmId).has("doubleAttack")).toBe(true);
    expect(getKeywords(state, otherId).has("doubleAttack")).toBe(false);
    expect(getKeywords(state, opposingOhmId).has("doubleAttack")).toBe(false);
  });

  test("sets its own and every [Ohm]'s power to 6000 during the opponent's turn only", () => {
    const engine = OnePieceTestEngine.create(
      { character: [op15eb04Holly071, op15eb04Ohm061, eb01Doma005] },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const hollyId = engine.findCardInZone("south", "character", op15eb04Holly071);
    const ohmId = engine.findCardInZone("south", "character", op15eb04Ohm061);
    const otherId = engine.findCardInZone("south", "character", eb01Doma005);
    const powerOf = (instanceId: string) =>
      engine
        .getView("south")
        .players.south.characters.find((card) => card?.instanceId === instanceId)?.power;

    expect(powerOf(hollyId)).toBe(4000);
    expect(powerOf(ohmId)).toBe(2000);

    engine.endTurn("south");
    expect(powerOf(hollyId)).toBe(6000);
    expect(powerOf(ohmId)).toBe(6000);
    expect(powerOf(otherId)).toBe(eb01Doma005.power);

    engine.endTurn("north");
    expect(powerOf(hollyId)).toBe(4000);
    expect(powerOf(ohmId)).toBe(2000);
  });

  test("counts as 6000 base power for base-power filters during the opponent's turn", () => {
    const engine = OnePieceTestEngine.create(
      { character: [op15eb04Holly071] },
      { character: [eb01Doma005] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const hollyId = engine.findCardInZone("south", "character", op15eb04Holly071);
    const opposingId = engine.findCardInZone("north", "character", eb01Doma005);
    const basePowerAtMost = (value: number) =>
      matchesTargetFilter(engine.getState(), opposingId, hollyId, {
        filter: "basePower",
        comparison: "lte",
        value,
      }).matches;

    // Own turn: printed 4000, so "4000 base power or less" removal can pick it.
    expect(basePowerAtMost(4000)).toBe(true);

    // Opponent's turn: base power is 6000, out of reach of that removal.
    engine.endTurn("south");
    expect(basePowerAtMost(4000)).toBe(false);
    expect(basePowerAtMost(6000)).toBe(true);
  });
});
