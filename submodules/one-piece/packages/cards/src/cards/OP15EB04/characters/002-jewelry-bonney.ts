import type { CharacterCard } from "@tcg/op-types";
import { op15eb04JewelryBonney002I18n } from "./002-jewelry-bonney.i18n.ts";

export const op15eb04JewelryBonney002: CharacterCard = {
  id: "EB04-002",
  canonicalId: "EB04-002",
  slug: "jewelry-bonney/eb04-002",
  name: "Jewelry Bonney",
  printings: [
    {
      id: "EB04-002",
      artId: "EB04-002",
      setCode: "OP15EB04",
      collectorNumber: "002",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-002.png",
    },
    {
      id: "EB04-002_p1",
      artId: "EB04-002_p1",
      setCode: "OP15EB04",
      collectorNumber: "002",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-002_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Egghead", "Bonney Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-002_p1.png",
      imageId: "EB04-002_p1",
    },
  ],
  effect:
    "[On Play] Look at 4 cards from the top of your deck; reveal up to 1 {Egghead} or {Straw Hat Crew} type card other than [Jewelry Bonney] and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 4,
            source: {
              player: "self",
              zone: "deck",
            },
            revealCount: {
              amount: 1,
              upTo: true,
            },
            revealFilters: [
              {
                filter: "excludeName",
                value: "Jewelry Bonney",
              },
              {
                filter: "anyOf",
                filters: [
                  {
                    filter: "trait",
                    value: "Egghead",
                    match: "includes",
                  },
                  {
                    filter: "trait",
                    value: "Straw Hat Crew",
                    match: "includes",
                  },
                ],
              },
            ],
            revealDestination: "hand",
            remainderPosition: "bottom",
          },
        ],
      },
    ],
  },
  i18n: op15eb04JewelryBonney002I18n,
};
