import { describe, expect, test } from "vite-plus/test";
import { op01RoronoaZoro001 } from "../../../../cards/src/cards/OP01/leaders/001-roronoa-zoro.ts";
import { op12ColorOfTheSupremeKingHaki018 } from "../../../../cards/src/cards/OP12/events/018-color-of-the-supreme-king-haki.ts";
import { op12SilversRayleigh001 } from "../../../../cards/src/cards/OP12/leaders/001-silvers-rayleigh.ts";
import { op17Kyo045 } from "../../../../cards/src/cards/OP17/characters/045-kyo.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP12-018 Color of the Supreme King Haki", () => {
  test("[Counter] offers a Character or the [Silvers Rayleigh] Leader; resting a DON!! then gives the attacker's side −1000", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op12SilversRayleigh001,
        hand: [op12ColorOfTheSupremeKingHaki018],
        activeDon: 2,
        character: [{ card: op17Kyo045, playedOnTurn: 0 }],
      },
      {
        leaderCardId: op01RoronoaZoro001,
        hand: 1,
        character: [{ card: op17Kyo045, playedOnTurn: 0 }],
      },
      { firstPlayer: "south", activeSeat: "north" },
    );
    engine.declareAttack(engine.leader("north"), engine.leader("south"), "north");
    const eventId = engine.findCardInZone("south", "hand", op12ColorOfTheSupremeKingHaki018);
    engine.resolveDecision("battleCounter", { selectedIds: [eventId] }, "south");

    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected the +2000 target choice.");
    const kyoId = engine.findCardInZone("south", "character", op17Kyo045);
    expect(target.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [engine.leader("south"), kyoId].sort(),
    );
    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [engine.leader("south")] },
      "south",
    );
    expect(engine.getView("south").players.south.leader?.power).toBe(7000);

    // The second sentence is its own optional step: rest 1 DON!! to give the attacker's side -1000.
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const northKyoId = engine.findCardInZone("north", "character", op17Kyo045);
    expect(engine.getView("south").players.south).toMatchObject({ activeDon: 1, restedDon: 1 });
    expect(engine.getView("north").players.north.leader?.power).toBe(4000);
    expect(
      engine
        .getView("north")
        .players.north.characters.find((card) => card?.instanceId === northKyoId)?.power,
    ).toBe(op17Kyo045.power! - 1000);
  });
});
