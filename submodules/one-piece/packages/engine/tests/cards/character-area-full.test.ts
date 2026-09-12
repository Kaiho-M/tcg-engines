import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { op17Kyo045 } from "../../../cards/src/cards/OP17/characters/045-kyo.ts";
import { op17RocksDXebec039 } from "../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";

import { op17CharlotteSmoothie106 } from "../../../cards/src/cards/OP17/characters/106-charlotte-smoothie.ts";
import { st32DraculeMihawk003 } from "../../../cards/src/cards/ST32/characters/003-dracule-mihawk.ts";
import { op14eb04DraculeMihawkOp14020020 } from "../../../cards/src/cards/OP14EB04/leaders/020-dracule-mihawk-op14-020.ts";

import { OnePieceTestEngine } from "../../src/index.ts";

const pendingPrompt = (engine: OnePieceTestEngine, intent: string) =>
  engine
    .getState()
    .promptQueue.find(
      (prompt) => prompt.status === "pending" && prompt.resolutionContext?.intent === intent,
    );

const fullArea = () =>
  Array.from({ length: 5 }, () => ({ card: eb01MountainGod018, playedOnTurn: 0 }));

describe("Playing a Character with a full character area (rule 6-2-2-1)", () => {
  test("naming an occupied slot trashes that Character and plays the new one there", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, character: fullArea(), hand: [op17Kyo045], activeDon: 5 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const replacedId = engine.getState().players.south.characterArea[2]!;
    const result = engine.playCard(op17Kyo045, "south", 2);
    expect(result.accepted).toBe(true);
    const state = engine.getState();
    expect(state.cards[replacedId]!.zone).toBe("trash");
    expect(state.cards[state.players.south.characterArea[2]!]!.cardId).toBe("OP17-045");
    expect(state.players.south.characterArea.filter(Boolean)).toHaveLength(5);
  });

  test("without a slot the play is still rejected (the player must choose what to trash)", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, character: fullArea(), hand: [op17Kyo045], activeDon: 5 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    expect(
      engine.expectFailure({
        type: "playCard",
        seat: "south",
        instanceId: engine.findCardInZone("south", "hand", op17Kyo045),
      }).accepted,
    ).toBe(false);
  });

  test("a [Trigger] Character played into a full area asks which Character to trash", () => {
    const engine = OnePieceTestEngine.create(
      { character: fullArea() },
      { character: fullArea(), life: [op17CharlotteSmoothie106], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.exec({
      type: "resolvePrompt",
      seat: "north",
      promptId: pendingPrompt(engine, "lifeTrigger")!.id,
      optionId: "activate",
    });
    const room = pendingPrompt(engine, "effectPlayMakeRoom");
    expect(room).toBeDefined();
    const trashId = engine.getState().players.north.characterArea[4]!;
    engine.exec({
      type: "resolvePrompt",
      seat: "north",
      promptId: room!.id,
      selectedIds: [trashId],
    });
    const state = engine.getState();
    expect(state.cards[trashId]!.zone).toBe("trash");
    expect(state.players.north.characterArea.map((id) => state.cards[id!]!.cardId)).toContain(
      "OP17-106",
    );
    expect(state.players.north.characterArea.filter(Boolean)).toHaveLength(5);
  });

  test("an effect that plays a Character from hand into a full area makes room the same way", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op14eb04DraculeMihawkOp14020020,
        character: fullArea(),
        hand: [st32DraculeMihawk003, op17Kyo045, op17Kyo045],
        activeDon: 10,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    // Play Mihawk into a full area (replacing slot 0), then its [On Play] plays a (Slash) Character from hand.
    expect(engine.playCard(st32DraculeMihawk003, "south", 0).accepted).toBe(true);
    const play =
      pendingPrompt(engine, "effectTargetSelection") ??
      pendingPrompt(engine, "effectPlaySelection");
    expect(play).toBeDefined();
    const kyoInHand = engine.findCardInZone("south", "hand", op17Kyo045);
    engine.exec({
      type: "resolvePrompt",
      seat: "south",
      promptId: play!.id,
      selectedIds: [kyoInHand],
    });
    const room = pendingPrompt(engine, "effectPlayMakeRoom");
    expect(room).toBeDefined();
    const trashId = engine.getState().players.south.characterArea[1]!;
    engine.exec({
      type: "resolvePrompt",
      seat: "south",
      promptId: room!.id,
      selectedIds: [trashId],
    });
    const state = engine.getState();
    expect(state.cards[trashId]!.zone).toBe("trash");
    expect(state.cards[kyoInHand]!.zone).toBe("character");
    expect(state.players.south.characterArea.filter(Boolean)).toHaveLength(5);
  });
});
