import type { EventCard } from "@tcg/op-types";
import { st02StrawSword017I18n } from "./017-straw-sword.i18n.ts";

export const st02StrawSword017: EventCard = {
  id: "ST02-017",
  canonicalId: "ST02-017",
  slug: "straw-sword",
  name: "Straw Sword",
  printings: [
    {
      id: "ST02-017",
      artId: "ST02-017",
      setCode: "ST02",
      collectorNumber: "017",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST02-017.png",
    },
  ],
  cardType: "event",
  color: ["green"],
  rarity: "C",
  setId: "ST02",
  cost: 2,
  trigger: "Play up to 1 {Supernovas} type card with a cost of 2 or less from your hand.",
  traits: ["Supernovas", "Hawkins Pirates"],
  effect: "[Main] Rest up to 1 of your opponent's Characters.",
  effects: {
    effects: [
      {
        trigger: "main",
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
            },
          },
        ],
      },
      {
        trigger: "trigger",
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
                value: 2,
              },
              {
                filter: "trait",
                value: "Supernovas",
                match: "includes",
              },
            ],
          },
        ],
      },
    ],
  },
  i18n: st02StrawSword017I18n,
};
