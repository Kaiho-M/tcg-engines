import type { EventCard } from "@tcg/op-types";
import { op15eb04BlackRopeDragonTwister059I18n } from "./059-black-rope-dragon-twister.i18n.ts";

export const op15eb04BlackRopeDragonTwister059: EventCard = {
  id: "EB04-059",
  canonicalId: "EB04-059",
  slug: "black-rope-dragon-twister",
  name: "Black Rope Dragon Twister",
  printings: [
    {
      id: "EB04-059",
      artId: "EB04-059",
      setCode: "OP15EB04",
      collectorNumber: "059",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-059.png",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 6,
  trigger: "Draw 2 cards and trash 1 card from your hand.",
  traits: ["Fish-Man Island", "Supernovas", "Straw Hat Crew"],
  effect:
    "[Main] You may turn 1 card from the top of your Life cards face-up: If you have less Characters than your opponent, K.O. up to 1 of your opponent's Characters with a cost of 6 or less and up to 1 of your opponent's Characters with a cost of 5 or less.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "turnLifeFaceUp",
            count: 1,
            faceUp: true,
          },
        ],
        actions: [
          {
            action: "conditional",
            predicate: {
              condition: "zoneCountComparison",
              zone: "character",
              selfComparison: "lt",
              difference: 1,
            },
            whenTrue: [
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
                      value: 6,
                    },
                  ],
                },
              },
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
                      value: 5,
                    },
                  ],
                },
              },
            ],
          },
        ],
        optional: true,
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2,
          },
          {
            action: "trashFromHand",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
  },
  i18n: op15eb04BlackRopeDragonTwister059I18n,
};
