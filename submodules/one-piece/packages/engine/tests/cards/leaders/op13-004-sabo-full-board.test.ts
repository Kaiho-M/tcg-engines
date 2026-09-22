import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { op06Tsuru051 } from "../../../../cards/src/cards/characters/op06-051-tsuru.ts";
import { op12MonkeyDLuffy015 } from "../../../../cards/src/cards/characters/op12-015-monkey-d-luffy.ts";
import { op12Sengoku047 } from "../../../../cards/src/cards/characters/op12-047-sengoku.ts";
import { op12Kuzan040 } from "../../../../cards/src/cards/leaders/op12-040-kuzan.ts";
import { op13Sabo004 } from "../../../../cards/src/cards/leaders/op13-004-sabo.ts";
import { op14eb04Usopp022 } from "../../../../cards/src/cards/characters/op14-022-usopp.ts";
import { op15Lucy002 } from "../../../../cards/src/cards/leaders/op15-002-lucy.ts";
import { st01Brook011 } from "../../../../cards/src/cards/characters/st01-011-brook.ts";
import { st21MonkeyDLuffy014 } from "../../../../cards/src/cards/characters/st21-014-monkey-d-luffy.ts";
import { st33Koby001 } from "../../../../cards/src/cards/characters/st33-001-koby.ts";
import { st33MonkeyDGarp005 } from "../../../../cards/src/cards/characters/st33-005-monkey-d-garp.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP13-004 Sabo with a full board", () => {
  // Sabo's "a Character with a cost of 8 or more" clause reads every Character's cost, and each
  // cost lookup walks every permanent effect again. Before the evaluation cache this board took
  // minutes to declare the second attack (found by an OPTCGSim Solo replay, 2026-09-13).
  test("a Character attack after the Leader's attack resolves promptly", { timeout: 20000 }, () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op13Sabo004,
        character: [
          { card: st01Brook011, playedOnTurn: 0 },
          { card: op15Lucy002, playedOnTurn: 0 },
          { card: op12MonkeyDLuffy015, playedOnTurn: 0 },
          { card: op15Lucy002, playedOnTurn: 0 },
          { card: st21MonkeyDLuffy014, playedOnTurn: 0 },
        ],
        life: 3,
        activeDon: 7,
      },
      {
        leaderCardId: op12Kuzan040,
        character: [
          { card: st33Koby001, playedOnTurn: 0 },
          { card: op12Sengoku047, playedOnTurn: 0 },
          { card: op14eb04Usopp022, playedOnTurn: 0 },
        ],
        hand: [st33MonkeyDGarp005, op06Tsuru051, eb01Doma005],
        life: 4,
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.attachDon(engine.leader("south"), 2, "south");
    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");
    engine.resolveDecision("battleBlocker", { selectedIds: [] }, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    expect(engine.getView("north").players.north.lifeCount).toBe(3);

    const started = Date.now();
    const brookId = engine.findCardInZone("south", "character", st01Brook011);
    expect(engine.declareAttack(brookId, engine.leader("north"), "south").accepted).toBe(true);
    expect(Date.now() - started).toBeLessThan(10000);
  });
});
