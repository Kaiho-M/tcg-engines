import { describe, expect, test } from "vite-plus/test";

import { OnePieceTestEngine } from "../../../index.ts";

describe("OP16-082 Kin'emon", () => {
  test("is played for its printed cost and gains +3 cost only as a Character", () => {
    // "This Character gains +3 cost": a card in hand is a Character card, not a
    // Character (rule 2-2), so the modifier does not raise the cost to play it.
    const engine = OnePieceTestEngine.create({ hand: ["OP16-082"], activeDon: 4 }, {});

    engine.playCard("OP16-082");

    const south = engine.getView("south").players.south;
    expect(south.activeDon).toBe(0);
    expect(south.characters.find((card) => card?.cardId === "OP16-082")?.cost).toBe(7);
  });

  test("[On Play] for a Land of Wano Leader looks at 5, takes a LoW card, and trashes the rest", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: "OP01-031",
        hand: ["OP16-082"],
        deck: ["OP13-013", "OP16-091", "OP13-013", "OP13-013", "OP13-013", "OP13-013"],
        activeDon: 7,
      },
      {},
    );

    engine.playCard("OP16-082");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected the search choice.");
    const legal = search.candidates.filter((candidate) => candidate.legal);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [legal[0]!.ref.id!] }, "south");

    // The trashed rest goes straight to the trash.

    const south = engine.getView("south").players.south;
    expect(south.hand.map((card) => card.cardId)).toContain("OP16-091");
    expect(south.trash.map((card) => card.cardId)).toContain("OP13-013");
  });
});
