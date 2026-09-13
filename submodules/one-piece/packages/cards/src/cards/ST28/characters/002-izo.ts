import type { CharacterCard } from "@tcg/op-types";
import { st28Izo002I18n } from "./002-izo.i18n.ts";

export const st28Izo002: CharacterCard = {
  id: "ST28-002",
  canonicalId: "ST28-002",
  slug: "izo/st28-002",
  name: "Izo",
  printings: [
    {
      id: "ST28-002",
      artId: "ST28-002",
      setCode: "ST28",
      collectorNumber: "002",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST28-002.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST28",
  cost: 2,
  power: 1000,
  counter: 1000,
  traits: ["Land of Wano", "Former Whitebeard Pirates"],
  attribute: "ranged",
  effect:
    "[DON!! x2] This Character gains [Blocker].\n[On Play] Your {Land of Wano} type Leader gains [Banish] during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
              filters: [
                {
                  filter: "trait",
                  value: "Land of Wano",
                  match: "includes",
                },
              ],
            },
            keyword: "banish",
            duration: "thisTurn",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 2,
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
  i18n: st28Izo002I18n,
};
