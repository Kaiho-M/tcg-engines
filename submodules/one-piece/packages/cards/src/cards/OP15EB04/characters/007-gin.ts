import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Gin007I18n } from "./007-gin.i18n.ts";

export const op15eb04Gin007: CharacterCard = {
  id: "OP15-007",
  canonicalId: "OP15-007",
  slug: "gin/op15-007",
  name: "Gin",
  printings: [
    {
      id: "OP15-007",
      artId: "OP15-007",
      setCode: "OP15EB04",
      collectorNumber: "007",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-007.png",
    },
    {
      id: "OP15-007_p1",
      artId: "OP15-007_p1",
      setCode: "OP15EB04",
      collectorNumber: "007",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-007_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 6,
  power: 7000,
  counter: 1000,
  traits: ["East Blue", "Krieg Pirates"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-007_p1.png",
      imageId: "OP15-007_p1",
    },
  ],
  effect:
    "[On Play] If your Leader has the {East Blue} type, play up to 1 Character card with a cost of 5 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "East Blue",
            match: "includes",
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
                filter: "cost",
                comparison: "lte",
                value: 5,
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
      },
    ],
  },
  i18n: op15eb04Gin007I18n,
};
