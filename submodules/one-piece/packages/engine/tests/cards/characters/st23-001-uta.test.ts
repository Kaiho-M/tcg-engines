import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st23Uta001 } from "../../../../cards/src/cards/characters/st23-001-uta.ts";
import { op02EdwardNewgate004 } from "../../../../cards/src/cards/characters/op02-004-edward-newgate.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("ST23-001 Uta", () => {
  test("costs 4 less from hand while a 10000-power Character is in play", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: op02EdwardNewgate004, playedOnTurn: 0 }],
        hand: [st23Uta001],
        activeDon: 2,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const utaInHand = engine
      .getView("south")
      .players.south.hand.find((card) => card.cardId === st23Uta001.id);
    expect(utaInHand?.cost).toBe(2);

    engine.playCard(st23Uta001, "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(0);
    const uta = view.players.south.characters.find((card) => card?.cardId === st23Uta001.id);
    expect(
      getKeywords(engine.getState(), engine.findCardInZone("south", "character", st23Uta001)),
    ).toContain("blocker");
    // On the field it is a Character, not "this card in your hand": the printed cost returns.
    expect(uta?.cost).toBe(6);
  });

  test("keeps its printed cost without a 10000-power Character", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }], hand: [st23Uta001], activeDon: 5 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(
      engine.getView("south").players.south.hand.find((card) => card.cardId === st23Uta001.id)
        ?.cost,
    ).toBe(6);
    expect(() => engine.playCard(st23Uta001, "south")).toThrow();
    expect(engine.getView("south").players.south.activeDon).toBe(5);
  });
});
