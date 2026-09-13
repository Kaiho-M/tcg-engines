import { describe, expect, test } from "vite-plus/test";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";
import { st11Uta001 } from "../../../../cards/src/cards/ST11/leaders/001-uta.ts";
import { st23Shanks002 } from "../../../../cards/src/cards/ST23/characters/002-shanks.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST23-002 Shanks", () => {
  test("[On Play] under [Uta] the Leader gains +2000 power", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: st11Uta001, hand: [st23Shanks002], activeDon: 10 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(st23Shanks002, "south");
    expect(engine.getView("south").players.south.leader?.power).toBe(7000);
  });

  test("[On Play] under a Leader that is neither {Red-Haired Pirates} nor [Uta], nothing happens", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, hand: [st23Shanks002], activeDon: 10 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(st23Shanks002, "south");
    expect(engine.getView("south").players.south.leader?.power).toBe(5000);
  });
});
