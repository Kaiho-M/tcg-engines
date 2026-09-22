import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st34CharlotteBrulee003 } from "../../../../cards/src/cards/characters/st34-003-charlotte-brulee.ts";
import { st34CharlotteKatakuri001 } from "../../../../cards/src/cards/characters/st34-001-charlotte-katakuri.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

function orderRemainder(engine: OnePieceTestEngine) {
  const remainder = engine.pendingDecision("effectSearchRemainderOrder", "south").steps[0];
  if (remainder?.kind !== "orderItems") throw new Error("Expected the deck order.");
  engine.resolveDecision(
    "effectSearchRemainderOrder",
    { selectedIds: remainder.candidates.map((candidate) => candidate.ref.id) },
    "south",
  );
}

describe("ST34-003 Charlotte Brulee", () => {
  test("[On Play] looks at 3, adds a Big Mom Pirates card to hand and bottoms the rest", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st34CharlotteBrulee003],
        deck: [eb01Doma005, st34CharlotteKatakuri001, eb01Doma005, eb01Doma005],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const katakuriId = engine.findCardInZone("south", "deck", st34CharlotteKatakuri001);

    engine.playCard(st34CharlotteBrulee003, "south");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected Brulee's search.");
    expect(
      search.candidates.filter((candidate) => candidate.legal).map((candidate) => candidate.ref.id),
    ).toEqual([katakuriId]);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [katakuriId] }, "south");
    orderRemainder(engine);

    const view = engine.getView("south");
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(katakuriId);
    expect(view.players.south.deckCount).toBe(3);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] may take nothing", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st34CharlotteBrulee003],
        deck: [eb01Doma005, st34CharlotteKatakuri001, eb01Doma005, eb01Doma005],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st34CharlotteBrulee003, "south");
    engine.resolveDecision("effectSearchSelection", { selectedIds: [] }, "south");
    orderRemainder(engine);

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(0);
    expect(view.players.south.deckCount).toBe(4);
    expect(view.prompts).toHaveLength(0);
  });
});
