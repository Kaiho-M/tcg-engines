import type { CharacterCard } from "@tcg/op-types";
import { st03Crocodile003I18n } from "./003-crocodile.i18n.ts";

export const st03Crocodile003: CharacterCard = {
  id: "ST03-003",
  canonicalId: "ST03-003",
  slug: "crocodile/st03-003",
  name: "Crocodile",
  printings: [
    {
      id: "ST03-003",
      artId: "ST03-003",
      setCode: "ST03",
      collectorNumber: "003",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-003.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "ST03",
  cost: 5,
  power: 6000,
  traits: ["The Seven Warlords of the Sea", "Baroque Works"],
  attribute: "special",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[DON!! x1] [On Block] Place up to 1 Character with a cost of 2 or less at the bottom of the owner's deck.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onBlock",
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "returnToDeck",
            target: {
              player: "any",
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
            position: "bottom",
          },
        ],
      },
    ],
  },
  i18n: st03Crocodile003I18n,
};
