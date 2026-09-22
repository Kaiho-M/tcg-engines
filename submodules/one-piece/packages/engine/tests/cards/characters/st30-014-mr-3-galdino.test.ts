import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st30Mr3Galdino014 } from "../../../../cards/src/cards/characters/st30-014-mr-3-galdino.ts";
import { st30MonkeyDLuffy012 } from "../../../../cards/src/cards/characters/st30-012-monkey-d-luffy.ts";
import { st21MonkeyDLuffy014 } from "../../../../cards/src/cards/characters/st21-014-monkey-d-luffy.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST30-014 Mr.3(Galdino)", () => {
  test("[Activate: Main] rests itself to give two 6000-base-power Characters 2 rested DON!! each", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [
          { card: st30Mr3Galdino014, playedOnTurn: 0 },
          { card: st30MonkeyDLuffy012, playedOnTurn: 0 },
          { card: st21MonkeyDLuffy014, playedOnTurn: 0 },
          { card: eb01Doma005, playedOnTurn: 0 },
        ],
        restedDon: 4,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const galdinoId = engine.findCardInZone("south", "character", st30Mr3Galdino014);
    const luffy12Id = engine.findCardInZone("south", "character", st30MonkeyDLuffy012);
    const luffy14Id = engine.findCardInZone("south", "character", st21MonkeyDLuffy014);

    engine.activateEffect(galdinoId, "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected the DON!! recipients.");
    // Doma (3000) does not qualify.
    expect(target.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [luffy12Id, luffy14Id].sort(),
    );
    engine.resolveDecision(
      "effectTargetSelection",
      { selectedIds: [luffy12Id, luffy14Id] },
      "south",
    );

    const view = engine.getView("south");
    expect(
      view.players.south.characters.find((card) => card?.instanceId === galdinoId)?.rested,
    ).toBe(true);
    expect(
      view.players.south.characters.find((card) => card?.instanceId === luffy12Id)?.attachedDon,
    ).toBe(2);
    expect(
      view.players.south.characters.find((card) => card?.instanceId === luffy14Id)?.attachedDon,
    ).toBe(2);
    expect(view.players.south.restedDon).toBe(0);
  });

  test("[Activate: Main] may be declined and Galdino stays active", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [
          { card: st30Mr3Galdino014, playedOnTurn: 0 },
          { card: st30MonkeyDLuffy012, playedOnTurn: 0 },
        ],
        restedDon: 4,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const galdinoId = engine.findCardInZone("south", "character", st30Mr3Galdino014);

    engine.activateEffect(galdinoId, "activateMain", "south");
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(
      view.players.south.characters.find((card) => card?.instanceId === galdinoId)?.rested,
    ).toBe(false);
    expect(view.players.south.restedDon).toBe(4);
    expect(view.prompts).toHaveLength(0);
  });
});
