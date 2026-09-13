import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { op01RoronoaZoro001 } from "../../../../cards/src/cards/OP01/leaders/001-roronoa-zoro.ts";
import { pMonkeyDLuffy108 } from "../../../../cards/src/cards/P/characters/108-monkey-d-luffy.ts";
import { pMonkeyDLuffy159 } from "../../../../cards/src/cards/P/characters/159-monkey-d-luffy.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

function koLuffyInBattle(leaderDon: number, characterDon: number) {
  const engine = OnePieceTestEngine.create(
    {
      leaderCardId: op01RoronoaZoro001,
      character: [{ card: pMonkeyDLuffy159, playedOnTurn: 0, rested: true }],
      hand: [pMonkeyDLuffy108],
      activeDon: 4,
    },
    { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }], hand: 1 },
    { firstPlayer: "north", activeSeat: "south" },
  );
  const luffyId = engine.findCardInZone("south", "character", pMonkeyDLuffy159);
  if (leaderDon > 0) engine.attachDon(engine.leader("south"), leaderDon, "south");
  if (characterDon > 0) engine.attachDon(luffyId, characterDon, "south");
  engine.endTurn("south");

  const attackerId = engine.findCardInZone("north", "character", eb01MountainGod018);
  engine.declareAttack(attackerId, luffyId, "north");
  engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
  expect(engine.getView("south").players.south.trash.map((card) => card.instanceId)).toContain(
    luffyId,
  );
  return engine;
}

describe("P-159 Monkey.D.Luffy", () => {
  test("[On K.O.] with DON!! on the Leader, plays a Straw Hat Crew Character of 6000 power or less from hand", () => {
    const engine = koLuffyInBattle(1, 0);
    const smallLuffyId = engine.findCardInZone("south", "hand", pMonkeyDLuffy108);
    engine.resolveDecision("effectPlaySelection", { selectedIds: [smallLuffyId] }, "south");
    expect(
      engine
        .getView("south")
        .players.south.characters.some((card) => card?.instanceId === smallLuffyId),
    ).toBe(true);
  });

  test("[On K.O.] DON!! given only to a Character does not satisfy the Leader condition", () => {
    const engine = koLuffyInBattle(0, 1);
    expect(engine.getView("south").prompts).toHaveLength(0);
    expect(engine.getView("south").players.south.hand).toHaveLength(1);
  });
});
