import type { CharacterCard } from "@tcg/op-types";
import { op13FiveElders082I18n } from "./082-five-elders.i18n.ts";

export const op13FiveElders082: CharacterCard = {
  id: "OP13-082",
  canonicalId: "OP13-082",
  slug: "five-elders",
  name: "Five Elders",
  printings: [
    {
      id: "OP13-082",
      artId: "OP13-082",
      setCode: "OP13",
      collectorNumber: "082",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP13-082.png",
    },
    {
      id: "OP13-082_p1",
      artId: "OP13-082_p1",
      setCode: "OP13",
      collectorNumber: "082",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP13-082_p1.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP13",
  cost: 10,
  power: 12000,
  traits: ["Celestial Dragons", "Five Elders"],
  attribute: ["slash", "special"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP13-082_p1.png",
      imageId: "OP13-082_p1",
    },
  ],
  effect:
    "[Activate: Main] If your Leader is [Imu], you may rest 1 of your DON!! cards and trash 1 card from your hand: Trash all of your Characters and play up to 5 {Five Elders} type Character cards with 5000 power and different card names from your trash.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restDon",
            amount: 1,
          },
          {
            cost: "trashFromHand",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "trashFromField",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: "all",
              },
            },
          },
          {
            action: "play",
            source: {
              player: "self",
              zone: "trash",
            },
            count: {
              amount: 5,
              upTo: true,
            },
            filters: [
              {
                filter: "trait",
                value: "Five Elders",
                match: "includes",
              },
            ],
          },
        ],
        optional: true,
        conditions: [
          {
            condition: "leaderName",
            name: "Imu",
          },
        ],
      },
    ],
  },
  i18n: op13FiveElders082I18n,
};
