import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Borsalino058I18n } from "./058-borsalino.i18n.ts";

export const op15eb04Borsalino058: CharacterCard = {
  id: "EB04-058",
  canonicalId: "EB04-058",
  slug: "borsalino/eb04-058",
  name: "Borsalino",
  printings: [
    {
      id: "EB04-058",
      artId: "EB04-058",
      setCode: "OP15EB04",
      collectorNumber: "058",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-058.png",
    },
    {
      id: "EB04-058_p1",
      artId: "EB04-058_p1",
      setCode: "OP15EB04",
      collectorNumber: "058",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-058_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Egghead", "Navy"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-058_p1.png",
      imageId: "EB04-058_p1",
    },
  ],
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] If you have 2 or less Life cards, add up to 1 card from the top of your deck to the top of your Life cards.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
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
            action: "addToLife",
            target: {
              player: "self",
              zones: ["deck"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            position: "top",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Borsalino058I18n,
};
