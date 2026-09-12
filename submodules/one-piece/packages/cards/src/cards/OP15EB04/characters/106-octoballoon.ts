import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Octoballoon106I18n } from "./106-octoballoon.i18n.ts";

export const op15eb04Octoballoon106: CharacterCard = {
  id: "OP15-106",
  canonicalId: "OP15-106",
  slug: "octoballoon",
  name: "Octoballoon",
  printings: [
    {
      id: "OP15-106",
      artId: "OP15-106",
      setCode: "OP15EB04",
      collectorNumber: "106",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-106.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 2,
  counter: 1000,
  trigger:
    "[Trigger] Draw 1 card. Then, play up to 1 yellow Character or Stage card with a cost of 2 or less from your hand.",
  traits: ["Animal", "Sky Island"],
  attribute: "wisdom",
  effect:
    "[Trigger] [Trigger] Draw 1 card. Then, play up to 1 yellow Character or Stage card with a cost of 2 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
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
                value: 2,
              },
              {
                filter: "color",
                value: "yellow",
              },
            ],
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
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
                value: 2,
              },
              {
                filter: "color",
                value: "yellow",
              },
            ],
          },
        ],
      },
    ],
  },
  i18n: op15eb04Octoballoon106I18n,
};
