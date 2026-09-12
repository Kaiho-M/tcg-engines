import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { op17Kyo045 } from "../../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17Jinbe051 } from "../../../../cards/src/cards/OP17/characters/051-jinbe.ts";
import { op17RocksDXebec118 } from "../../../../cards/src/cards/OP17/characters/118-rocks-d-xebec.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import type { FixtureCardEntry } from "../../../src/testing/test-fixtures.ts";
import { getCardCounter } from "../../../src/shared.ts";

function counterWithRocks(fieldCharacters: FixtureCardEntry[]) {
  const engine = OnePieceTestEngine.create(
    { leaderCardId: op17RocksDXebec039, hand: [op17RocksDXebec118], character: fieldCharacters },
    { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
    { firstPlayer: "south", activeSeat: "north" },
  );
  const attackerId = engine.findCardInZone("north", "character", eb01MountainGod018);
  engine.declareAttack(attackerId, engine.leader("south"), "north");
  const rocksId = engine.findCardInZone("south", "hand", op17RocksDXebec118);
  const step = engine.pendingDecision("battleCounter", "south").steps[0];
  const offered =
    step?.kind === "selectEntity"
      ? step.candidates.filter((candidate) => candidate.legal).map((candidate) => candidate.ref.id)
      : [];
  return { engine, rocksId, offered };
}

describe("OP17-118 Rocks.D.Xebec", () => {
  test("has a +2000 Counter in hand while all of your Characters lack a Counter", () => {
    const { engine, rocksId, offered } = counterWithRocks([{ card: op17Kyo045, playedOnTurn: 0 }]);
    expect(offered).toContain(rocksId);
    expect(getCardCounter(engine.getState(), rocksId)).toBe(2000);
  });

  test("has no Counter once a Character with a Counter is on the field", () => {
    const { engine, rocksId, offered } = counterWithRocks([
      { card: op17Jinbe051, playedOnTurn: 0 },
    ]);
    expect(offered).not.toContain(rocksId);
    expect(getCardCounter(engine.getState(), rocksId)).toBe(0);
  });
});
