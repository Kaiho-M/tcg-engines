import type { CharacterCard } from "@tcg/op-types";
import { op17CharlotteOven102I18n } from "./102-charlotte-oven.i18n.ts";

export const op17CharlotteOven102: CharacterCard = {
  id: "OP17-102",
  canonicalId: "OP17-102",
  slug: "charlotte-oven/op17-102",
  name: "Charlotte Oven",
  printings: [
    {
      id: "OP17-102",
      artId: "OP17-102",
      setCode: "OP17",
      collectorNumber: "102",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-102.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "UC",
  setId: "OP17",
  cost: 4,
  power: 4000,
  counter: 1000,
  trigger: "[Trigger] Play this card.",
  traits: ["Big Mom Pirates"],
  attribute: "special",
  effect:
    "[On K.O.] Play up to 1 Character card with 4000 power or less other than [Charlotte Oven] from your trash.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "trash",
            },
            count: {
              amount: 1,
              upTo: true,
            },
            filters: [
              {
                filter: "excludeName",
                value: "Charlotte Oven",
              },
              {
                filter: "power",
                comparison: "lte",
                value: 4000,
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
    ],
  },
  i18n: op17CharlotteOven102I18n,
};
