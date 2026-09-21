import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Morgan017I18n } from "./017-morgan.i18n.ts";

export const op15eb04Morgan017: CharacterCard = {
  id: "OP15-017",
  canonicalId: "OP15-017",
  slug: "morgan/op15-017",
  name: "Morgan",
  printings: [
    {
      id: "OP15-017",
      artId: "OP15-017",
      setCode: "OP15EB04",
      collectorNumber: "017",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-017.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["East Blue", "Navy"],
  attribute: "slash",
  effect:
    "[Blocker]\n[Activate: Main] [Once Per Turn] You may give 1 of your opponent's rested DON!! cards to 1 of your opponent's Characters: Give up to 1 rested DON!! card to its owner's Leader or 1 of their Characters.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "giveDon",
            amount: 1,
            player: "opponent",
            donState: "rested",
            filters: [
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
        actions: [
          {
            action: "giveDon",
            target: {
              player: "opponent",
              zones: ["leader", "character"],
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
        ],
        optional: true,
        oncePerTurn: true,
      },
    ],
  },
  i18n: op15eb04Morgan017I18n,
};
