import type { CharacterCard } from "@tcg/op-types";
import { op16Vista011I18n } from "./011-vista.i18n.ts";

export const op16Vista011: CharacterCard = {
  id: "OP16-011",
  canonicalId: "OP16-011",
  slug: "vista/op16-011",
  name: "Vista",
  printings: [
    {
      id: "OP16-011",
      artId: "OP16-011",
      setCode: "OP16",
      collectorNumber: "011",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-011.png",
    },
    {
      id: "OP16-011_p1",
      artId: "OP16-011_p1",
      setCode: "OP16",
      collectorNumber: "011",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-011_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP16",
  cost: 6,
  power: 8000,
  traits: ["Whitebeard Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-011_p1.png",
      imageId: "OP16-011_p1",
    },
  ],
  effect:
    "[On Play] You may reveal 1 Character card with 8000 power from your hand: Draw 1 card.\n[DON!! x1] [When Attacking] K.O. up to 2 of your opponent's Characters with 2000 base power or less.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
        optional: true,
      },
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 2,
                upTo: true,
              },
              filters: [
                {
                  filter: "basePower",
                  comparison: "lte",
                  value: 2000,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: op16Vista011I18n,
};
