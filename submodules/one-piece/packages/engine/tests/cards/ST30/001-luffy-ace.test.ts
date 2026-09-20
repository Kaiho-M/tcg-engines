import { describe, expect, test } from "vite-plus/test";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";
import { st30LuffyAce001 } from "../../../../cards/src/cards/ST30/leaders/001-luffy-ace.ts";
import { st30PortgasDAce007 } from "../../../../cards/src/cards/ST30/characters/007-portgas-d-ace.ts";
import { st30Crocodile010 } from "../../../../cards/src/cards/ST30/characters/010-crocodile.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

const powerOf = (engine: OnePieceTestEngine, cardId: string) =>
  engine.getView("south").players.south.characters.find((card) => card?.cardId === cardId)?.power;

describe("ST30-001 Luffy & Ace", () => {
  test("[Opponent's Turn] every [Portgas.D.Ace] and [Monkey.D.Luffy] card gains +3000, other cards do not", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: st30LuffyAce001,
        character: [
          { card: st30PortgasDAce007, playedOnTurn: 0 },
          { card: st30Crocodile010, playedOnTurn: 0 },
        ],
      },
      { leaderCardId: op17RocksDXebec039 },
      { firstPlayer: "south", activeSeat: "north" },
    );
    expect(powerOf(engine, st30PortgasDAce007.id)).toBe(st30PortgasDAce007.power + 3000);
    expect(powerOf(engine, st30Crocodile010.id)).toBe(st30Crocodile010.power);

    engine.endTurn("north");
    expect(powerOf(engine, st30PortgasDAce007.id)).toBe(st30PortgasDAce007.power);
  });
});
