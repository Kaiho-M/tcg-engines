import type { CharacterCard } from "@tcg/op-types";
import { st07CharlotteMontDOr009I18n } from "./009-charlotte-mont-d-or.i18n.ts";

export const st07CharlotteMontDOr009: CharacterCard = {
  id: "ST07-009",
  canonicalId: "ST07-009",
  slug: "charlotte-mont-d-or/st07-009",
  name: "Charlotte Mont-d'or",
  printings: [
    {
      id: "ST07-009",
      artId: "ST07-009",
      setCode: "ST07",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST07-009.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST07",
  cost: 3,
  power: 4000,
  counter: 1000,
  trigger: "You may trash 1 card from your hand: Play this card.",
  traits: ["Big Mom Pirates"],
  attribute: "special",
  effect:
    "[Activate: Main] You may rest this Character and add 1 card from the top or bottom of your Life cards to your hand: K.O. up to 1 of your opponent's Characters with a cost of 3 or less.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restThisCard",
          },
          {
            cost: "addLifeToHand",
            amount: 1,
            position: "choice",
          },
        ],
        actions: [
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
                  value: 3,
                },
              ],
            },
          },
        ],
        optional: true,
      },
      {
        trigger: "trigger",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "playThisCard",
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: st07CharlotteMontDOr009I18n,
};
