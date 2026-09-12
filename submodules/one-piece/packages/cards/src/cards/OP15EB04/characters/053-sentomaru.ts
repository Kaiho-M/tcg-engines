import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Sentomaru053I18n } from "./053-sentomaru.i18n.ts";

export const op15eb04Sentomaru053: CharacterCard = {
  id: "EB04-053",
  canonicalId: "EB04-053",
  slug: "sentomaru/eb04-053",
  name: "Sentomaru",
  printings: [
    {
      id: "EB04-053",
      artId: "EB04-053",
      setCode: "OP15EB04",
      collectorNumber: "053",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-053.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 2,
  power: 1000,
  counter: 1000,
  traits: ["Egghead", "Navy"],
  attribute: "slash",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Block] If you have 2 or less Life cards, draw 1 card.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onBlock",
        conditions: [
          {
            condition: "lifeCount",
            player: "self",
            comparison: "lte",
            value: 2,
          },
        ],
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
  i18n: op15eb04Sentomaru053I18n,
};
