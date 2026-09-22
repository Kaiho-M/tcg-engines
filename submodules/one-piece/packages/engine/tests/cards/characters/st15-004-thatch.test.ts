import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st15Thatch004 } from "../../../../cards/src/cards/characters/st15-004-thatch.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/leaders/op16-001-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST15-004 Thatch", () => {
  test("[On Play] under a Whitebeard Pirates Leader: -2000 power to an opposing Character, then a Life card to hand", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: op16PortgasDAce001, hand: [st15Thatch004], activeDon: 1, life: 3 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(st15Thatch004, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Thatch's power target.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([domaId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [domaId] }, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.find((card) => card?.instanceId === domaId)?.power).toBe(
      1000,
    );
    expect(view.players.south.lifeCount).toBe(2);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });

  test("[On Play] does nothing under another Leader", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st15Thatch004], activeDon: 1, life: 3 },
      { character: [{ card: eb01Doma005, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const domaId = engine.findCardInZone("north", "character", eb01Doma005);

    engine.playCard(st15Thatch004, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.find((card) => card?.instanceId === domaId)?.power).toBe(
      3000,
    );
    expect(view.players.south.lifeCount).toBe(3);
    expect(view.players.south.hand).toHaveLength(0);
    expect(view.prompts).toHaveLength(0);
  });
});
