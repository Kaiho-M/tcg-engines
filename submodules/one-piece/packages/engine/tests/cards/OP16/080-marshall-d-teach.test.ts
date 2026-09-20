import { describe, expect, test } from "vite-plus/test";
import { op16MarshallDTeach080 } from "../../../../cards/src/cards/OP16/leaders/080-marshall-d-teach.ts";
import { op16Shiryu108 } from "../../../../cards/src/cards/OP16/characters/108-shiryu.ts";
import { op16VascoShot110 } from "../../../../cards/src/cards/OP16/characters/110-vasco-shot.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";
import { st30Crocodile010 } from "../../../../cards/src/cards/ST30/characters/010-crocodile.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP16-080 Marshall.D.Teach", () => {
  test("[On Your Opponent's Attack] trashing a [Trigger] card redirects the attack to this Leader or a {Blackbeard Pirates} Character", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16MarshallDTeach080,
        character: [{ card: op16Shiryu108, playedOnTurn: 0 }],
        // Crocodile has no [Trigger]; it stays in hand so the counter step still prompts.
        hand: [op16VascoShot110, st30Crocodile010],
      },
      {
        leaderCardId: op17RocksDXebec039,
        character: [{ card: st30Crocodile010, playedOnTurn: 0 }],
      },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const attacker = engine
      .getState()
      .players.north.characterArea.find((id): id is string => Boolean(id))!;
    engine.declareAttack(attacker, engine.leader("south"), "north");

    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    // The only [Trigger] card in hand is trashed as the cost.
    expect(engine.getState().players.south.hand).toHaveLength(1);
    expect(engine.getState().players.south.trash).toHaveLength(1);

    const step = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    const labels =
      step?.kind === "selectEntity" ? step.candidates.filter((c) => c.legal).map((c) => c.label) : [];
    expect(labels.sort()).toEqual(["Marshall.D.Teach", "Shiryu"]);

    const shiryuId = engine.findCardInZone("south", "character", op16Shiryu108);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [shiryuId] }, "south");
    expect(engine.getState().battle?.targetId).toBe(shiryuId);
    expect(engine.pendingDecision("battleCounter", "south")).toBeDefined();
  });
});
