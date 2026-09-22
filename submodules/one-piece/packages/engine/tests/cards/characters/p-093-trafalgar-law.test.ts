import { describe, expect, test } from "vite-plus/test";
import { pTrafalgarLaw093 } from "../../../../cards/src/cards/characters/p-093-trafalgar-law.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("P-093 Trafalgar Law", () => {
  test("[On Play] with no more DON!! than the opponent adds 1 rested DON!! from the DON!! deck", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pTrafalgarLaw093], activeDon: 4, donDeckCount: 6 },
      { activeDon: 4 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(pTrafalgarLaw093, "south");
    engine.resolveDecision("effectAddDon", { optionId: "1" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.restedDon).toBe(5);
    expect(view.players.south.donDeckCount).toBe(5);
    expect(
      getKeywords(engine.getState(), engine.findCardInZone("south", "character", pTrafalgarLaw093)),
    ).toContain("blocker");
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] with more DON!! than the opponent adds nothing", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pTrafalgarLaw093], activeDon: 5, donDeckCount: 5 },
      { activeDon: 4 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(pTrafalgarLaw093, "south");

    const view = engine.getView("south");
    expect(view.players.south.restedDon).toBe(4);
    expect(view.players.south.donDeckCount).toBe(5);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] may decline the DON!! (up to 1)", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pTrafalgarLaw093], activeDon: 4, donDeckCount: 6 },
      { activeDon: 4 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(pTrafalgarLaw093, "south");
    engine.resolveDecision("effectAddDon", { optionId: "0" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(0);
    expect(view.players.south.restedDon).toBe(4);
    expect(view.players.south.donDeckCount).toBe(6);
  });
});
