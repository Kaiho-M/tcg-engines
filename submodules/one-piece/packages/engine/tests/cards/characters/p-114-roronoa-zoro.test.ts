import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { pRoronoaZoro114 } from "../../../../cards/src/cards/characters/p-114-roronoa-zoro.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("P-114 Roronoa Zoro", () => {
  test("[End of Your Turn] with an active DON!! left, the rested Zoro becomes active again", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: pRoronoaZoro114, playedOnTurn: 0 }], activeDon: 2 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0, rested: true }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const zoroId = engine.findCardInZone("south", "character", pRoronoaZoro114);
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.declareAttack(zoroId, domaId, "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    expect(engine.getState().cards[zoroId]?.rested).toBe(true);

    engine.endTurn("south");

    const view = engine.getView("south");
    expect(view.players.south.characters.find((card) => card?.instanceId === zoroId)?.rested).toBe(
      false,
    );
    expect(view.players.south.activeDon).toBe(2);
    expect(view.players.north.characters.map((card) => card?.instanceId)).not.toContain(domaId);
    expect(getKeywords(engine.getState(), zoroId)).toContain("blocker");
  });

  test("[End of Your Turn] with no active DON!! Zoro stays rested", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: pRoronoaZoro114, playedOnTurn: 0 }], restedDon: 2 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0, rested: true }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const zoroId = engine.findCardInZone("south", "character", pRoronoaZoro114);
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.declareAttack(zoroId, domaId, "south");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "north");
    engine.endTurn("south");

    const view = engine.getView("south");
    expect(view.players.south.characters.find((card) => card?.instanceId === zoroId)?.rested).toBe(
      true,
    );
    expect(view.players.south.activeDon).toBe(0);
  });
});
