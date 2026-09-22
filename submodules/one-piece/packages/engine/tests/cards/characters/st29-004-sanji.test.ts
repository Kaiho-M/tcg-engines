import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st29Sanji004 } from "../../../../cards/src/cards/characters/st29-004-sanji.ts";
import { st29Jinbe005 } from "../../../../cards/src/cards/characters/st29-005-jinbe.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { SOUTH_ATTACKS_WITHOUT_TURN_SETUP } from "../events/battle-fixture.shared.ts";

describe("ST29-004 Sanji", () => {
  test("[On Play] looks at 4 and adds a Straw Hat Crew card to hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [st29Sanji004],
        deck: [
          eb01MountainGod018,
          st29Jinbe005,
          eb01MountainGod018,
          eb01MountainGod018,
          eb01MountainGod018,
        ],
        activeDon: 4,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const jinbeId = engine.findCardInZone("south", "deck", st29Jinbe005);

    engine.playCard(st29Sanji004, "south");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected Sanji's search.");
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
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(jinbeId);
    expect(view.players.south.deckCount).toBe(4);
    expect(view.prompts).toHaveLength(0);
  });

  test("[Trigger] trashes a card from hand to play Sanji from Life", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      {
        life: [st29Sanji004],
        hand: [eb01Doma005, eb01Doma005],
        deck: [eb01MountainGod018, eb01MountainGod018, eb01MountainGod018, eb01MountainGod018],
      },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);
    const paymentId = engine.findCardInZone("north", "hand", eb01Doma005);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "north");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "north");
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [paymentId] }, "north");

    const north = engine.getView("north").players.north;
    expect(north.characters.map((card) => card?.cardId)).toContain(st29Sanji004.id);
    expect(north.trash.map((card) => card.instanceId)).toContain(paymentId);
    expect(north.lifeCount).toBe(0);
  });

  test("[Trigger] may be declined and Sanji goes to hand", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { life: [st29Sanji004], hand: [eb01Doma005, eb01Doma005] },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "north");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "north");

    // An activated [Trigger] card that is not played is trashed, not added to hand.
    const north = engine.getView("north").players.north;
    expect(north.characters.filter(Boolean)).toHaveLength(0);
    expect(north.trash.map((card) => card.cardId)).toContain(st29Sanji004.id);
    expect(north.hand).toHaveLength(2);
    expect(north.lifeCount).toBe(0);
  });
});
