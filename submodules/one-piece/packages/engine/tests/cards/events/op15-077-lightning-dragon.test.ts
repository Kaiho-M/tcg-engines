import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01Fourtricks025, eb01MountainGod018 } from "@tcg/op-cards";
import { op15LightningDragon077 } from "../../../../cards/src/cards/events/op15-077-lightning-dragon.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP15-077 Lightning Dragon", () => {
  test("[Main] DON!! -1 draws, then keeps one rested opposing Character with 6000 power or less from refreshing", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [op15LightningDragon077],
        deck: [eb01Fourtricks025, eb01Doma005],
        activeDon: 1,
      },
      {
        character: [
          { card: eb01Doma005, rested: true },
          { card: eb01MountainGod018, rested: true },
          eb01Doma005,
        ],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const eligibleId = engine.findCardInZone("north", "character", eb01Doma005);
    const tooStrongId = engine.findCardInZone("north", "character", eb01MountainGod018);
    const drawnId = engine.findCardInZone("south", "deck", eb01Fourtricks025);
    const activeId = engine
      .getView("north")
      .players.north.characters.find(
        (card) => card && !card.rested && card.cardId === eb01Doma005.id,
      )?.instanceId;

    engine.playCard(op15LightningDragon077, "south");

    expect(engine.getView("south").players.south.hand.map((card) => card.instanceId)).toContain(
      drawnId,
    );
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected the freeze target choice.");
    expect(target).toMatchObject({ min: 0, max: 1 });
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([eligibleId]);
    expect(target.candidates.map((candidate) => candidate.ref.id)).not.toContain(tooStrongId);
    expect(target.candidates.map((candidate) => candidate.ref.id)).not.toContain(activeId);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [eligibleId] }, "south");

    expect(engine.getView("south").players.south.activeDon).toBe(0);

    engine.endTurn("south");
    const view = engine.getView("north");
    expect(
      view.players.north.characters.find((card) => card?.instanceId === eligibleId)?.rested,
    ).toBe(true);
    expect(
      view.players.north.characters.find((card) => card?.instanceId === tooStrongId)?.rested,
    ).toBe(false);
  });
});
