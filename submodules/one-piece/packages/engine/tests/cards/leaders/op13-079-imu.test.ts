import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { op13Imu079 } from "../../../../cards/src/cards/leaders/op13-079-imu.ts";
import { op13MonkeyDLuffy001 } from "../../../../cards/src/cards/leaders/op13-001-monkey-d-luffy.ts";
import { op13TheEmptyThrone099 } from "../../../../cards/src/cards/stages/op13-099-the-empty-throne.ts";

import {
  applyCommand,
  createMatch,
  OnePieceTestEngine,
  type EngineCommand,
} from "../../../src/index.ts";

describe("OP13-079 Imu", () => {
  test("at the start of the game plays a {Mary Geoise} Stage from the deck before the first turn", () => {
    // Deck order is kept (shuffleDecks: false); the Stage sits below the opening hand and Life.
    const filler = Array.from({ length: 12 }, () => eb01Doma005.id);
    let state = createMatch({
      firstPlayer: "south",
      shuffleDecks: false,
      players: {
        south: { leaderCardId: op13Imu079.id, mainDeck: [...filler, op13TheEmptyThrone099.id] },
        north: { leaderCardId: op13MonkeyDLuffy001.id, mainDeck: [...filler, eb01Doma005.id] },
      },
    });
    const commands: EngineCommand[] = [
      { type: "chooseJoKenPo", seat: "south", choice: "paper" },
      { type: "chooseJoKenPo", seat: "north", choice: "rock" },
      { type: "chooseFirstPlayer", seat: "south", firstPlayer: "south" },
      { type: "keepHand", seat: "south" },
      { type: "keepHand", seat: "north" },
      { type: "startGame", seat: "south" },
    ];
    for (const command of commands) {
      const result = applyCommand(state, command);
      expect(result.accepted).toBe(true);
      state = result.state;
    }

    const throneId = state.players.south.deck.find(
      (id) => state.cards[id]?.cardId === op13TheEmptyThrone099.id,
    );
    const prompt = state.promptQueue.find((entry) => entry.seat === "south");
    expect(prompt?.resolutionContext?.intent).toBe("effectPlaySelection");
    expect(throneId).toBeDefined();
    const played = applyCommand(state, {
      type: "resolvePrompt",
      seat: "south",
      promptId: prompt!.id,
      selectedIds: [throneId!],
    });
    expect(played.accepted).toBe(true);
    expect(played.state.players.south.stageArea).toBe(throneId);
    expect(played.state.turnNumber).toBe(1);
  });

  test("[Activate: Main] may pay by trashing either a {Celestial Dragons} Character or a hand card", () => {
    const engine = OnePieceTestEngine.create({
      leaderCardId: op13Imu079,
      hand: [eb01Doma005, eb01Doma005],
      character: [eb01Doma005],
      deck: 3,
    });
    const handIds = engine.getState().players.south.hand;
    const characterId = engine.findCardInZone("south", "character", eb01Doma005);

    engine.activateEffect(engine.leader("south"), "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const payment = engine.pendingDecision("effectCostTrashCard", "south").steps[0];
    if (payment?.kind !== "payCost") throw new Error("Expected Imu's trash payment.");
    // Doma is not a Celestial Dragon, so only the hand cards qualify.
    expect(payment.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [...handIds].sort(),
    );
    expect(payment.candidates.map((candidate) => candidate.ref.id)).not.toContain(characterId);
    engine.resolveDecision("effectCostTrashCard", { selectedIds: [handIds[0]!] }, "south");

    const south = engine.getState().players.south;
    expect(south.trash).toContain(handIds[0]);
    expect(south.characterArea).toContain(characterId);
    expect(south.hand).toHaveLength(2);
  });

  test("[Activate: Main] may be declined, leaving the hand, board and deck alone", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op13Imu079, hand: [eb01Doma005], deck: 5 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.activateEffect(engine.leader("south"), "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.deckCount).toBe(5);
    expect(view.players.south.trash).toHaveLength(0);
    expect(view.players.south.characters.filter(Boolean)).toHaveLength(0);
    expect(view.prompts).toHaveLength(0);
  });
});
