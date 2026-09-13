import type { CharacterCard } from "@tcg/op-types";
import { pKoby092I18n } from "./092-koby.i18n.ts";

export const pKoby092: CharacterCard = {
  id: "P-092",
  canonicalId: "P-092",
  slug: "koby/p-092",
  name: "Koby",
  printings: [
    {
      id: "P-092",
      artId: "P-092",
      setCode: "P",
      collectorNumber: "092",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-092.png",
    },
    {
      id: "P-092_p1",
      artId: "P-092_p1",
      setCode: "P",
      collectorNumber: "092",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-092_p1.png",
    },
    {
      id: "P-092_p2",
      artId: "P-092_p2",
      setCode: "P",
      collectorNumber: "092",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-092_p2.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "P",
  setId: "P",
  cost: 7,
  power: 7000,
  counter: 1000,
  traits: ["Navy", "SWORD"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-092_p1.png",
      imageId: "P-092_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-092_p2.png",
      imageId: "P-092_p2",
    },
  ],
  effect:
    "[Opponent's Turn] Give this Character −3000 power.\n[When Attacking] If your Leader has the {Navy} type, your Leader's base power becomes 7000 until the end of your opponent's next turn.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Navy",
            match: "includes",
          },
        ],
        actions: [
          {
            action: "setBasePower",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
            },
            value: 7000,
            duration: "untilEndOfOpponentNextTurn",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
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
            value: -3000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: pKoby092I18n,
};
