import { describe, expect, test } from "vite-plus/test";
import { op16LittleoarsJr017 } from "../../../../cards/src/cards/OP16/characters/017-littleoars-jr.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/OP16/leaders/001-portgas-d-ace.ts";
import { op17EdwardNewgate005 } from "../../../../cards/src/cards/OP17/characters/005-edward-newgate.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

const oarsPower = (engine: OnePieceTestEngine) =>
  engine
    .getView("south")
    .players.south.characters.find((card) => card?.cardId === op16LittleoarsJr017.id)?.power;

describe("OP16-017 LittleOars Jr.", () => {
  test("is 4000 without a cost-8-or-more Whitebeard Pirates Character, 8000 with one", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        character: [op16LittleoarsJr017],
        hand: [op17EdwardNewgate005],
        activeDon: 10,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(oarsPower(engine)).toBe(op16LittleoarsJr017.power! - 4000);

    engine.playCard(op17EdwardNewgate005, "south");
    expect(oarsPower(engine)).toBe(op16LittleoarsJr017.power);
  });
});
