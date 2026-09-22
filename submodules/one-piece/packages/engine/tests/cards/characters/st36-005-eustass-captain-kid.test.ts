import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st36EustassCaptainKid005 } from "../../../../cards/src/cards/characters/st36-005-eustass-captain-kid.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe('ST36-005 Eustass"Captain"Kid', () => {
  test("[Activate: Main] turns a Life card of the chosen end face-up, then gives a rested DON!! to the Leader", () => {
    const engine = OnePieceTestEngine.create({
      character: [{ card: st36EustassCaptainKid005, playedOnTurn: 0 }],
      life: 2,
      restedDon: 1,
    });
    const kidId = engine.findCardInZone("south", "character", st36EustassCaptainKid005);
    const [topLifeId, bottomLifeId] = engine.getState().players.south.life;

    engine.activateEffect(kidId, "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostTurnLifeFaceUp", { optionId: "bottom" }, "south");
    engine.resolveDecision("effectGiveDonCount", { optionId: "1" }, "south");

    const state = engine.getState();
    expect(state.cards[bottomLifeId!]?.faceUp).toBe(true);
    expect(state.cards[topLifeId!]?.faceUp).toBe(false);
    expect(state.cards[engine.leader("south")]?.attachedDon).toBe(1);
    expect(state.players.south.restedDon).toBe(0);
  });

  test("[On Your Opponent's Attack] turning a face-up Life card face-down redirects the attack to this Kid", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st36EustassCaptainKid005, playedOnTurn: 0 }],
        life: [
          { card: eb01Doma005, faceUp: true },
          { card: eb01Doma005, faceUp: false },
        ],
        // A card in hand keeps the battle open at the counter step so the new target is visible.
        hand: [eb01Doma005],
      },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const kidId = engine.findCardInZone("south", "character", st36EustassCaptainKid005);
    const attackerId = engine.findCardInZone("north", "character", eb01Doma005);
    const [topLifeId] = engine.getState().players.south.life;

    engine.declareAttack(attackerId, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    engine.resolveDecision("effectCostTurnLifeFaceUp", { optionId: "top" }, "south");

    expect(engine.getState().cards[topLifeId!]?.faceUp).toBe(false);
    expect(engine.getState().battle?.targetId).toBe(kidId);
    expect(engine.pendingDecision("battleCounter", "south")).toBeDefined();
  });

  test("declining the Life cost leaves the attack target and Life as they were", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st36EustassCaptainKid005, playedOnTurn: 0 }],
        life: [
          { card: eb01Doma005, faceUp: true },
          { card: eb01Doma005, faceUp: false },
        ],
        hand: [eb01Doma005],
      },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const attackerId = engine.findCardInZone("north", "character", eb01Doma005);
    const [topLifeId] = engine.getState().players.south.life;

    engine.declareAttack(attackerId, engine.leader("south"), "north");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    expect(engine.getState().cards[topLifeId!]?.faceUp).toBe(true);
    expect(engine.getState().battle?.targetId).toBe(engine.leader("south"));
    expect(engine.getView("south").players.south.lifeCount).toBe(2);
    expect(engine.getView("south").players.south.hand).toHaveLength(1);
  });
});
