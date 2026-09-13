import type { CharacterCard } from "@tcg/op-types";
import { st12EmporioIvankov010I18n } from "./010-emporio-ivankov.i18n.ts";

export const st12EmporioIvankov010: CharacterCard = {
  id: "ST12-010",
  canonicalId: "ST12-010",
  slug: "emporio-ivankov/st12-010",
  name: "Emporio.Ivankov",
  printings: [
    {
      id: "ST12-010",
      artId: "ST12-010",
      setCode: "ST12",
      collectorNumber: "010",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST12-010.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "ST12",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Impel Down", "Revolutionary Army"],
  attribute: "special",
  effect:
    "[On Play] Reveal 1 card from the top of your deck and play up to 1 Character card with a cost of 2. Then, place the rest at the top or bottom of your deck.\n[When Attacking] [Once Per Turn] Draw 1 card if you have 6 or less cards in your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 1,
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
                filter: "cost",
                comparison: "eq",
                value: 2,
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
            revealDestination: "character",
            remainderPosition: "any",
          },
        ],
      },
      {
        trigger: "whenAttacking",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
            condition: {
              condition: "handCount",
              player: "self",
              comparison: "lte",
              value: 6,
            },
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: st12EmporioIvankov010I18n,
};
