import { describe, expect, test } from "vite-plus/test";
import { op12ColorOfObservationHaki017 } from "../../../../cards/src/cards/events/op12-017-color-of-observation-haki.ts";
import { op12ColorOfArmsHaki019 } from "../../../../cards/src/cards/events/op12-019-color-of-arms-haki.ts";
import { op17WhiteyBay014 } from "../../../../cards/src/cards/characters/op17-014-whitey-bay.ts";
import { op17WangZhi041 } from "../../../../cards/src/cards/characters/op17-041-wang-zhi.ts";
import { op17RocksPirates056 } from "../../../../cards/src/cards/events/op17-056-rocks-pirates.ts";
import { op08SilversRayleigh118 } from "../../../../cards/src/cards/characters/op08-118-silvers-rayleigh.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP12-017 Color of Observation Haki", () => {
  test("[Main] reveals either a red Event or a Character with a cost of 3 or more", () => {
    const engine = OnePieceTestEngine.create({
      hand: [op12ColorOfObservationHaki017],
      character: [op08SilversRayleigh118],
      // red Event, cost-4 blue Character, cost-1 red Character, blue Event
      deck: [op12ColorOfArmsHaki019, op17WangZhi041, op17WhiteyBay014, op17RocksPirates056],
      activeDon: 2,
    });
    const redEventId = engine.findCardInZone("south", "deck", op12ColorOfArmsHaki019);
    const bigCharacterId = engine.findCardInZone("south", "deck", op17WangZhi041);

    engine.playCard(op12ColorOfObservationHaki017);
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");

    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected the Haki search.");
    expect(
      search.candidates
        .filter((candidate) => candidate.legal)
        .map((candidate) => candidate.ref.id)
        .sort(),
    ).toEqual([redEventId, bigCharacterId].sort());
  });

  test("[Main] may be declined, keeping the DON!! on the field and the Event in hand", () => {
    const engine = OnePieceTestEngine.create({
      hand: [op12ColorOfObservationHaki017],
      character: [op08SilversRayleigh118],
      deck: [op12ColorOfArmsHaki019, op17WangZhi041, op17WhiteyBay014, op17RocksPirates056],
      activeDon: 2,
    });
    const rayleighId = engine.findCardInZone("south", "character", op08SilversRayleigh118);

    engine.playCard(op12ColorOfObservationHaki017);
    engine.resolveDecision("effectOptional", { optionId: "no" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.activeDon).toBe(2);
    expect(
      view.players.south.characters.find((card) => card?.instanceId === rayleighId)?.attachedDon,
    ).toBe(0);
    expect(view.players.south.hand).toHaveLength(0);
    expect(view.players.south.deckCount).toBe(4);
    expect(view.prompts).toHaveLength(0);
  });
});
