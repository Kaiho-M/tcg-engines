import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01TonyTonyChopper006 } from "@tcg/op-cards";
import { op15MonkeyDLuffy119 } from "../../../../cards/src/cards/characters/op15-119-monkey-d-luffy.ts";
import { op17WangZhi041 } from "../../../../cards/src/cards/characters/op17-041-wang-zhi.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getCardPower } from "../../../src/shared.ts";
import { SOUTH_ATTACKS_WITHOUT_TURN_SETUP } from "../events/battle-fixture.shared.ts";

describe("OP15-119 Monkey.D.Luffy", () => {
  test("when the opponent blocks, reveals the top Life card and gains +1000 per cost on it for the turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: op15MonkeyDLuffy119, playedOnTurn: 0 }],
        // Wang Zhi (cost 4) on top of Life, a cost-0 filler below it.
        life: [op17WangZhi041, eb01Doma005],
      },
      { character: [eb01TonyTonyChopper006], hand: [eb01Doma005] },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const luffyId = engine.findCardInZone("south", "character", op15MonkeyDLuffy119);
    const blockerId = engine.findCardInZone("north", "character", eb01TonyTonyChopper006);
    const topLifeId = engine.getState().players.south.life[0]!;

    engine.declareAttack(luffyId, engine.leader("north"), "south");
    engine.resolveDecision("battleBlocker", { selectedIds: [blockerId] }, "north");
    engine.resolveDecision("effectRevealFromLifeSelection", { optionId: "1" }, "south");

    expect(getCardPower(engine.getState(), luffyId)).toBe(op15MonkeyDLuffy119.power! + 4000);
    // A revealed Life card goes back face-down.
    expect(engine.getState().cards[topLifeId]?.faceUp).toBe(false);
  });
});
