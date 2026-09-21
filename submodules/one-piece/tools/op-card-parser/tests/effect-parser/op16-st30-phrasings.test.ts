import { describe, expect, test } from "vite-plus/test";

import { buildCardEffects } from "../../src/effect-parser/index.ts";

describe("OP16 / ST30 / ST31 phrasings found by OPTCGSim replays", () => {
  test("OP16-055 copies the opponent's Leader's current power, not its base power", () => {
    expect(
      buildCardEffects(
        "[DON!! x1] [When Attacking] This Character's base power becomes the same as your opponent's Leader's power during this turn.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "whenAttacking",
          actions: [
            {
              action: "copyPower",
              target: { player: "opponent", zones: ["leader"], count: { amount: 1 } },
              duration: "thisTurn",
            },
          ],
        },
      ],
    });
  });

  test("OP16-104 copies the power of a selected opposing Character", () => {
    expect(
      buildCardEffects(
        "[When Attacking] Select up to 1 of your opponent's Characters. This Character's base power becomes the same as the selected Character's power during this turn.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "whenAttacking",
          actions: [
            {
              action: "copyPower",
              target: {
                player: "opponent",
                zones: ["character"],
                count: { amount: 1, upTo: true },
              },
              duration: "thisTurn",
            },
          ],
        },
      ],
    });
  });

  test("ST30-001 buffs every card with either of two names", () => {
    expect(
      buildCardEffects(
        "[Opponent's Turn] All of your [Portgas.D.Ace] and [Monkey.D.Luffy] cards gain +3000 power.",
      ),
    ).toEqual({
      permanentEffects: [
        {
          conditions: [{ condition: "turn", value: "opponent" }],
          actions: [
            {
              action: "modifyPower",
              target: {
                player: "self",
                zones: ["leader", "character"],
                count: { amount: "all" },
                filters: [
                  {
                    filter: "anyOf",
                    filters: [
                      { filter: "name", value: "Portgas.D.Ace" },
                      { filter: "name", value: "Monkey.D.Luffy" },
                    ],
                  },
                ],
              },
              value: 3000,
              duration: "permanent",
            },
          ],
        },
      ],
    });
  });

  test("ST30-014 gives rested DON!! to each of up to 2 filtered Characters", () => {
    expect(
      buildCardEffects(
        "[Activate: Main] You may rest this Character: Give up to 2 of your Characters with 6000 base power up to 2 rested DON!! cards each.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "activateMain",
          costs: [{ cost: "restThisCard" }],
          actions: [
            {
              action: "giveDon",
              target: {
                player: "self",
                zones: ["character"],
                count: { amount: 2, upTo: true },
                filters: [{ filter: "basePower", comparison: "eq", value: 6000 }],
              },
              count: { amount: 2, upTo: true },
              donState: "rested",
              distribution: "each",
            },
          ],
        },
      ],
    });
  });

  test("OP16-108 adds a card from the trash to the top of Life face-up", () => {
    expect(
      buildCardEffects(
        "[On Play] You may trash 1 card from your hand: Add up to 1 {Blackbeard Pirates} type card with a cost of 6 or less from your trash to the top of your Life cards face-up.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "onPlay",
          costs: [{ cost: "trashFromHand", amount: 1 }],
          actions: [
            {
              action: "addToLife",
              target: {
                player: "self",
                zones: ["trash"],
                count: { amount: 1, upTo: true },
                filters: [
                  { filter: "trait", value: "Blackbeard Pirates", match: "includes" },
                  { filter: "cost", comparison: "lte", value: 6 },
                ],
              },
              position: "top",
              faceUp: true,
            },
          ],
        },
      ],
    });
  });

  test("OP16-032 excludes a named Character from the rest lock", () => {
    expect(
      buildCardEffects(
        "[On Play] Up to 1 of your opponent's Characters other than [Monkey.D.Luffy] cannot be rested until the end of your opponent's next End Phase.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "onPlay",
          actions: [
            {
              action: "cannotBeRested",
              target: {
                player: "opponent",
                zones: ["character"],
                count: { amount: 1, upTo: true },
                filters: [{ filter: "excludeName", value: "Monkey.D.Luffy" }],
              },
              duration: "untilEndOfOpponentNextEndPhase",
            },
          ],
        },
      ],
    });
  });

  test("OP16-115 returns a card with a [Trigger] other than itself from the trash", () => {
    expect(
      buildCardEffects(
        "[Main] If your Leader has the {Blackbeard Pirates} type, add up to 1 card with a [Trigger] other than [Black Vortex] from your trash to your hand.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "main",
          conditions: [
            { condition: "leaderTrait", trait: "Blackbeard Pirates", match: "includes" },
          ],
          actions: [
            {
              action: "returnToHand",
              target: {
                player: "self",
                zones: ["trash"],
                count: { amount: 1, upTo: true },
                filters: [
                  { filter: "hasTrigger", value: true },
                  { filter: "excludeName", value: "Black Vortex" },
                ],
              },
            },
          ],
        },
      ],
    });
  });

  test("EB04-059 compares Character counts and K.O.s two independently bounded targets", () => {
    expect(
      buildCardEffects(
        "[Main] You may turn 1 card from the top of your Life cards face-up: If you have less Characters than your opponent, K.O. up to 1 of your opponent's Characters with a cost of 6 or less and up to 1 of your opponent's Characters with a cost of 5 or less.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "main",
          costs: [{ cost: "turnLifeFaceUp", count: 1 }],
          actions: [
            {
              action: "conditional",
              predicate: {
                condition: "zoneCountComparison",
                zone: "character",
                selfComparison: "lt",
                difference: 1,
              },
              whenTrue: [
                {
                  action: "ko",
                  target: {
                    player: "opponent",
                    zones: ["character"],
                    count: { amount: 1, upTo: true },
                    filters: [{ filter: "cost", comparison: "lte", value: 6 }],
                  },
                },
                {
                  action: "ko",
                  target: {
                    player: "opponent",
                    zones: ["character"],
                    count: { amount: 1, upTo: true },
                    filters: [{ filter: "cost", comparison: "lte", value: 5 }],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
  });

  test("OP16-080 redirects the attack to this Leader or a {Blackbeard Pirates} Character", () => {
    expect(
      buildCardEffects(
        "[Opponent's Turn] All of your Characters gain +1 cost.\n[On Your Opponent's Attack] [Once Per Turn] You may trash 1 card with a [Trigger] from your hand: Change the target of that attack to this Leader or to one of your {Blackbeard Pirates} type Character cards.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "onOpponentAttack",
          costs: [
            { cost: "trashFromHand", amount: 1, filters: [{ filter: "hasTrigger", value: true }] },
          ],
          actions: [
            {
              action: "changeBattleTarget",
              target: {
                player: "self",
                zones: ["leader", "character"],
                count: { amount: 1 },
                filters: [
                  {
                    filter: "anyOf",
                    groups: [
                      [{ filter: "cardCategory", value: "leader" }],
                      [{ filter: "trait", value: "Blackbeard Pirates", match: "includes" }],
                    ],
                  },
                ],
              },
            },
          ],
          optional: true,
          oncePerTurn: true,
        },
      ],
      permanentEffects: [
        {
          conditions: [{ condition: "turn", value: "opponent" }],
          actions: [{ action: "modifyCost", value: 1 }],
        },
      ],
    });
  });

  test("ST31-004 scales the power change by the controller's {Straw Hat Crew} cards on the field", () => {
    expect(
      buildCardEffects(
        "[On Play] For every {Straw Hat Crew} type card on your field, give up to 1 of your opponent's Characters −1000 power during this turn.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "onPlay",
          actions: [
            {
              action: "modifyPower",
              target: {
                player: "opponent",
                zones: ["character"],
                count: { amount: 1, upTo: true },
              },
              value: -1000,
              valuePerCardGroup: {
                size: 1,
                target: {
                  player: "self",
                  zones: ["leader", "character", "stage"],
                  count: { amount: "all" },
                  filters: [{ filter: "trait", value: "Straw Hat Crew", match: "includes" }],
                },
              },
              duration: "thisTurn",
            },
          ],
        },
      ],
    });
  });

  test("OP17-119 splits ', and if it is your opponent's turn, ' into two permanent effects", () => {
    expect(
      buildCardEffects(
        "This Character gains +12 cost, and if it is your opponent's turn, this Character gains +3000 power.",
      ),
    ).toEqual({
      permanentEffects: [
        {
          actions: [
            {
              action: "modifyCost",
              target: { player: "self", zones: ["character"], count: { amount: 1 }, self: true },
              value: 12,
            },
          ],
        },
        {
          conditions: [{ condition: "turn", value: "opponent" }],
          actions: [
            {
              action: "modifyPower",
              target: { player: "self", zones: ["character"], count: { amount: 1 }, self: true },
              value: 3000,
              duration: "permanent",
            },
          ],
        },
      ],
    });
  });

  test("OP16-079 grants [Rush] to the Character that was just played from the trash", () => {
    expect(
      buildCardEffects(
        "When a {Land of Wano} type Character card is played from your trash, that Character gains [Rush] during this turn.",
      ),
    ).toEqual({
      effects: [
        {
          trigger: "whenYouPlayCharacter",
          eventFilter: {
            player: "self",
            fromZone: "trash",
            filters: [{ filter: "trait", value: "Land of Wano", match: "includes" }],
          },
          actions: [
            {
              action: "grantKeyword",
              target: {
                player: "self",
                zones: ["character"],
                count: { amount: 1 },
                triggerEventCard: true,
              },
              keyword: "rush",
              duration: "thisTurn",
            },
          ],
        },
      ],
    });
  });

  test("OP16-034 counts distinct card names among its controller's Characters", () => {
    expect(
      buildCardEffects(
        "[DON!! x1] [Your Turn] This Character gains +1000 power for each of your Characters with a different card name.",
      ),
    ).toMatchObject({
      permanentEffects: [
        {
          actions: [
            {
              action: "modifyPower",
              value: 1000,
              valuePerCardGroup: {
                size: 1,
                target: { player: "self", zones: ["character"], count: { amount: "all" } },
                distinctNames: true,
              },
            },
          ],
        },
      ],
    });
  });

  test("OP16-038 requires five differently named typed Characters, then readies the whole field", () => {
    expect(
      buildCardEffects(
        "[Main] You may rest 6 of your DON!! cards: If you have 5 {Impel Down} type Characters with different card names, set your Leader and all of your Characters as active.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "main",
          costs: [{ cost: "restDon", amount: 6 }],
          actions: [
            {
              action: "setActive",
              target: { player: "self", zones: ["leader", "character"], count: { amount: "all" } },
              condition: {
                condition: "zoneCount",
                zone: "character",
                comparison: "eq",
                value: 5,
                filters: [{ filter: "trait", value: "Impel Down", match: "includes" }],
                distinctNames: true,
              },
            },
          ],
        },
      ],
    });
  });
});
