import type { CharacterCard } from "@tcg/op-types";
import { st21Usopp002I18n } from "./002-usopp.i18n.ts";

export const st21Usopp002: CharacterCard = {
  id: "ST21-002",
  canonicalId: "ST21-002",
  slug: "usopp/st21-002",
  name: "Usopp",
  printings: [
    {
      id: "ST21-002",
      artId: "ST21-002",
      setCode: "ST21",
      collectorNumber: "002",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-002.png",
    },
    {
      id: "ST21-002_p1",
      artId: "ST21-002_p1",
      setCode: "ST21",
      collectorNumber: "002",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-002_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 2,
  power: 3000,
  counter: 2000,
  traits: ["Straw Hat Crew"],
  attribute: "ranged",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-002_p1.png",
      imageId: "ST21-002_p1",
    },
  ],
  effect: "[DON!! x2] [Opponent's Turn] This Character gains +2000 power.",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 2,
          },
          {
            condition: "turn",
            value: "opponent",
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: 2000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: st21Usopp002I18n,
};
