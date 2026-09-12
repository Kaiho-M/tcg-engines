import { describe, expect, test } from "vite-plus/test";
import { op16Curiel004 } from "../../../../cards/src/cards/OP16/characters/004-curiel.ts";
import { op16LittleoarsJr017 } from "../../../../cards/src/cards/OP16/characters/017-littleoars-jr.ts";
import { op16PortgasDAce118 } from "../../../../cards/src/cards/OP16/characters/118-portgas-d-ace.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/OP16/leaders/001-portgas-d-ace.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP16-001 Portgas.D.Ace", () => {
  test("[Activate: Main] gives Rush to a {Whitebeard Pirates} Character with 8000 power or more", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        // Curiel qualifies; Oars Jr. sits at 4000 without a cost-8 crewmate and Ace is 6000.
        character: [op16Curiel004, op16LittleoarsJr017, op16PortgasDAce118],
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const curielId = engine.findCardInZone("south", "character", op16Curiel004);
    engine.activateEffect(engine.leader("south"), "activateMain", "south");

    const step = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (step?.kind !== "selectEntity") throw new Error("Expected a Rush target selection.");
    expect(step.candidates.filter((candidate) => candidate.legal).map((c) => c.ref.id)).toEqual([
      curielId,
    ]);

    engine.resolveDecision("effectTargetSelection", { selectedIds: [curielId] }, "south");
    const lifeBefore = engine.getView("south").players.north.lifeCount;
    engine.declareAttack(curielId, engine.leader("north"), "south");
    expect(engine.getView("south").players.north.lifeCount).toBe(lifeBefore - 1);
  });
});
