import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Pearl011I18n } from "./011-pearl.i18n.ts";

export const op15eb04Pearl011: CharacterCard = {
  id: "OP15-011",
  canonicalId: "OP15-011",
  slug: "pearl/op15-011",
  name: "Pearl",
  printings: [
    {
      id: "OP15-011",
      artId: "OP15-011",
      setCode: "OP15EB04",
      collectorNumber: "011",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-011.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 4,
  power: 4000,
  counter: 1000,
  traits: ["East Blue", "Krieg Pirates"],
  attribute: "strike",
  effect:
    "[Opponent's Turn] If your Leader has the {East Blue} type, this Character gains [Blocker] and +2000 power.\n[On K.O.] If your Leader has the {East Blue} type, K.O. up to 1 of your opponent's Characters with 6000 base power or less.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "East Blue",
            match: "includes",
          },
        ],
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
                  filter: "basePower",
                  comparison: "lte",
                  value: 6000,
                },
              ],
            },
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "turn",
            value: "opponent",
          },
          {
            condition: "leaderTrait",
            trait: "East Blue",
            match: "includes",
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
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: 2000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Pearl011I18n,
};
