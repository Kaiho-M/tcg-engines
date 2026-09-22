import { describe, expect, test } from "vite-plus/test";
import { op17CharlotteLinlin049 } from "../../../../cards/src/cards/characters/op17-049-charlotte-linlin.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

const handSizes = (engine: OnePieceTestEngine) => {
  const state = engine.getState();
  return [state.players.south.hand.length, state.players.north.hand.length];
};

describe("OP17-049 Charlotte Linlin", () => {
  test("[On Play] the opponent may let the controller draw 2 cards", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, hand: [op17CharlotteLinlin049], activeDon: 10, deck: 10 },
      { hand: 3 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(op17CharlotteLinlin049, "south");
    expect(engine.getView("south").decisions).toHaveLength(0);

    engine.resolveDecision("effectActionChoice", { optionId: "0" }, "north");
    expect(handSizes(engine)).toEqual([2, 3]);
  });

  test("[On Play] or the opponent trashes 2 cards from their own hand", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, hand: [op17CharlotteLinlin049], activeDon: 10, deck: 10 },
      { hand: 3 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(op17CharlotteLinlin049, "south");
    engine.resolveDecision("effectActionChoice", { optionId: "1" }, "north");

    const trashed = engine.getState().players.north.hand.slice(0, 2);
    engine.resolveDecision("effectTrashFromHandSelection", { selectedIds: trashed }, "north");
    expect(handSizes(engine)).toEqual([0, 1]);
    expect(engine.getState().players.north.trash).toHaveLength(2);
  });
});
