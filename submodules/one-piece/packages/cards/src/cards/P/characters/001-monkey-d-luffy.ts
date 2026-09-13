import type { CharacterCard } from "@tcg/op-types";
import { pMonkeyDLuffy001I18n } from "./001-monkey-d-luffy.i18n.ts";

export const pMonkeyDLuffy001: CharacterCard = {
  id: "P-001",
  canonicalId: "P-001",
  slug: "monkey-d-luffy/p-001",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "P-001",
      artId: "P-001",
      setCode: "P",
      collectorNumber: "001",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001.png",
    },
    {
      id: "P-001_p1",
      artId: "P-001_p1",
      setCode: "P",
      collectorNumber: "001",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001_p1.png",
    },
    {
      id: "P-001_p2",
      artId: "P-001_p2",
      setCode: "P",
      collectorNumber: "001",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001_p2.png",
    },
    {
      id: "P-001_p5",
      artId: "P-001_p5",
      setCode: "P",
      collectorNumber: "001",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001_p5.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "P",
  setId: "P",
  cost: 6,
  power: 7000,
  traits: ["Supernovas", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001_p1.png",
      imageId: "P-001_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001_p2.png",
      imageId: "P-001_p2",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-001_p5.png",
      imageId: "P-001_p5",
    },
  ],
  effect:
    "[DON!! x2] This Character gains [Rush].\n(This card can attack on the turn in which it is played.)",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 2,
          },
        ],
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            keyword: "rush",
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: pMonkeyDLuffy001I18n,
};
