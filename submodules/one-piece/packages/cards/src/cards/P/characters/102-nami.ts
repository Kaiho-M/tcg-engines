import type { CharacterCard } from "@tcg/op-types";
import { pNami102I18n } from "./102-nami.i18n.ts";

export const pNami102: CharacterCard = {
  id: "P-102",
  canonicalId: "P-102",
  slug: "nami/p-102",
  name: "Nami",
  printings: [
    {
      id: "P-102",
      artId: "P-102",
      setCode: "P",
      collectorNumber: "102",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-102.png",
    },
    {
      id: "P-102_p1",
      artId: "P-102_p1",
      setCode: "P",
      collectorNumber: "102",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-102_p1.png",
    },
    {
      id: "P-102_p2",
      artId: "P-102_p2",
      setCode: "P",
      collectorNumber: "102",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-102_p2.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "P",
  setId: "P",
  cost: 4,
  power: 4000,
  counter: 2000,
  traits: ["Egghead", "Straw Hat Crew"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-102_p1.png",
      imageId: "P-102_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-102_p2.png",
      imageId: "P-102_p2",
    },
  ],
  effect:
    "[On Play] If your Leader has the {Straw Hat Crew} type, set up to 2 of your DON!! cards as active.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Straw Hat Crew",
            match: "includes",
          },
        ],
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["costArea"],
              count: {
                amount: 2,
                upTo: true,
              },
            },
          },
        ],
      },
    ],
  },
  i18n: pNami102I18n,
};
