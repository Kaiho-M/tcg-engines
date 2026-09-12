import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Ryuma036I18n } from "./036-ryuma.i18n.ts";

export const op15eb04Ryuma036: CharacterCard = {
  id: "OP15-036",
  canonicalId: "OP15-036",
  slug: "ryuma/op15-036",
  name: "Ryuma",
  printings: [
    {
      id: "OP15-036",
      artId: "OP15-036",
      setCode: "OP15EB04",
      collectorNumber: "036",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-036.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 6,
  power: 8000,
  traits: ["Land of Wano", "Thriller Bark Pirates"],
  attribute: "slash",
  effect:
    "[On Play]/[When Attacking] K.O. up to 1 of your opponent's rested Characters with a cost of 4 or less.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
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
                  filter: "state",
                  value: "rested",
                },
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 4,
                },
              ],
            },
          },
        ],
      },
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
                  filter: "state",
                  value: "rested",
                },
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 4,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: op15eb04Ryuma036I18n,
};
