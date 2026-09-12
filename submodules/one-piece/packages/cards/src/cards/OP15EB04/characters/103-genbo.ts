import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Genbo103I18n } from "./103-genbo.i18n.ts";

export const op15eb04Genbo103: CharacterCard = {
  id: "OP15-103",
  canonicalId: "OP15-103",
  slug: "genbo/op15-103",
  name: "Genbo",
  printings: [
    {
      id: "OP15-103",
      artId: "OP15-103",
      setCode: "OP15EB04",
      collectorNumber: "103",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-103.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 3,
  power: 4000,
  counter: 1000,
  trigger: "Draw 1 card. Then, if you have 2 or less Life cards, play this card.",
  traits: ["Sky Island", "Shandian Warrior"],
  attribute: "ranged",
  effect: "[Trigger] Draw 1 card. Then, if you have 2 or less Life cards, play this card.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
          {
            action: "playThisCard",
            condition: {
              condition: "lifeCount",
              player: "self",
              comparison: "lte",
              value: 2,
            },
          },
        ],
      },
    ],
  },
  i18n: op15eb04Genbo103I18n,
};
