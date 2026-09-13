import type { CharacterCard } from "@tcg/op-types";
import { pLilith118I18n } from "./118-lilith.i18n.ts";

export const pLilith118: CharacterCard = {
  id: "P-118",
  canonicalId: "P-118",
  slug: "lilith/p-118",
  name: "Lilith",
  printings: [
    {
      id: "P-118",
      artId: "P-118",
      setCode: "P",
      collectorNumber: "118",
      rarity: "P",
      imageUrl: "https://www.onepiece-cardgame.com/images/cardlist/card/P-118.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "P",
  setId: "P",
  cost: 6,
  power: 6000,
  counter: 1000,
  traits: ["Egghead", "Scientist"],
  attribute: "wisdom",
  effect:
    "[On Play] If your Leader has the {Egghead} type, play up to 1 Character card with a cost of 5 or less that has the {Egghead} type or a [Trigger] from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Egghead",
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
                filter: "anyOf",
                groups: [
                  [
                    {
                      filter: "trait",
                      value: "Egghead",
                      match: "includes",
                    },
                  ],
                  [
                    {
                      filter: "hasTrigger",
                      value: true,
                    },
                  ],
                ],
              },
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
  i18n: pLilith118I18n,
};
