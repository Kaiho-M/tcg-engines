import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import type { CharacterCard } from "@tcg/op-types";
import { op16ShimotsukiUshimaru088 } from "../../../../cards/src/cards/characters/op16-088-shimotsuki-ushimaru.ts";
import { op16Yamato079 } from "../../../../cards/src/cards/leaders/op16-079-yamato.ts";

import { registerCards } from "../../../../cards/src/runtime-catalog.ts";
import { OnePieceTestEngine } from "../../../src/index.ts";

// A stand-in for any effect that plays a {Land of Wano} Character from the trash.
const wanoReviver: CharacterCard = {
  ...eb01Doma005,
  id: "TEST-WANO-REVIVER",
  canonicalId: "TEST-WANO-REVIVER",
  name: "Wano Reviver Test",
  cost: 0,
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "play",
            source: { player: "self", zone: "trash" },
            count: { amount: 1 },
            filters: [{ filter: "trait", value: "Land of Wano", match: "includes" }],
          },
        ],
      },
    ],
  },
};

registerCards([wanoReviver]);

describe("OP16-079 Yamato", () => {
  test("a {Land of Wano} Character played from the trash gains [Rush] for the turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16Yamato079,
        hand: [wanoReviver],
        trash: [op16ShimotsukiUshimaru088],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(wanoReviver, "south");

    const ushimaruId = engine.findCardInZone("south", "character", op16ShimotsukiUshimaru088);
    expect(Object.values(engine.getState().modifiers)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ targetId: ushimaruId, type: "keyword", keyword: "rush" }),
      ]),
    );
    expect(engine.getView("south").prompts).toHaveLength(0);
    engine.declareAttack(ushimaruId, engine.leader("north"), "south");
    expect(engine.getState().cards[ushimaruId]?.rested).toBe(true);
  });

  test("a Character played from the hand does not gain [Rush]", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16Yamato079,
        hand: [op16ShimotsukiUshimaru088],
        activeDon: op16ShimotsukiUshimaru088.cost,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(op16ShimotsukiUshimaru088, "south");

    const ushimaruId = engine.findCardInZone("south", "character", op16ShimotsukiUshimaru088);
    expect(Object.values(engine.getState().modifiers)).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ targetId: ushimaruId, keyword: "rush" })]),
    );
  });
});
