import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018, op13MonkeyDLuffy001 } from "@tcg/op-cards";
import { op17EdwardNewgate040 } from "../../../../cards/src/cards/OP17/characters/040-edward-newgate.ts";
import { op17Kyo045 } from "../../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

const leaderPower = (engine: OnePieceTestEngine) =>
  engine.getView("south").players.south.leader?.power;

describe("OP17-040 Edward.Newgate", () => {
  test("when the {Rocks Pirates} Leader attacks, trashing 1 card gives the Leader +3000 for the battle", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        character: [{ card: op17EdwardNewgate040, playedOnTurn: 0 }],
        hand: [op17Kyo045, op17Kyo045],
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");
    // Decline the Leader's own [When Attacking] effect first.
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const kyoId = engine.findCardInZone("south", "hand", op17Kyo045);
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [kyoId] }, "south");

    expect(leaderPower(engine)).toBe(op17RocksDXebec039.power + 3000);
    expect(engine.getView("south").players.south.hand).toHaveLength(1);

    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    expect(leaderPower(engine)).toBe(op17RocksDXebec039.power);
  });

  test("also triggers when the Leader is attacked, once per turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        character: [{ card: op17EdwardNewgate040, playedOnTurn: 0 }],
        hand: [op17Kyo045, op17Kyo045],
      },
      {
        character: [
          { card: eb01MountainGod018, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0 },
        ],
      },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const [firstAttacker, secondAttacker] = engine
      .getState()
      .players.north.characterArea.filter((id): id is string => Boolean(id));

    engine.declareAttack(firstAttacker!, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const kyoId = engine.findCardInZone("south", "hand", op17Kyo045);
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [kyoId] }, "south");
    expect(leaderPower(engine)).toBe(op17RocksDXebec039.power + 3000);
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");

    engine.declareAttack(secondAttacker!, engine.leader("south"), "north");
    expect(() => engine.pendingDecision("effectOptional", "south")).toThrow();
    expect(engine.pendingDecision("battleCounter", "south")).toBeDefined();
    expect(leaderPower(engine)).toBe(op17RocksDXebec039.power);
  });

  test("does not react for a Leader without the {Rocks Pirates} type", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op13MonkeyDLuffy001,
        character: [{ card: op17EdwardNewgate040, playedOnTurn: 0 }],
        hand: [op17Kyo045],
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");
    expect(() => engine.pendingDecision("effectOptional", "south")).toThrow();
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });
});
