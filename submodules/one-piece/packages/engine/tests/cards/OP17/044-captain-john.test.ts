import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { op17CaptainJohn044 } from "../../../../cards/src/cards/OP17/characters/044-captain-john.ts";
import { op17Kyo045 } from "../../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";
import { legalAttackTargets } from "../../../src/battle.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP17-044 Captain John", () => {
  test("[Activate: Main] rests this Character, then draws 1 and trashes 1 from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        character: [{ card: op17CaptainJohn044, playedOnTurn: 0 }],
        hand: [op17Kyo045],
        deck: 5,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const johnId = engine.findCardInZone("south", "character", op17CaptainJohn044);
    expect(engine.activateEffect(johnId, "activateMain", "south").accepted).toBe(true);
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    expect(engine.getState().cards[johnId]!.rested).toBe(true);
    expect(engine.getView("south").players.south.hand).toHaveLength(2);
    const kyoId = engine.findCardInZone("south", "hand", op17Kyo045);
    engine.resolveDecision("effectTrashFromHandSelection", { selectedIds: [kyoId] }, "south");
    expect(engine.getView("south").players.south.hand).toHaveLength(1);
    expect(engine.getView("south").players.south.trash).toHaveLength(1);
  });

  test("while rested under a {Rocks Pirates} Leader, the opponent can only attack Captain John", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        character: [
          { card: op17CaptainJohn044, playedOnTurn: 0, rested: true },
          { card: op17Kyo045, playedOnTurn: 0, rested: true },
        ],
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }], hand: 1 },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const johnId = engine.findCardInZone("south", "character", op17CaptainJohn044);
    expect(legalAttackTargets(engine.getState(), "north", engine.leader("north"))).toEqual([
      johnId,
    ]);
    expect(engine.declareAttack(engine.leader("north"), johnId, "north").accepted).toBe(true);
  });
});
