import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01Fourtricks025 } from "@tcg/op-cards";
import { op17CharlotteLinlin112 } from "../../../../cards/src/cards/characters/op17-112-charlotte-linlin.ts";
import { op17CharlottePerospero110 } from "../../../../cards/src/cards/characters/op17-110-charlotte-perospero.ts";
import { OnePieceTestEngine } from "../../../src/index.ts";
import { matchesTargetFilter } from "../../../src/effects/targeting.ts";

describe("OP17-112 Charlotte Linlin", () => {
  test("sets 4000-base [Trigger] Characters to 8000 base power on your turn, without stacking", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [
          op17CharlotteLinlin112,
          op17CharlotteLinlin112,
          op17CharlottePerospero110,
          eb01Doma005,
        ],
        activeDon: 1,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const perosperoId = engine.findCardInZone("south", "character", op17CharlottePerospero110);
    const domaId = engine.findCardInZone("south", "character", eb01Doma005);
    const powerOf = (instanceId: string) =>
      engine
        .getView("south")
        .players.south.characters.find((card) => card?.instanceId === instanceId)?.power;

    expect(powerOf(perosperoId)).toBe(8000);
    expect(powerOf(domaId)).toBe(eb01Doma005.power);

    engine.attachDon(perosperoId, 1, "south");
    expect(powerOf(perosperoId)).toBe(9000);

    engine.endTurn("south");
    expect(powerOf(perosperoId)).toBe(4000);
  });

  test("base-power filters of other cards see the 8000 while its own 4000 check stays satisfied", () => {
    const engine = OnePieceTestEngine.create(
      { character: [op17CharlotteLinlin112, op17CharlottePerospero110] },
      { character: [eb01Doma005] },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const perosperoId = engine.findCardInZone("south", "character", op17CharlottePerospero110);
    const opposingId = engine.findCardInZone("north", "character", eb01Doma005);
    const basePowerAtMost = (value: number) =>
      matchesTargetFilter(engine.getState(), opposingId, perosperoId, {
        filter: "basePower",
        comparison: "lte",
        value,
      }).matches;

    // e.g. an opposing [Trigger] "K.O. up to 1 Character with 5000 base power or less".
    expect(basePowerAtMost(5000)).toBe(false);
    expect(basePowerAtMost(8000)).toBe(true);

    engine.endTurn("south");
    expect(basePowerAtMost(5000)).toBe(true);
  });

  test("[On Play] draws 1, then may add the top of the deck to Life", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: [op17CharlotteLinlin112],
        deck: [eb01Fourtricks025, eb01Doma005, eb01Doma005],
        activeDon: op17CharlotteLinlin112.cost,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const drawnId = engine.findCardInZone("south", "deck", eb01Fourtricks025);

    engine.playCard(op17CharlotteLinlin112, "south");
    expect(engine.getView("south").players.south.hand.map((card) => card.instanceId)).toContain(
      drawnId,
    );

    const lifeBefore = engine.getView("south").players.south.lifeCount;
    const choice = engine.pendingDecision("effectActionChoice", "south").steps[0];
    if (choice?.kind !== "chooseOption") throw new Error("Expected Linlin's choice.");
    expect(choice.options).toHaveLength(2);
    engine.resolveDecision("effectActionChoice", { optionId: "0" }, "south");
    engine.resolveDecision("effectAddToLifeFromDeck", { optionId: "1" }, "south");

    const view = engine.getView("south");
    expect(view.players.south.lifeCount).toBe(lifeBefore + 1);
    expect(view.players.south.deckCount).toBe(1);
    expect(view.prompts).toHaveLength(0);
  });
});
