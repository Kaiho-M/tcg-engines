import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st36Cavendish001 } from "../../../../cards/src/cards/characters/st36-001-cavendish.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST36-001 Cavendish", () => {
  test("[On K.O.] trashes a card from hand to add the top deck card to Life", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st36Cavendish001, playedOnTurn: 0, rested: true }],
        hand: [eb01Doma005, eb01MountainGod018],
        deck: 4,
        life: 2,
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const cavendishId = engine.findCardInZone("south", "character", st36Cavendish001);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);
    const domaId = engine.findCardInZone("south", "hand", eb01Doma005);

    engine.declareAttack(godId, cavendishId, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostTrashFromHand", { selectedIds: [domaId] }, "south");
    engine.resolveDecision("effectAddToLifeFromDeck", { optionId: "1" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(cavendishId);
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(domaId);
    expect(view.players.south.lifeCount).toBe(3);
    expect(view.players.south.deckCount).toBe(3);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On K.O.] may be declined", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st36Cavendish001, playedOnTurn: 0, rested: true }],
        hand: [eb01Doma005, eb01MountainGod018],
        deck: 4,
        life: 2,
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const cavendishId = engine.findCardInZone("south", "character", st36Cavendish001);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.declareAttack(godId, cavendishId, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.lifeCount).toBe(2);
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.south.deckCount).toBe(4);
    expect(view.prompts).toHaveLength(0);
  });
});
