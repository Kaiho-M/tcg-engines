import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { op15eb04Enel058 } from "../../../../cards/src/cards/OP15EB04/leaders/058-enel.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP15-058 Enel", () => {
  test("adds 1 active and up to 4 rested DON!!, then gives the rested DON!! to one Character", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op15eb04Enel058,
        character: [eb01Doma005, eb01MountainGod018],
        activeDon: 1,
        donDeckCount: 5,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const characterId = engine.findCardInZone("south", "character", eb01Doma005);
    const otherId = engine.findCardInZone("south", "character", eb01MountainGod018);

    engine.activateEffect(engine.leader("south"), "activateMain", "south");

    engine.resolveDecision("effectAddDon", { optionId: "1" }, "south");
    engine.resolveDecision("effectAddDon", { optionId: "4" }, "south");
    let view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(2);
    expect(view.players.south.restedDon).toBe(4);
    expect(view.players.south.donDeckCount).toBe(0);

    engine.resolveDecision("effectGiveDonCount", { optionId: "4" }, "south");
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected Enel's DON!! recipient.");
    expect(target.candidates.map((candidate) => candidate.ref.id)).toEqual([characterId, otherId]);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [characterId] }, "south");

    view = engine.getView("south");
    expect(
      view.players.south.characters.find((card) => card?.instanceId === characterId)?.attachedDon,
    ).toBe(4);
    expect(view.players.south.restedDon).toBe(0);
    expect(view.players.south.activeDon).toBe(2);
    expect(view.prompts).toHaveLength(0);
    expect(() => engine.activateEffect(engine.leader("south"), "activateMain", "south")).toThrow(
      "This effect has already been used this turn.",
    );
  });

  test("is limited by the remaining DON!! deck", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op15eb04Enel058,
        character: [eb01Doma005],
        activeDon: 4,
        donDeckCount: 2,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.activateEffect(engine.leader("south"), "activateMain", "south");
    expect(engine.pendingDecision("effectAddDon", "south").steps[0]).toMatchObject({
      kind: "chooseOption",
      options: [{ id: "0" }, { id: "1" }],
    });
    engine.resolveDecision("effectAddDon", { optionId: "1" }, "south");
    expect(engine.pendingDecision("effectAddDon", "south").steps[0]).toMatchObject({
      kind: "chooseOption",
      options: [{ id: "0" }, { id: "1" }],
    });
    engine.resolveDecision("effectAddDon", { optionId: "1" }, "south");
    engine.resolveDecision("effectGiveDonCount", { optionId: "0" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(5);
    expect(view.players.south.restedDon).toBe(1);
    expect(view.players.south.donDeckCount).toBe(0);
    expect(view.prompts).toHaveLength(0);
  });
});
