import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Kotori064I18n } from "./064-kotori.i18n.ts";

export const op15eb04Kotori064: CharacterCard = {
  id: "OP15-064",
  canonicalId: "OP15-064",
  slug: "kotori/op15-064",
  name: "Kotori",
  printings: [
    {
      id: "OP15-064",
      artId: "OP15-064",
      setCode: "OP15EB04",
      collectorNumber: "064",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-064.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Sky Island"],
  attribute: "special",
  effect:
    "[Activate: Main] DON!! −2, You may rest this Character: If you have [Satori] and [Hotori], rest up to 1 of your opponent's Characters with 5000 power or less.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "returnDon",
            amount: 2,
          },
          {
            cost: "restThisCard",
          },
        ],
        actions: [
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "power",
                  comparison: "lte",
                  value: 5000,
                },
              ],
            },
            condition: {
              condition: "compound",
              operator: "and",
              conditions: [
                {
                  condition: "hasCard",
                  player: "self",
                  zone: "field",
                  filters: [
                    {
                      filter: "name",
                      value: "Satori",
                    },
                  ],
                },
                {
                  condition: "hasCard",
                  player: "self",
                  zone: "field",
                  filters: [
                    {
                      filter: "name",
                      value: "Hotori",
                    },
                  ],
                },
              ],
            },
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op15eb04Kotori064I18n,
};
