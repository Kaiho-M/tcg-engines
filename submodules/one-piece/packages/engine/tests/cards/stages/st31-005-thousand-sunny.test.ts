import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st31ThousandSunny005 } from "../../../../cards/src/cards/stages/st31-005-thousand-sunny.ts";
import { st30MonkeyDLuffy012 } from "../../../../cards/src/cards/characters/st30-012-monkey-d-luffy.ts";
import { st29Jinbe005 } from "../../../../cards/src/cards/characters/st29-005-jinbe.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST31-005 Thousand Sunny", () => {
  test("[On Play] looks at 5 and adds a Straw Hat Crew card to hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st31ThousandSunny005],
        deck: [
          eb01MountainGod018,
          eb01MountainGod018,
          st29Jinbe005,
          eb01MountainGod018,
          eb01MountainGod018,
          eb01MountainGod018,
        ],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const jinbeId = engine.findCardInZone("south", "deck", st29Jinbe005);

    engine.playCard(st31ThousandSunny005, "south");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected the Sunny's search.");
    expect(
      search.candidates.filter((candidate) => candidate.legal).map((candidate) => candidate.ref.id),
    ).toEqual([jinbeId]);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [jinbeId] }, "south");
    const remainder = engine.pendingDecision("effectSearchRemainderOrder", "south").steps[0];
    if (remainder?.kind !== "orderItems") throw new Error("Expected the deck order.");
    engine.resolveDecision(
      "effectSearchRemainderOrder",
      { selectedIds: remainder.candidates.map((candidate) => candidate.ref.id) },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.south.stage?.cardId).toBe(st31ThousandSunny005.id);
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(jinbeId);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.prompts).toHaveLength(0);
  });

  test("[Activate: Main] rests the Stage to give a rested DON!! to a [Monkey.D.Luffy] card", () => {
    const engine = OnePieceTestEngine.create(
      {
        stage: st31ThousandSunny005,
        character: [
          { card: st30MonkeyDLuffy012, playedOnTurn: 0 },
          { card: eb01Doma005, playedOnTurn: 0 },
        ],
        restedDon: 2,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const sunnyId = engine.findCardInZone("south", "stage", st31ThousandSunny005);
    const luffyId = engine.findCardInZone("south", "character", st30MonkeyDLuffy012);

    engine.activateEffect(sunnyId, "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectGiveDonCount", { optionId: "1" }, "south");
    const recipient = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (recipient?.kind !== "selectEntity") throw new Error("Expected the DON!! recipient.");
    // The default Leader OP01-001 is also [Monkey.D.Luffy]; Doma is not.
    expect(recipient.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [engine.leader("south"), luffyId].sort(),
    );
    engine.resolveDecision("effectTargetSelection", { selectedIds: [luffyId] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.stage?.rested).toBe(true);
    expect(
      view.players.south.characters.find((card) => card?.instanceId === luffyId)?.attachedDon,
    ).toBe(1);
    expect(view.players.south.restedDon).toBe(1);
  });

  test("[Activate: Main] may be declined and the Stage stays active", () => {
    const engine = OnePieceTestEngine.create(
      {
        stage: st31ThousandSunny005,
        character: [{ card: st30MonkeyDLuffy012, playedOnTurn: 0 }],
        restedDon: 2,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const sunnyId = engine.findCardInZone("south", "stage", st31ThousandSunny005);

    engine.activateEffect(sunnyId, "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.stage?.rested).toBe(false);
    expect(view.players.south.restedDon).toBe(2);
    expect(view.prompts).toHaveLength(0);
  });
});
