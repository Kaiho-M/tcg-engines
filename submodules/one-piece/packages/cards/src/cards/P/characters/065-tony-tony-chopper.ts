import type { CharacterCard } from "@tcg/op-types";
import { pTonyTonyChopper065I18n } from "./065-tony-tony-chopper.i18n.ts";

export const pTonyTonyChopper065: CharacterCard = {
  id: "P-065",
  canonicalId: "P-065",
  slug: "tony-tony-chopper/p-065",
  name: "Tony Tony.Chopper",
  printings: [
    {
      id: "P-065",
      artId: "P-065",
      setCode: "P",
      collectorNumber: "065",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-065.png",
    },
    {
      id: "P-065_p1",
      artId: "P-065_p1",
      setCode: "P",
      collectorNumber: "065",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-065_p1.png",
    },
    {
      id: "P-065_p2",
      artId: "P-065_p2",
      setCode: "P",
      collectorNumber: "065",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-065_p2.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "P",
  setId: "P",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Animal", "Straw Hat Crew"],
  attribute: "wisdom",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-065_p1.png",
      imageId: "P-065_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-065_p2.png",
      imageId: "P-065_p2",
    },
  ],
  effect:
    "[When Attacking] If your opponent has a Character with a cost of 0, this Character gains +2000 power until the start of your next turn.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "hasCard",
            player: "opponent",
            zone: "character",
            filters: [
              {
                filter: "cost",
                comparison: "eq",
                value: 0,
              },
            ],
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
            duration: "untilStartOfNextTurn",
          },
        ],
      },
    ],
  },
  i18n: pTonyTonyChopper065I18n,
};
