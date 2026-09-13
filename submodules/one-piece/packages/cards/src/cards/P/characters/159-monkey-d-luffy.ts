import type { CharacterCard } from "@tcg/op-types";
import { pMonkeyDLuffy159I18n } from "./159-monkey-d-luffy.i18n.ts";

export const pMonkeyDLuffy159: CharacterCard = {
  id: "P-159",
  canonicalId: "P-159",
  slug: "monkey-d-luffy/p-159",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "P-159",
      artId: "P-159",
      setCode: "P",
      collectorNumber: "159",
      rarity: "P",
      imageUrl: "https://www.onepiece-cardgame.com/images/cardlist/card/P-159.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "P",
  setId: "P",
  cost: 4,
  power: 5000,
  counter: 2000,
  traits: ["Elbaf", "The Four Emperors", "Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[On K.O.] If your Leader has DON!! cards given to it, play up to 1 {Straw Hat Crew} type Character card with 6000 power or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        conditions: [
          {
            condition: "donGiven",
            player: "self",
            zone: "leader",
          },
        ],
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
                filter: "power",
                comparison: "lte",
                value: 6000,
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
      },
    ],
  },
  i18n: pMonkeyDLuffy159I18n,
};
