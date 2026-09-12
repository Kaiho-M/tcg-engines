import type { CharacterCard } from "@tcg/op-types";
import { op17Usopp080I18n } from "./080-usopp.i18n.ts";

export const op17Usopp080: CharacterCard = {
  id: "OP17-080",
  canonicalId: "OP17-080",
  slug: "usopp/op17-080",
  name: "Usopp",
  printings: [
    {
      id: "OP17-080",
      artId: "OP17-080",
      setCode: "OP17",
      collectorNumber: "080",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-080.png",
    },
    {
      id: "OP17-080_p1",
      artId: "OP17-080_p1",
      setCode: "OP17",
      collectorNumber: "080",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-080_p1.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP17",
  cost: 2,
  power: 2000,
  counter: 1000,
  traits: ["Elbaph", "Straw Hat Crew"],
  attribute: "ranged",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-080_p1.png",
      imageId: "OP17-080_p1",
    },
  ],
  effect:
    "If there is a Character with a cost of 12 or more, this Character gains +3000 power.\n[On Play] Look at 3 cards from the top of your deck; reveal up to 1 {Elbaph} type card and add it to your hand. Then, trash the rest.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 3,
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
                filter: "trait",
                value: "Elbaph",
                match: "includes",
              },
            ],
            revealDestination: "hand",
            remainderPosition: "trash",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "existsOnField",
            zone: "character",
            filters: [
              {
                filter: "cost",
                comparison: "gte",
                value: 12,
              },
            ],
          },
        ],
        actions: [
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
            value: 3000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op17Usopp080I18n,
};
