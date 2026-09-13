import type { CharacterCard } from "@tcg/op-types";
import { st21JewelryBonney004I18n } from "./004-jewelry-bonney.i18n.ts";

export const st21JewelryBonney004: CharacterCard = {
  id: "ST21-004",
  canonicalId: "ST21-004",
  slug: "jewelry-bonney/st21-004",
  name: "Jewelry Bonney",
  printings: [
    {
      id: "ST21-004",
      artId: "ST21-004",
      setCode: "ST21",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-004.png",
    },
    {
      id: "ST21-004_p1",
      artId: "ST21-004_p1",
      setCode: "ST21",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-004_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 1,
  power: 3000,
  traits: ["Egghead", "Bonney Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-004_p1.png",
      imageId: "ST21-004_p1",
    },
  ],
  effect: "[DON!! x2] [On K.O.] Draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        conditions: [
          {
            condition: "donAttached",
            amount: 2,
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
  i18n: st21JewelryBonney004I18n,
};
