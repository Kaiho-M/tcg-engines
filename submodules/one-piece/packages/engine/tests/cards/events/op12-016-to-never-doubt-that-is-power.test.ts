import { describe, expect, test } from "vite-plus/test";
import { eb01TonyTonyChopper006 } from "@tcg/op-cards";
import { op12ToNeverDoubtThatIsPower016 } from "../../../../cards/src/cards/events/op12-016-to-never-doubt-that-is-power.ts";
import { op08SilversRayleigh118 } from "../../../../cards/src/cards/characters/op08-118-silvers-rayleigh.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { SOUTH_ATTACKS_WITHOUT_TURN_SETUP } from "../events/battle-fixture.shared.ts";

describe("OP12-016 To Never Doubt--That Is Power!", () => {
  test("[Main] the [Silvers Rayleigh] given the DON!! cannot be blocked this turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [op12ToNeverDoubtThatIsPower016],
        character: [{ card: op08SilversRayleigh118, playedOnTurn: 0 }],
        activeDon: 2,
      },
      { character: [eb01TonyTonyChopper006], life: 2 },
      SOUTH_ATTACKS_WITHOUT_TURN_SETUP,
    );
    const rayleighId = engine.findCardInZone("south", "character", op08SilversRayleigh118);
    const blockerId = engine.findCardInZone("north", "character", eb01TonyTonyChopper006);
    const lifeBefore = engine.getView("north").players.north.lifeCount;

    engine.playCard(op12ToNeverDoubtThatIsPower016);
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");

    // Rayleigh is the only legal recipient, so no recipient prompt; he still becomes the reference.
    expect(engine.getState().cards[rayleighId]?.attachedDon).toBe(2);
    expect(Object.values(engine.getState().modifiers)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ targetId: rayleighId, type: "keyword", keyword: "unblockable" }),
      ]),
    );

    engine.declareAttack(rayleighId, engine.leader("north"), "south");
    const view = engine.getView("north");
    expect(view.players.north.lifeCount).toBe(lifeBefore - 1);
    expect(
      view.players.north.characters.find((card) => card?.instanceId === blockerId)?.rested,
    ).toBe(false);
    expect(view.prompts).toHaveLength(0);
  });
});
