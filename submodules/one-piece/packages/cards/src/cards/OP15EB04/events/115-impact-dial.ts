import type { EventCard } from "@tcg/op-types";
import { op15eb04ImpactDial115I18n } from "./115-impact-dial.i18n.ts";

export const op15eb04ImpactDial115: EventCard = {
  id: "OP15-115",
  canonicalId: "OP15-115",
  slug: "impact-dial",
  name: "Impact Dial",
  printings: [
    {
      id: "OP15-115",
      artId: "OP15-115",
      setCode: "OP15EB04",
      collectorNumber: "115",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-115.png",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 2,
  trigger: "[Trigger] K.O. up to 1 of your opponent's Characters with a cost of 4 or less.",
  traits: ["Sky Island", "Straw Hat Crew"],
  effect:
    "[Main] K.O. up to 1 of your opponent's Characters with a cost of 4 or less. Then, add 1 card from the top of your Life cards to your hand.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 4,
                },
              ],
            },
          },
          {
            action: "removeFromLife",
            player: "self",
            count: {
              amount: 1,
            },
            destination: "hand",
            position: "top",
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 4,
                },
              ],
            },
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 4,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: op15eb04ImpactDial115I18n,
};
