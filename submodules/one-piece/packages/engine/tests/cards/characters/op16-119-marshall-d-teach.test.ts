import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { op16MarshallDTeach119 } from "../../../../cards/src/cards/characters/op16-119-marshall-d-teach.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP16-119 Marshall.D.Teach", () => {
  test("[On Play] looks at 3 cards and puts the chosen one face-down on top of Life", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op17RocksDXebec039,
        hand: [op16MarshallDTeach119],
        deck: [eb01Doma005, eb01MountainGod018, eb01Doma005, eb01Doma005],
        life: 2,
        activeDon: 10,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(engine.playCard(op16MarshallDTeach119, "south").accepted).toBe(true);
    const chosenId = engine.findCardInZone("south", "deck", eb01MountainGod018);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [chosenId] }, "south");

    const south = engine.getState().players.south;
    expect(south.life[0]).toBe(chosenId);
    expect(south.life).toHaveLength(3);
    expect(engine.getState().cards[chosenId]!.faceUp).toBe(false);
    expect(engine.pendingDecision("effectSearchRemainderOrder", "south")).toBeDefined();
  });
});
