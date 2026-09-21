import { describe, expect, test } from "vite-plus/test";

import { buildCardEffects } from "../../src/effect-parser/index.ts";

describe("OP15 East Blue: moving the opponent's DON!! onto their own cards", () => {
  test("OP15-017 pays an opponent's rested DON!! onto their Character, then gives one to their Leader or Character", () => {
    expect(
      buildCardEffects(
        "[On Play] You may give 1 of your opponent's rested DON!! cards to 1 of your opponent's Characters: Give up to 1 rested DON!! card to its owner's Leader or 1 of their Characters.",
      ),
    ).toEqual({
      effects: [
        {
          trigger: "onPlay",
          costs: [
            {
              cost: "giveDon",
              amount: 1,
              player: "opponent",
              donState: "rested",
              filters: [{ filter: "cardCategory", value: "character" }],
            },
          ],
          actions: [
            {
              action: "giveDon",
              target: { player: "opponent", zones: ["leader", "character"], count: { amount: 1 } },
              count: { amount: 1, upTo: true },
              donState: "rested",
            },
          ],
          optional: true,
        },
      ],
    });
  });

  test("OP15-028 gives a DON!! from the opponent's cost area (any state) to their Character", () => {
    expect(
      buildCardEffects(
        "[On Play] If your Leader has the {East Blue} type, give up to 1 DON!! card from your opponent's cost area to 1 of your opponent's Characters.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "onPlay",
          conditions: [{ condition: "leaderTrait", trait: "East Blue" }],
          actions: [
            {
              action: "giveDon",
              target: { player: "opponent", zones: ["character"], count: { amount: 1 } },
              count: { amount: 1, upTo: true },
            },
          ],
        },
      ],
    });
    expect(
      buildCardEffects(
        "[On Play] If your Leader has the {East Blue} type, give up to 1 DON!! card from your opponent's cost area to 1 of your opponent's Characters.",
      )?.effects?.[0]?.actions[0],
    ).not.toHaveProperty("donState");
  });

  test("OP15-018 / OP15-001 filter targets by the DON!! given to them", () => {
    expect(
      buildCardEffects(
        "[On Play] K.O. up to 1 of your opponent's Characters with 3000 power or less with a DON!! card given.",
      ),
    ).toMatchObject({
      effects: [
        {
          actions: [
            {
              action: "ko",
              target: {
                filters: [
                  { filter: "power", comparison: "lte", value: 3000 },
                  { filter: "attachedDon", comparison: "gte", value: 1 },
                ],
              },
            },
          ],
        },
      ],
    });
    expect(
      buildCardEffects(
        "[Activate: Main] Rest up to 1 of your opponent's Characters that has 2 or more DON!! cards given.",
      ),
    ).toMatchObject({
      effects: [
        {
          actions: [
            {
              action: "rest",
              target: { filters: [{ filter: "attachedDon", comparison: "gte", value: 2 }] },
            },
          ],
        },
      ],
    });
  });

  test("OP15-015 gives power to a target named after the duration; OP15-005 checks the opponent's given DON!!", () => {
    expect(
      buildCardEffects(
        "[On Play] Give up to 1 of your opponent's rested DON!! cards to 1 of your opponent's Characters. Then, give −1000 power during this turn to up to 1 of your opponent's Characters with a DON!! card given.",
      ),
    ).toMatchObject({
      effects: [
        {
          actions: [
            { action: "giveDon" },
            {
              action: "modifyPower",
              value: -1000,
              duration: "thisTurn",
              target: { player: "opponent", count: { amount: 1, upTo: true } },
            },
          ],
        },
      ],
    });
    expect(
      buildCardEffects(
        "[When Attacking] If your opponent has any DON!! cards given, this Character gains +2000 power during this turn.",
      ),
    ).toMatchObject({
      effects: [{ conditions: [{ condition: "donGiven", player: "opponent" }] }],
    });
  });
});
