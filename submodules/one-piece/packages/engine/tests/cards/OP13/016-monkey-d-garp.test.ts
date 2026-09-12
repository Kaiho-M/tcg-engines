import { describe, expect, test } from "vite-plus/test";
import { op13MonkeyDGarp016 } from "../../../../cards/src/cards/OP13/characters/016-monkey-d-garp.ts";
import { op16Curiel004 } from "../../../../cards/src/cards/OP16/characters/004-curiel.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/OP16/leaders/001-portgas-d-ace.ts";
import { op16MobyDick021 } from "../../../../cards/src/cards/OP16/stages/021-moby-dick.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP13-016 Monkey.D.Garp", () => {
  test("[On Play] adds a revealed Character to hand even when the character area is full", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        hand: [op13MonkeyDGarp016],
        deck: [op16MobyDick021, op16MobyDick021, op16Curiel004, op16MobyDick021, op16MobyDick021],
        character: [
          { card: op16Curiel004, playedOnTurn: 0 },
          { card: op16Curiel004, playedOnTurn: 0 },
          { card: op16Curiel004, playedOnTurn: 0 },
          { card: op16Curiel004, playedOnTurn: 0 },
        ],
        activeDon: 10,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(engine.playCard(op13MonkeyDGarp016, "south").accepted).toBe(true);
    expect(engine.getState().players.south.characterArea.filter(Boolean)).toHaveLength(5);

    // The looked-at cards stay in the deck; Curiel is the only eligible (cost 3 or more) one.
    const curielId = engine.findCardInZone("south", "deck", op16Curiel004);
    const result = engine.resolveDecision(
      "effectSearchSelection",
      { selectedIds: [curielId] },
      "south",
    );
    expect(result.accepted).toBe(true);
    expect(engine.getView("south").players.south.hand).toHaveLength(1);
    expect(engine.pendingDecision("effectSearchRemainderOrder", "south")).toBeDefined();
  });
});
