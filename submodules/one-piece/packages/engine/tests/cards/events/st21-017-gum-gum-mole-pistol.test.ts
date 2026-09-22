import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st21GumGumMolePistol017 } from "../../../../cards/src/cards/events/st21-017-gum-gum-mole-pistol.ts";
import { st36Bartolomeo004 } from "../../../../cards/src/cards/characters/st36-004-bartolomeo.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST21-017 Gum-Gum Mole Pistol", () => {
  test("[Main] gives -5000 power, then with a 6000-power Character K.O.s a 2000-power-or-less Character", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: eb01MountainGod018, playedOnTurn: 0 }],
        hand: [st21GumGumMolePistol017],
        activeDon: 4,
      },
      {
        character: [
          { card: eb01MountainGod018, playedOnTurn: 0 },
          { card: st36Bartolomeo004, playedOnTurn: 0 },
        ],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);
    const bartoId = engine.findCardInZone("north", "character", st36Bartolomeo004);

    engine.playCard(st21GumGumMolePistol017, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [godId] }, "south");
    const ko = engine.pendingDecision("effectTargetSelection", "south").steps[0];
    if (ko?.kind !== "selectEntity") throw new Error("Expected the K.O. target.");
    // Mountain God sits at 2000 after -5000 and Bartolomeo prints 2000.
    expect(ko.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [bartoId, godId].sort(),
    );
    engine.resolveDecision("effectTargetSelection", { selectedIds: [godId] }, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.map((card) => card?.instanceId)).not.toContain(godId);
    expect(view.players.north.trash.map((card) => card.instanceId)).toContain(godId);
    expect(view.players.north.characters.map((card) => card?.instanceId)).toContain(bartoId);
    expect(view.prompts).toHaveLength(0);
  });

  test("[Main] without a 6000-power Character only the -5000 applies", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: eb01Doma005, playedOnTurn: 0 }],
        hand: [st21GumGumMolePistol017],
        activeDon: 4,
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.playCard(st21GumGumMolePistol017, "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [godId] }, "south");

    const view = engine.getView("south");
    expect(view.players.north.characters.find((card) => card?.instanceId === godId)?.power).toBe(
      2000,
    );
    expect(view.players.north.characters.map((card) => card?.instanceId)).toContain(godId);
    expect(view.prompts).toHaveLength(0);
  });
});
