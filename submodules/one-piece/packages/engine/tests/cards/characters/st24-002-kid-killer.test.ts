import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st24KidKiller002 } from "../../../../cards/src/cards/characters/st24-002-kid-killer.ts";
import { st36Killer002 } from "../../../../cards/src/cards/characters/st36-002-killer.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST24-002 Kid & Killer", () => {
  test("[On Play] looks at 5 and adds a Supernovas card to hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st24KidKiller002],
        deck: [eb01Doma005, eb01Doma005, st36Killer002, eb01Doma005, eb01Doma005, eb01Doma005],
        activeDon: 2,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const killerId = engine.findCardInZone("south", "deck", st36Killer002);

    engine.playCard(st24KidKiller002, "south");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected the Supernovas search.");
    expect(
      search.candidates.filter((candidate) => candidate.legal).map((candidate) => candidate.ref.id),
    ).toEqual([killerId]);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [killerId] }, "south");
    const remainder = engine.pendingDecision("effectSearchRemainderOrder", "south").steps[0];
    if (remainder?.kind !== "orderItems") throw new Error("Expected the deck order.");
    engine.resolveDecision(
      "effectSearchRemainderOrder",
      { selectedIds: remainder.candidates.map((candidate) => candidate.ref.id) },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(killerId);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Your Opponent's Attack] trashes itself to set a DON!! active", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st24KidKiller002, playedOnTurn: 0 }], restedDon: 2, hand: 1 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const kidId = engine.findCardInZone("south", "character", st24KidKiller002);
    const attackerId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.declareAttack(attackerId, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectSetActiveDon", { optionId: "1" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(kidId);
    expect(view.players.south.activeDon).toBe(1);
    expect(view.players.south.restedDon).toBe(1);
  });

  test("[On Your Opponent's Attack] may be declined", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: st24KidKiller002, playedOnTurn: 0 }], restedDon: 2, hand: 1 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const kidId = engine.findCardInZone("south", "character", st24KidKiller002);
    const attackerId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.declareAttack(attackerId, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(kidId);
    expect(view.players.south.activeDon).toBe(0);
    expect(view.players.south.restedDon).toBe(2);
  });
});
