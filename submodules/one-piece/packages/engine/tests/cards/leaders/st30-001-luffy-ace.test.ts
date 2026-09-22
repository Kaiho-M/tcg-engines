import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";
import { st30LuffyAce001 } from "../../../../cards/src/cards/leaders/st30-001-luffy-ace.ts";
import { op16PortgasDAce118 } from "../../../../cards/src/cards/characters/op16-118-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

const powerOf = (engine: OnePieceTestEngine, cardId: string) =>
  engine.getView("south").players.south.characters.find((card) => card?.cardId === cardId)?.power;

describe("ST30-001 Luffy & Ace", () => {
  test("[Opponent's Turn] every [Portgas.D.Ace] and [Monkey.D.Luffy] card gains +3000, other cards do not", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: st30LuffyAce001,
        character: [
          { card: op16PortgasDAce118, playedOnTurn: 0 },
          { card: eb01Doma005, playedOnTurn: 0 },
        ],
      },
      { leaderCardId: op17RocksDXebec039 },
      { firstPlayer: "south", activeSeat: "north" },
    );
    expect(powerOf(engine, op16PortgasDAce118.id)).toBe(op16PortgasDAce118.power! + 3000);
    expect(powerOf(engine, eb01Doma005.id)).toBe(eb01Doma005.power);

    engine.endTurn("north");
    expect(powerOf(engine, op16PortgasDAce118.id)).toBe(op16PortgasDAce118.power);
  });

  test("the bonus does not apply on your own turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: st30LuffyAce001,
        character: [
          { card: op16PortgasDAce118, playedOnTurn: 0 },
          { card: eb01Doma005, playedOnTurn: 0 },
        ],
      },
      { leaderCardId: op17RocksDXebec039 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    expect(powerOf(engine, op16PortgasDAce118.id)).toBe(op16PortgasDAce118.power);
    expect(powerOf(engine, eb01Doma005.id)).toBe(eb01Doma005.power);

    engine.endTurn("south");
    expect(powerOf(engine, op16PortgasDAce118.id)).toBe(op16PortgasDAce118.power! + 3000);
    expect(powerOf(engine, eb01Doma005.id)).toBe(eb01Doma005.power);
  });
});
