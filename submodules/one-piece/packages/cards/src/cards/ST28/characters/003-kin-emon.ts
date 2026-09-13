import type { CharacterCard } from "@tcg/op-types";
import { st28KinEmon003I18n } from "./003-kin-emon.i18n.ts";

export const st28KinEmon003: CharacterCard = {
  id: "ST28-003",
  canonicalId: "ST28-003",
  slug: "kin-emon/st28-003",
  name: "Kin'emon",
  printings: [
    {
      id: "ST28-003",
      artId: "ST28-003",
      setCode: "ST28",
      collectorNumber: "003",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST28-003.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST28",
  cost: 4,
  power: 5000,
  counter: 2000,
  trigger:
    "If your Leader has the {Land of Wano} type and your opponent has 3 or less Life cards, play this card.",
  traits: ["Land of Wano", "The Akazaya Nine"],
  attribute: "slash",
  effect:
    "[Trigger] If your Leader has the {Land of Wano} type and your opponent has 3 or less Life cards, play this card.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        conditions: [
          {
            condition: "compound",
            operator: "and",
            conditions: [
              {
                condition: "leaderTrait",
                trait: "Land of Wano",
                match: "includes",
              },
              {
                condition: "lifeCount",
                player: "opponent",
                comparison: "lte",
                value: 3,
              },
            ],
          },
        ],
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
    ],
  },
  i18n: st28KinEmon003I18n,
};
