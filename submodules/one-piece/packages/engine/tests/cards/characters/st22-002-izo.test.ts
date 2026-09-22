import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st22Izo002 } from "../../../../cards/src/cards/characters/st22-002-izo.ts";
import { st15Thatch004 } from "../../../../cards/src/cards/characters/st15-004-thatch.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST22-002 Izo", () => {
  test("[On Play] looks at 5 and adds a Whitebeard Pirates card other than [Izo] to hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st22Izo002],
        deck: [
          st22Izo002,
          st15Thatch004,
          eb01MountainGod018,
          eb01MountainGod018,
          eb01MountainGod018,
          eb01MountainGod018,
        ],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const thatchId = engine.findCardInZone("south", "deck", st15Thatch004);

    engine.playCard(st22Izo002, "south");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected Izo's search.");
    // The other Izo in the top 5 is excluded by name; Mountain God is not a Whitebeard Pirates card.
    expect(
      search.candidates.filter((candidate) => candidate.legal).map((candidate) => candidate.ref.id),
    ).toEqual([thatchId]);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [thatchId] }, "south");
    const remainder = engine.pendingDecision("effectSearchRemainderOrder", "south").steps[0];
    if (remainder?.kind !== "orderItems") throw new Error("Expected the deck order.");
    engine.resolveDecision(
      "effectSearchRemainderOrder",
      { selectedIds: remainder.candidates.map((candidate) => candidate.ref.id) },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(thatchId);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Your Opponent's Attack] trashes itself to draw 1 and bottom-deck 1 card from hand", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st22Izo002, playedOnTurn: 0 }], hand: [eb01Doma005], deck: 3 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const izoId = engine.findCardInZone("south", "character", st22Izo002);
    const attackerId = engine.findCardInZone("north", "character", eb01Doma005);
    const domaInHand = engine.findCardInZone("south", "hand", eb01Doma005);

    engine.declareAttack(attackerId, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [domaInHand] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(izoId);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.hand.map((card) => card.instanceId)).not.toContain(domaInHand);
    expect(view.players.south.deckCount).toBe(3);
  });

  test("[On Your Opponent's Attack] may be declined and Izo stays", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st22Izo002, playedOnTurn: 0 }], hand: [eb01Doma005], deck: 3 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const izoId = engine.findCardInZone("south", "character", st22Izo002);
    const attackerId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.declareAttack(attackerId, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(izoId);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.deckCount).toBe(3);
  });
});
