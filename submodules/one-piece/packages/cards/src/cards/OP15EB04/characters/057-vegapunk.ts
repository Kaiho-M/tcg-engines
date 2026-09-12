import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Vegapunk057I18n } from "./057-vegapunk.i18n.ts";

export const op15eb04Vegapunk057: CharacterCard = {
  id: "EB04-057",
  canonicalId: "EB04-057",
  slug: "vegapunk/eb04-057",
  name: "Vegapunk",
  printings: [
    {
      id: "EB04-057",
      artId: "EB04-057",
      setCode: "OP15EB04",
      collectorNumber: "057",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-057.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 2,
  counter: 1000,
  traits: ["Ohara", "Scientist"],
  attribute: "wisdom",
  effect:
    "If you have 2 or less Life cards, all of your yellow {Scientist} type Characters cannot be removed from the field by your opponent's effects.\n[DON!! x1] This Character gains [Blocker].",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            keyword: "blocker",
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Vegapunk057I18n,
};
