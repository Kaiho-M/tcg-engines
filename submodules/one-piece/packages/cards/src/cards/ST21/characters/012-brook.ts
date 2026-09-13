import type { CharacterCard } from "@tcg/op-types";
import { st21Brook012I18n } from "./012-brook.i18n.ts";

export const st21Brook012: CharacterCard = {
  id: "ST21-012",
  canonicalId: "ST21-012",
  slug: "brook/st21-012",
  name: "Brook",
  printings: [
    {
      id: "ST21-012",
      artId: "ST21-012",
      setCode: "ST21",
      collectorNumber: "012",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-012.png",
    },
    {
      id: "ST21-012_p1",
      artId: "ST21-012_p1",
      setCode: "ST21",
      collectorNumber: "012",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-012_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-012_p1.png",
      imageId: "ST21-012_p1",
    },
  ],
  effect:
    "[When Attacking] Give up to 2 rested DON!! cards to your Leader or 1 of your Characters.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: 1,
              },
            },
            count: {
              amount: 2,
              upTo: true,
            },
            donState: "rested",
          },
        ],
      },
    ],
  },
  i18n: st21Brook012I18n,
};
