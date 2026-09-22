import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { op17Kyo045 } from "../../../../cards/src/cards/characters/op17-045-kyo.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";
import { st24LawBepo004 } from "../../../../cards/src/cards/characters/st24-004-law-bepo.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST24-004 Law & Bepo", () => {
  test("[On Play] rests the chosen Character and keeps that same Character from refreshing; the Leader gains +2000 with 2 rested", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, hand: [st24LawBepo004], activeDon: 10 },
      {
        character: [
          { card: op17Kyo045, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0, rested: true },
        ],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const kyoId = engine.findCardInZone("north", "character", op17Kyo045);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.playCard(st24LawBepo004, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [kyoId] }, "south");

    expect(engine.getState().cards[kyoId]!.rested).toBe(true);
    expect(engine.getView("south").players.south.leader?.power).toBe(7000);

    // The opponent's Refresh Phase wakes the Character that was already rested but not the frozen one.
    engine.endTurn("south");
    expect(engine.getState().activeSeat).toBe("north");
    expect(engine.getState().cards[godId]!.rested).toBe(false);
    expect(engine.getState().cards[kyoId]!.rested).toBe(true);
  });

  test("[On Play] without 2 rested Characters afterwards, the Leader keeps its power", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op17RocksDXebec039, hand: [st24LawBepo004], activeDon: 10 },
      { character: [{ card: op17Kyo045, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const kyoId = engine.findCardInZone("north", "character", op17Kyo045);
    engine.playCard(st24LawBepo004, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [kyoId] }, "south");
    expect(engine.getState().cards[kyoId]!.rested).toBe(true);
    expect(engine.getView("south").players.south.leader?.power).toBe(5000);
  });
});
