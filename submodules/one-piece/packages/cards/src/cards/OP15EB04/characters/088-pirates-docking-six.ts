import type { CharacterCard } from "@tcg/op-types";
import { op15eb04PiratesDockingSix088I18n } from "./088-pirates-docking-six.i18n.ts";

export const op15eb04PiratesDockingSix088: CharacterCard = {
  id: "OP15-088",
  canonicalId: "OP15-088",
  slug: "pirates-docking-six",
  name: "Pirates Docking Six",
  printings: [
    {
      id: "OP15-088",
      artId: "OP15-088",
      setCode: "OP15EB04",
      collectorNumber: "088",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-088.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 5,
  power: 7000,
  traits: ["Straw Hat Crew"],
  attribute: "strike",
  effect:
    "This Character gains +6 cost.\n[On Play] You may trash 3 cards from the top of your deck: Play up to 1 {Straw Hat Crew} type Character card with a cost of 2 or less from your trash.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "zoneCount",
            player: "self",
            zone: "deck",
            comparison: "gte",
            value: 3,
          },
        ],
        actions: [
          {
            action: "trashFromDeck",
            player: "self",
            amount: 3,
          },
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
                filter: "cost",
                comparison: "lte",
                value: 2,
              },
              {
                filter: "trait",
                value: "Straw Hat Crew",
                match: "includes",
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
        optional: true,
      },
    ],
    permanentEffects: [
      {
        actions: [
          {
            action: "modifyCost",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: 6,
          },
        ],
      },
    ],
  },
  i18n: op15eb04PiratesDockingSix088I18n,
};
