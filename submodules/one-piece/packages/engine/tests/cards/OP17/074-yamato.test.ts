import { describe, expect, test } from "vite-plus/test";
import { op17Yamato074 } from "../../../../cards/src/cards/OP17/characters/074-yamato.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP17-074 Yamato", () => {
  test("[On Play] adds up to 1 rested DON!! card from the DON!! deck", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [op17Yamato074], activeDon: 3, donDeckCount: 5 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.playCard(op17Yamato074, "south");
    engine.resolveDecision("effectAddDon", { optionId: "1" }, "south");

    const view = engine.getView("south").players.south;
    expect(view.restedDon).toBe(op17Yamato074.cost + 1);
    expect(view.donDeckCount).toBe(4);
  });
});
