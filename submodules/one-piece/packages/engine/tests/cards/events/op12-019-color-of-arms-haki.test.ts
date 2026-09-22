import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { op12ColorOfArmsHaki019 } from "../../../../cards/src/cards/events/op12-019-color-of-arms-haki.ts";
import { op08SilversRayleigh118 } from "../../../../cards/src/cards/characters/op08-118-silvers-rayleigh.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP12-019 Color of Arms Haki", () => {
  test("[Main] the activation DON!! may only be given to a [Silvers Rayleigh]", () => {
    const engine = OnePieceTestEngine.create({
      hand: [op12ColorOfArmsHaki019],
      character: [eb01Doma005, op08SilversRayleigh118],
      activeDon: 2,
    });
    const domaId = engine.findCardInZone("south", "character", eb01Doma005);
    const rayleighId = engine.findCardInZone("south", "character", op08SilversRayleigh118);

    engine.playCard(op12ColorOfArmsHaki019);
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");

    // Rayleigh is the only legal recipient, so the DON!! goes to him without a recipient prompt.
    const target = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    expect(target).toMatchObject({ kind: "selectEntity", min: 0, max: 1 });
    const view = engine.getView("south");
    const attachedDon = (instanceId: string) =>
      view.players.south.characters.find((card) => card?.instanceId === instanceId)?.attachedDon;
    expect(attachedDon(rayleighId)).toBe(1);
    expect(attachedDon(domaId)).toBe(0);
    expect(view.players.south.activeDon).toBe(1);

    engine.resolveDecision("effectTargetSelection", { selectedIds: [domaId] }, "south");
    expect(
      engine.getView("south").players.south.characters.find((card) => card?.instanceId === domaId)
        ?.power,
    ).toBe(eb01Doma005.power! + 1000);
  });

  test("[Main] cannot be paid without a [Silvers Rayleigh] to receive the DON!!", () => {
    const engine = OnePieceTestEngine.create({
      hand: [op12ColorOfArmsHaki019],
      character: [eb01Doma005],
      activeDon: 2,
    });
    const domaId = engine.findCardInZone("south", "character", eb01Doma005);

    engine.playCard(op12ColorOfArmsHaki019);

    // The unpayable optional cost skips the block: no confirmation, no DON!! moved, no power gained.
    const view = engine.getView("south");
    expect(view.prompts).toHaveLength(0);
    const doma = view.players.south.characters.find((card) => card?.instanceId === domaId);
    expect(doma).toMatchObject({ attachedDon: 0, power: eb01Doma005.power });
    expect(view.players.south.activeDon).toBe(2);
  });

  test("[Main] may be declined, keeping the DON!! and leaving power alone", () => {
    const engine = OnePieceTestEngine.create({
      hand: [op12ColorOfArmsHaki019],
      character: [op08SilversRayleigh118],
      activeDon: 2,
    });
    const rayleighId = engine.findCardInZone("south", "character", op08SilversRayleigh118);

    engine.playCard(op12ColorOfArmsHaki019);
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(2);
    expect(engine.getState().cards[rayleighId]?.attachedDon).toBe(0);
    expect(
      view.players.south.characters.find((card) => card?.instanceId === rayleighId)?.power,
    ).toBe(op08SilversRayleigh118.power);
    expect(view.players.south.leader?.power).toBe(5000);
    expect(view.prompts).toHaveLength(0);
  });
});
