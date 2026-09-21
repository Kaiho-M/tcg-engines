import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Mohji018I18n } from "./018-mohji.i18n.ts";

export const op15eb04Mohji018: CharacterCard = {
  id: "OP15-018",
  canonicalId: "OP15-018",
  slug: "mohji/op15-018",
  name: "Mohji",
  printings: [
    {
      id: "OP15-018",
      artId: "OP15-018",
      setCode: "OP15EB04",
      collectorNumber: "018",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-018.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 2,
  power: 3000,
  counter: 1000,
  traits: ["East Blue", "Buggy Pirates"],
  attribute: "wisdom",
  effect:
    "[When Attacking] K.O. up to 1 of your opponent's Characters with 3000 power or less with a DON!! card given.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "power",
                  comparison: "lte",
                  value: 3000,
                },
                {
                  filter: "attachedDon",
                  comparison: "gte",
                  value: 1,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: op15eb04Mohji018I18n,
};
