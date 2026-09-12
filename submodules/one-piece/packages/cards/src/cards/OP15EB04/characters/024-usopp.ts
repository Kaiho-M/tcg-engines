import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Usopp024I18n } from "./024-usopp.i18n.ts";

export const op15eb04Usopp024: CharacterCard = {
  id: "OP15-024",
  canonicalId: "OP15-024",
  slug: "usopp/op15-024",
  name: "Usopp",
  printings: [
    {
      id: "OP15-024",
      artId: "OP15-024",
      setCode: "OP15EB04",
      collectorNumber: "024",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-024.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "ranged",
  effect:
    "[Opponent's Turn] This Character cannot be rested by your opponent's Leader and Character effects and gains [Blocker].\n[On K.O.] Rest up to 1 of your opponent's Leader or Character cards with a cost of 7 or less.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: ["leader", "character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 7,
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
  i18n: op15eb04Usopp024I18n,
};
