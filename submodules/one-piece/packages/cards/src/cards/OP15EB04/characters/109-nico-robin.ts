import type { CharacterCard } from "@tcg/op-types";
import { op15eb04NicoRobin109I18n } from "./109-nico-robin.i18n.ts";

export const op15eb04NicoRobin109: CharacterCard = {
  id: "OP15-109",
  canonicalId: "OP15-109",
  slug: "nico-robin/op15-109",
  name: "Nico Robin",
  printings: [
    {
      id: "OP15-109",
      artId: "OP15-109",
      setCode: "OP15EB04",
      collectorNumber: "109",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-109.png",
    },
    {
      id: "OP15-109_p1",
      artId: "OP15-109_p1",
      setCode: "OP15EB04",
      collectorNumber: "109",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-109_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 7,
  power: 7000,
  counter: 1000,
  traits: ["Sky Island", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-109_p1.png",
      imageId: "OP15-109_p1",
    },
  ],
  effect:
    "[On Play] You may add 1 card from the top of your Life cards to your hand: If your Leader has the {Straw Hat Crew} type, add up to 1 card from the top of your deck to the top of your Life cards. Then, play up to 1 {Sky Island} type Character card with a cost of 5 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "addLifeToHand",
            amount: 1,
            position: "top",
          },
        ],
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: ["deck"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            position: "top",
            condition: {
              condition: "leaderTrait",
              trait: "Straw Hat Crew",
              match: "includes",
            },
          },
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
                filter: "cost",
                comparison: "lte",
                value: 5,
              },
              {
                filter: "trait",
                value: "Sky Island",
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
  i18n: op15eb04NicoRobin109I18n,
};
