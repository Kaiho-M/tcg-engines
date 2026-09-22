import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { pPortgasDAce153 } from "../../../../cards/src/cards/characters/p-153-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("P-153 Portgas.D.Ace", () => {
  test("[On Play] gives up to 2 opposing Characters -3000 power for the turn", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pPortgasDAce153], activeDon: 6 },
      {
        character: [
          { card: eb01Doma005, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0 },
        ],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.playCard(pPortgasDAce153, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Ace's power targets.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([domaId, godId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [domaId, godId] }, "south");

    const north = engine.getView("south").players.north;
    expect(north.characters.find((card) => card?.instanceId === domaId)?.power).toBe(0);
    expect(north.characters.find((card) => card?.instanceId === godId)?.power).toBe(4000);
    engine.endTurn("south");
    const after = engine.getView("south").players.north;
    expect(after.characters.find((card) => card?.instanceId === domaId)?.power).toBe(3000);
    expect(after.characters.find((card) => card?.instanceId === godId)?.power).toBe(7000);
  });

  test("[On Play] may choose fewer than 2 targets", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [pPortgasDAce153], activeDon: 6 },
      {
        character: [
          { card: eb01Doma005, playedOnTurn: 0 },
          { card: eb01MountainGod018, playedOnTurn: 0 },
        ],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.playCard(pPortgasDAce153, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [godId] }, "south");

    const north = engine.getView("south").players.north;
    expect(north.characters.find((card) => card?.instanceId === domaId)?.power).toBe(3000);
    expect(north.characters.find((card) => card?.instanceId === godId)?.power).toBe(4000);
    expect(engine.getView("south").prompts).toHaveLength(0);
  });
});
