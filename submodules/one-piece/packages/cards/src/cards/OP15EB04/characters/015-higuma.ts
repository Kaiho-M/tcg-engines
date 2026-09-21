import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Higuma015I18n } from "./015-higuma.i18n.ts";

export const op15eb04Higuma015: CharacterCard = {
  id: "OP15-015",
  canonicalId: "OP15-015",
  slug: "higuma/op15-015",
  name: "Higuma",
  printings: [
    {
      id: "OP15-015",
      artId: "OP15-015",
      setCode: "OP15EB04",
      collectorNumber: "015",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-015.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 1000,
  counter: 2000,
  traits: ["East Blue", "Mountain Bandits"],
  attribute: "slash",
  effect:
    "[On Play] Give up to 1 of your opponent's rested DON!! cards to 1 of your opponent's Characters. Then, give −1000 power during this turn to up to 1 of your opponent's Characters with a DON!! card given.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
              },
            },
            count: {
              amount: 1,
              upTo: true,
            },
            donState: "rested",
          },
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "attachedDon",
                  comparison: "gte",
                  value: 1,
                },
              ],
            },
            value: -1000,
            duration: "thisTurn",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Higuma015I18n,
};
