import { describe, expect, test } from "vite-plus/test";

import { buildCardEffects } from "../../src/effect-parser/index.ts";

describe("give DON!! activation costs", () => {
  test("any Leader or Character may receive the DON!! when no recipient is named", () => {
    expect(
      buildCardEffects(
        "[Activate: Main] You may give 1 of your active DON!! cards to 1 of your Leader or Character cards and trash this Character: Draw 1 card.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "activateMain",
          costs: [{ cost: "giveDon", amount: 1 }, { cost: "trashThisCard" }],
          actions: [{ action: "draw", amount: 1 }],
        },
      ],
    });
    expect(
      buildCardEffects(
        "[Activate: Main] You may give 1 of your active DON!! cards to 1 of your Leader or Character cards: Draw 1 card.",
      )?.effects?.[0]?.costs?.[0],
    ).not.toHaveProperty("filters");
  });

  test("OP12-019 restricts the recipient to a named Character", () => {
    expect(
      buildCardEffects(
        "[Main] You may give 1 active DON!! card to 1 of your [Silvers Rayleigh]: Up to 1 of your Leader or Character cards gains +1000 power during this turn.",
      ),
    ).toMatchObject({
      effects: [
        {
          trigger: "main",
          costs: [
            {
              cost: "giveDon",
              amount: 1,
              filters: [{ filter: "name", value: "Silvers Rayleigh" }],
            },
          ],
          actions: [{ action: "modifyPower", value: 1000, duration: "thisTurn" }],
        },
      ],
    });
  });
});
