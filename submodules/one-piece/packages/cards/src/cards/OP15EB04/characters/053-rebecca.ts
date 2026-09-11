import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Rebecca053I18n } from "./053-rebecca.i18n.ts";

export const op15eb04Rebecca053: CharacterCard = {
  id: "OP15-053",
  canonicalId: "OP15-053",
  slug: "rebecca/op15-053",
  name: "Rebecca",
  printings: [
    {
      id: "OP15-053",
      artId: "OP15-053",
      setCode: "OP15EB04",
      collectorNumber: "053",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-053_6BIr3DG.jpg",
    },
    {
      id: "OP15-053_p1",
      artId: "OP15-053_p1",
      setCode: "OP15EB04",
      collectorNumber: "053",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-053_p1_psXmUbM.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 1,
  power: 0,
  counter: 1000,
  traits: ["Dressrosa"],
  attribute: "wisdom",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-053_p1_psXmUbM.jpg",
      imageId: "OP15-053_p1",
    },
  ],
  effect:
    "[DON!! x1] This Character gains [Blocker].\n[On Play] Look at 3 cards from the top of your deck; reveal up to 1 {Dressrosa} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
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
                value: "Dressrosa",
                match: "includes",
              },
            ],
            revealDestination: "hand",
            remainderPosition: "bottom",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
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
  i18n: op15eb04Rebecca053I18n,
};
