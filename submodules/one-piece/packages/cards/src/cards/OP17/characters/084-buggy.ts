import type { CharacterCard } from "@tcg/op-types";
import { op17Buggy084I18n } from "./084-buggy.i18n.ts";

export const op17Buggy084: CharacterCard = {
  id: "P-084",
  canonicalId: "P-084",
  slug: "buggy/p-084",
  name: "Buggy",
  printings: [
    {
      id: "P-084",
      artId: "P-084_p1",
      setCode: "OP17",
      collectorNumber: "084",
      rarity: "SP",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-084_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SP",
  setId: "OP17",
  cost: 7,
  power: 8000,
  traits: ["The Four Emperors", "Cross Guild"],
  attribute: "slash",
  effect:
    "This Character cannot attack.\nIf your Leader is [Buggy], all Characters with a cost of 3 or 4 cannot attack.\n[On Play] Play up to 1 {Cross Guild} type Character card with a cost of 6 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
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
                value: 6,
              },
              {
                filter: "trait",
                value: "Cross Guild",
                match: "includes",
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
      },
    ],
    permanentEffects: [
      {
        actions: [
          {
            action: "cannotAttack",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op17Buggy084I18n,
};
