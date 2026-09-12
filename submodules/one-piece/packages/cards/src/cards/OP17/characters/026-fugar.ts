import type { CharacterCard } from "@tcg/op-types";
import { op17Fugar026I18n } from "./026-fugar.i18n.ts";

export const op17Fugar026: CharacterCard = {
  id: "OP17-026",
  canonicalId: "OP17-026",
  slug: "fugar",
  name: "Fugar",
  printings: [
    {
      id: "OP17-026",
      artId: "OP17-026",
      setCode: "OP17",
      collectorNumber: "026",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-026.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP17",
  cost: 1,
  power: 2000,
  counter: 2000,
  traits: ["Red-Haired Pirates Allies"],
  attribute: "slash",
  effect:
    "[When Attacking] If your Leader has the {Red-Haired Pirates} type, rest up to 1 of your opponent's Characters with a cost of 2 or less.\n[On K.O.] Draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Red-Haired Pirates",
            match: "includes",
          },
        ],
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
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 2,
                },
              ],
            },
          },
        ],
      },
      {
        trigger: "onKo",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
  },
  i18n: op17Fugar026I18n,
};
