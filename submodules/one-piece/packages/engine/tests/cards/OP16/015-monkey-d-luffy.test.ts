import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { op16Curiel004 } from "../../../../cards/src/cards/OP16/characters/004-curiel.ts";
import { op16MonkeyDLuffy015 } from "../../../../cards/src/cards/OP16/characters/015-monkey-d-luffy.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/OP16/leaders/001-portgas-d-ace.ts";
import { op17EdwardNewgate005 } from "../../../../cards/src/cards/OP17/characters/005-edward-newgate.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

const leaderPower = (engine: OnePieceTestEngine) =>
  engine.getView("south").players.south.leader?.power;
const characterPower = (engine: OnePieceTestEngine, instanceId: string) =>
  engine.getView("south").players.south.characters.find((card) => card?.instanceId === instanceId)
    ?.power;

/** Accept the optional trigger, pay the hand cost when asked, and skip the Counter Step. */
function acceptLuffyTrigger(engine: OnePieceTestEngine, trashId?: string) {
  engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
  if (trashId) {
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [trashId] }, "south");
  }
  engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
}

describe("OP16-015 Monkey.D.Luffy", () => {
  test("costs 2 less in hand with an [Ace] Leader and 6 or more DON!! on the field", () => {
    const withAce = OnePieceTestEngine.create(
      { leaderCardId: op16PortgasDAce001, hand: [op16MonkeyDLuffy015], activeDon: 6 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(withAce.getView("south").players.south.hand[0]?.cost).toBe(op16MonkeyDLuffy015.cost - 2);

    const withFewerDon = OnePieceTestEngine.create(
      { leaderCardId: op16PortgasDAce001, hand: [op16MonkeyDLuffy015], activeDon: 5 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(withFewerDon.getView("south").players.south.hand[0]?.cost).toBe(
      op16MonkeyDLuffy015.cost,
    );
  });

  test("sets the Leader and itself to 7000 base power; a second trigger does not stack", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        character: [op16MonkeyDLuffy015],
        hand: [op16Curiel004, op16Curiel004],
      },
      {
        character: [
          { card: eb01MountainGod018, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0 },
        ],
      },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const luffyId = engine.findCardInZone("south", "character", op16MonkeyDLuffy015);
    const [firstAttacker, secondAttacker] = engine
      .getState()
      .players.north.characterArea.filter((id): id is string => Boolean(id));
    const firstCostId = engine.findCardInZone("south", "hand", op16Curiel004);

    engine.declareAttack(firstAttacker!, engine.leader("south"), "north");
    acceptLuffyTrigger(engine, firstCostId);
    expect(leaderPower(engine)).toBe(7000);
    expect(characterPower(engine, luffyId)).toBe(7000);

    // The only 8000-power card left in hand is paid automatically.
    engine.declareAttack(secondAttacker!, engine.leader("south"), "north");
    acceptLuffyTrigger(engine);
    expect(leaderPower(engine)).toBe(7000);
    expect(characterPower(engine, luffyId)).toBe(7000);

    engine.endTurn("north");
    expect(leaderPower(engine)).toBe(op16PortgasDAce001.power);
    expect(characterPower(engine, luffyId)).toBe(op16MonkeyDLuffy015.power);
  });

  test("overrides an earlier 'base power becomes 8000' instead of adding to it", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        character: [op16MonkeyDLuffy015],
        // Doma keeps a card in hand after the cost so the Counter Step is still offered.
        hand: [op17EdwardNewgate005, op16Curiel004, eb01Doma005],
        activeDon: 10,
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "south" },
    );
    engine.playCard(op17EdwardNewgate005, "south");
    expect(leaderPower(engine)).toBe(8000);

    engine.endTurn("south");
    expect(leaderPower(engine)).toBe(8000);
    const attackerId = engine.findCardInZone("north", "character", eb01MountainGod018);
    engine.declareAttack(attackerId, engine.leader("south"), "north");
    acceptLuffyTrigger(engine);
    expect(leaderPower(engine)).toBe(7000);
  });
});
