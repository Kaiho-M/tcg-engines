import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018, op01Crocodile062 } from "@tcg/op-cards";
import { st29Jinbe005 } from "../../../../cards/src/cards/characters/st29-005-jinbe.ts";
import { st29NicoRobin009 } from "../../../../cards/src/cards/characters/st29-009-nico-robin.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { SOUTH_ATTACKS_WITHOUT_TURN_SETUP } from "../events/battle-fixture.shared.ts";

// ST29-005 Jinbe and ST29-009 Nico Robin share the Life [Trigger]:
// "If your Leader is [Monkey.D.Luffy], play this card." The default fixture
// Leader is OP01-001 Monkey.D.Luffy.
describe("ST29-005 Jinbe / ST29-009 Nico Robin", () => {
  test("[Trigger] under a [Monkey.D.Luffy] Leader plays the card from Life", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { life: [st29Jinbe005, st29NicoRobin009], hand: 1 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "north");

    const north = engine.getView("north").players.north;
    expect(north.characters.map((card) => card?.cardId)).toContain(st29Jinbe005.id);
    expect(north.lifeCount).toBe(1);
    expect(north.hand).toHaveLength(1);
    expect(engine.getView("north").prompts).toHaveLength(0);
  });

  test("[Trigger] under another Leader has no effect and the card is trashed", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { leaderCardId: op01Crocodile062, life: [st29NicoRobin009], hand: 1 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "activate" }, "north");

    // An activated [Trigger] card whose condition fails is trashed.
    const north = engine.getView("north").players.north;
    expect(north.characters.filter(Boolean)).toHaveLength(0);
    expect(north.trash.map((card) => card.cardId)).toContain(st29NicoRobin009.id);
    expect(north.hand).toHaveLength(1);
    expect(north.lifeCount).toBe(0);
  });

  test("[Trigger] may be skipped so the card is simply added to hand", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { life: [st29Jinbe005], hand: 1 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const attackerId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.declareAttack(attackerId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.resolveDecision("lifeTrigger", { optionId: "skip" }, "north");

    const north = engine.getView("north").players.north;
    expect(north.characters.filter(Boolean)).toHaveLength(0);
    expect(north.hand.map((card) => card.cardId)).toContain(st29Jinbe005.id);
  });
});
