import { describe, expect, test } from "vite-plus/test";
import { eb01MountainGod018 } from "@tcg/op-cards";
import { st30CanYouStillFightLuffyOfCourse016 as st30CanYouStillFight016 } from "../../../../cards/src/cards/events/st30-016-can-you-still-fight-luffy-of-course.ts";
import { st30MonkeyDLuffy012 } from "../../../../cards/src/cards/characters/st30-012-monkey-d-luffy.ts";
import { op07PortgasDAce053 } from "../../../../cards/src/cards/characters/op07-053-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST30-016 Can You Still Fight, Luffy?! Of Course!!", () => {
  test("[Counter] gives +3000 power and, with 6000-base Ace and Luffy Characters, draws 1", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      {
        character: [
          { card: st30MonkeyDLuffy012, playedOnTurn: 0 },
          { card: op07PortgasDAce053, playedOnTurn: 0 },
        ],
        hand: [st30CanYouStillFight016],
        deck: 3,
        activeDon: 1,
        life: 2,
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("south", "character", eb01MountainGod018);
    const eventId = engine.findCardInZone("north", "hand", st30CanYouStillFight016);

    engine.declareAttack(godId, engine.leader("north"), "south");
    engine.resolveDecision("battleBlocker", { selectedIds: ["skip"] }, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [eventId] }, "north");
    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [engine.leader("north")] },
      "north",
    );

    const view = engine.getView("north");
    // 5000 + 3000 = 8000 > 7000: the Leader is not hit, and the draw happened.
    expect(view.players.north.lifeCount).toBe(2);
    expect(view.players.north.hand).toHaveLength(1);
    expect(view.players.north.deckCount).toBe(2);
    expect(view.players.north.trash.map((card) => card.instanceId)).toContain(eventId);
  });

  test("[Counter] without the Ace and Luffy pair only the +3000 applies", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      {
        character: [{ card: st30MonkeyDLuffy012, playedOnTurn: 0 }],
        hand: [st30CanYouStillFight016],
        deck: 3,
        activeDon: 1,
        life: 2,
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("south", "character", eb01MountainGod018);
    const eventId = engine.findCardInZone("north", "hand", st30CanYouStillFight016);

    engine.declareAttack(godId, engine.leader("north"), "south");
    engine.resolveDecision("battleBlocker", { selectedIds: ["skip"] }, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [eventId] }, "north");
    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [engine.leader("north")] },
      "north",
    );

    const view = engine.getView("north");
    expect(view.players.north.lifeCount).toBe(2);
    expect(view.players.north.hand).toHaveLength(0);
    expect(view.players.north.deckCount).toBe(3);
  });
});
