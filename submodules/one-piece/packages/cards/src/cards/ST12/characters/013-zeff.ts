import type { CharacterCard } from "@tcg/op-types";
import { st12Zeff013I18n } from "./013-zeff.i18n.ts";

export const st12Zeff013: CharacterCard = {
  id: "ST12-013",
  canonicalId: "ST12-013",
  slug: "zeff/st12-013",
  name: "Zeff",
  printings: [
    {
      id: "ST12-013",
      artId: "ST12-013",
      setCode: "ST12",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST12-013.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST12",
  cost: 5,
  power: 5000,
  counter: 1000,
  traits: ["East Blue"],
  attribute: "strike",
  effect:
    "[On Play] Look at 3 cards from the top of your deck and place them at the top or bottom of the deck in any order.\n[When Attacking] Reveal 1 card from the top of your deck and play up to 1 Character card with a cost of 2 rested. Then, place the rest at the top or bottom of your deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "rearrangeDeck",
            player: "self",
            count: 3,
            position: "topOrBottom",
          },
        ],
      },
      {
        trigger: "whenAttacking",
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
            playState: "rested",
          },
        ],
      },
    ],
  },
  i18n: st12Zeff013I18n,
};
