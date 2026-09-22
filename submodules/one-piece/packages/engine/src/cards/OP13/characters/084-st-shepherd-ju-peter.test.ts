import { describe, expect, test } from "vite-plus/test";
import type { EventCard } from "@tcg/op-types";
import { eb01Doma005, eb01Fourtricks025 } from "@tcg/op-cards";
import { op13StJaygarciaSaturn083 } from "../../../../../cards/src/cards/characters/op13-083-st-jaygarcia-saturn.ts";
import { op13StShepherdJuPeter084 } from "../../../../../cards/src/cards/characters/op13-084-st-shepherd-ju-peter.ts";

import { registerCards } from "../../../../../cards/src/runtime-catalog.ts";
import { OnePieceTestEngine } from "../../../index.ts";

const koByEffect: EventCard = {
  id: "TEST-OP13-084-KO",
  canonicalId: "TEST-OP13-084-KO",
  slug: "test-op13-084-ko",
  name: "K.O. by Effect",
  printings: [],
  cardType: "event",
  color: ["black"],
  rarity: "C",
  setId: "TEST",
  cost: 0,
  traits: [],
  effect: "[Main] K.O. up to 1 of your opponent's Characters.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: { amount: 1, upTo: true },
            },
          },
        ],
      },
    ],
  },
  i18n: { en: { name: "K.O. by Effect" } },
};

registerCards([koByEffect]);

describe("OP13-084 St. Shepherd Ju Peter", () => {
  test("[Your Turn] with 10 or more trash cards, Five Elders Characters' base power becomes 7000", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [op13StShepherdJuPeter084, op13StJaygarciaSaturn083, eb01Doma005],
        trash: Array.from({ length: 10 }, () => eb01Fourtricks025),
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const juPeterId = engine.findCardInZone("south", "character", op13StShepherdJuPeter084);
    const saturnId = engine.findCardInZone("south", "character", op13StJaygarciaSaturn083);
    const domaId = engine.findCardInZone("south", "character", eb01Doma005);

    const south = engine.getView("south").players.south;
    expect(south.characters.find((card) => card?.instanceId === juPeterId)?.power).toBe(7000);
    expect(south.characters.find((card) => card?.instanceId === saturnId)?.power).toBe(7000);
    expect(south.characters.find((card) => card?.instanceId === domaId)?.power).toBe(
      eb01Doma005.power,
    );

    // Only during your turn.
    engine.endTurn("south");
    const later = engine.getView("south").players.south;
    expect(later.characters.find((card) => card?.instanceId === juPeterId)?.power).toBe(
      op13StShepherdJuPeter084.power,
    );
    expect(later.characters.find((card) => card?.instanceId === saturnId)?.power).toBe(
      op13StJaygarciaSaturn083.power,
    );
  });

  test("with fewer than 10 trash cards the base power is unchanged", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [op13StShepherdJuPeter084, op13StJaygarciaSaturn083],
        trash: Array.from({ length: 9 }, () => eb01Fourtricks025),
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const saturnId = engine.findCardInZone("south", "character", op13StJaygarciaSaturn083);
    expect(
      engine.getView("south").players.south.characters.find((card) => card?.instanceId === saturnId)
        ?.power,
    ).toBe(op13StJaygarciaSaturn083.power);
  });

  test("at seven trash cards survives an opponent effect while another Character is removable", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [op13StShepherdJuPeter084, eb01Doma005],
        trash: Array.from({ length: 7 }, () => eb01Fourtricks025),
      },
      { hand: [koByEffect] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const juPeterId = engine.findCardInZone("south", "character", op13StShepherdJuPeter084);
    const unprotectedId = engine.findCardInZone("south", "character", eb01Doma005);

    engine.playCard(koByEffect, "north");
    const target = engine.pendingDecision("effectTargetSelection", "north").steps[0];
    if (target?.kind !== "selectEntity") throw new Error("Expected the opposing removal choice.");
    const candidates = target.candidates.map((candidate) => candidate.ref.id);
    expect(candidates).not.toContain(juPeterId);
    expect(candidates).toContain(unprotectedId);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [unprotectedId] }, "north");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(juPeterId);
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(unprotectedId);
    expect(view.prompts).toHaveLength(0);
  });
});
