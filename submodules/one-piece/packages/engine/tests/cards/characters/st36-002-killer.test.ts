import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { st36Killer002 } from "../../../../cards/src/cards/characters/st36-002-killer.ts";
import { op10EustassCaptainKid099 } from "../../../../cards/src/cards/leaders/op10-099-eustass-captain-kid.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { SOUTH_ATTACKS_WITHOUT_TURN_SETUP } from "../events/battle-fixture.shared.ts";

describe("ST36-002 Killer", () => {
  test("[On Play] under a Kid Pirates Leader adds the top deck card to Life", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op10EustassCaptainKid099,
        hand: [st36Killer002],
        deck: 4,
        life: 2,
        activeDon: 4,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st36Killer002, "south");
    engine.resolveDecision("effectAddToLifeFromDeck", { optionId: "1" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.lifeCount).toBe(3);
    expect(view.players.south.deckCount).toBe(3);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] under another Leader adds nothing", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st36Killer002], deck: 4, life: 2, activeDon: 4 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st36Killer002, "south");

    const view = engine.getView("south");
    expect(view.players.south.lifeCount).toBe(2);
    expect(view.players.south.deckCount).toBe(4);
    expect(view.prompts).toHaveLength(0);
  });

  test("[Trigger] plays Killer when the opponent has 3 or less Life cards", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }], life: 3 },
      { life: [st36Killer002], hand: 1 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "north");

    const north = engine.getView("north").players.north;
    expect(north.characters.map((card) => card?.cardId)).toContain(st36Killer002.id);
    expect(north.hand).toHaveLength(1);
  });

  test("[Trigger] does nothing while the opponent still has 4 or more Life cards", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }], life: 4 },
      { life: [st36Killer002], hand: 1 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "north");

    // An activated [Trigger] card whose condition fails is trashed.
    const north = engine.getView("north").players.north;
    expect(north.characters.filter(Boolean)).toHaveLength(0);
    expect(north.trash.map((card) => card.cardId)).toContain(st36Killer002.id);
    expect(north.hand).toHaveLength(1);
  });
});
