import { describe, expect, test } from "vite-plus/test";
import { op16Curiel004 } from "../../../../cards/src/cards/characters/op16-004-curiel.ts";
import { op16Marco014 } from "../../../../cards/src/cards/characters/op16-014-marco.ts";
import { op16LittleOarsJr017 } from "../../../../cards/src/cards/characters/op16-017-littleoars-jr.ts";
import { op16PortgasDAce118 } from "../../../../cards/src/cards/characters/op16-118-portgas-d-ace.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/leaders/op16-001-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getCardCounter } from "../../../src/shared.ts";

const HAND = [op16Marco014, op16LittleOarsJr017, op16Curiel004, op16PortgasDAce118];

function countersWithAces(aces: number) {
  const engine = OnePieceTestEngine.create(
    {
      leaderCardId: op16PortgasDAce001,
      character: Array.from({ length: aces }, () => op16PortgasDAce118),
      hand: HAND,
    },
    {},
    { firstPlayer: "north", activeSeat: "south" },
  );
  const state = engine.getState();
  return HAND.map((card) => getCardCounter(state, engine.findCardInZone("south", "hand", card)));
}

describe("OP16-118 Portgas.D.Ace", () => {
  test("8000-power Characters in hand have a +2000 Counter whatever is printed on them", () => {
    // Marco prints no counter, Oars Jr. +1000, Curiel +2000; Ace itself is 6000 and keeps +1000.
    expect(countersWithAces(0)).toEqual([0, 1000, 2000, 1000]);
    expect(countersWithAces(1)).toEqual([2000, 2000, 2000, 1000]);
  });

  test("a second Ace does not raise the Counter beyond +2000", () => {
    expect(countersWithAces(2)).toEqual([2000, 2000, 2000, 1000]);
  });
});
