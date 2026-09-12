import type { CharacterCard } from "@tcg/op-types";
import { st34CharlotteSmoothie090I18n } from "./090-charlotte-smoothie.i18n.ts";

export const st34CharlotteSmoothie090: CharacterCard = {
  id: "P-090",
  canonicalId: "P-090",
  slug: "charlotte-smoothie/p-090",
  name: "Charlotte Smoothie",
  printings: [
    {
      id: "P-090",
      artId: "P-090_r1",
      setCode: "ST34",
      collectorNumber: "090",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-090_r1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "P",
  setId: "ST34",
  cost: 7,
  power: 7000,
  counter: 1000,
  traits: ["Big Mom Pirates"],
  attribute: "special",
  effect:
    "[Opponent's Turn] [On K.O.] DON!! −1: Play up to 1 {Big Mom Pirates} type Character card with a cost equal to or less than the number of DON!! cards on your opponent's field other than [Charlotte Smoothie] from your hand.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        conditions: [
          {
            condition: "turn",
            value: "opponent",
          },
        ],
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand",
            },
            count: {
              amount: 1,
              upTo: true,
            },
            filters: [
              {
                filter: "excludeName",
                value: "Charlotte Smoothie",
              },
              {
                filter: "dynamicCost",
                comparison: "lte",
                source: "opponentDonCount",
              },
              {
                filter: "trait",
                value: "Big Mom Pirates",
                match: "includes",
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: st34CharlotteSmoothie090I18n,
};
