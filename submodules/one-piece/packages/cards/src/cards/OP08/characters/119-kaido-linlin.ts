import type { CharacterCard } from "@tcg/op-types";
import { op08KaidoLinlin119I18n } from "./119-kaido-linlin.i18n.ts";

export const op08KaidoLinlin119: CharacterCard = {
  id: "OP08-119",
  canonicalId: "OP08-119",
  slug: "kaido-linlin",
  name: "Kaido & Linlin",
  printings: [
    {
      id: "OP08-119",
      artId: "OP08-119",
      setCode: "OP08",
      collectorNumber: "119",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP08-119.png",
    },
    {
      id: "OP08-119_p1",
      artId: "OP08-119_p1",
      setCode: "OP08",
      collectorNumber: "119",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP08-119_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SEC",
  setId: "OP08",
  cost: 10,
  power: 12000,
  traits: ["The Four Emperors", "Animal Kingdom Pirates", "Big Mom Pirates"],
  attribute: ["strike", "special"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP08-119_p1.png",
      imageId: "OP08-119_p1",
    },
  ],
  effect:
    "[When Attacking] DON!! −10: K.O. all Characters other than this Character. Then, add up to 1 card from the top of your deck to the top of your Life cards and trash up to 1 card from the top of your opponent's Life cards.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        costs: [
          {
            cost: "returnDon",
            amount: 10,
          },
        ],
        actions: [
          {
            action: "ko",
            target: {
              player: "any",
              zones: ["character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "excludeSelf",
                },
              ],
            },
          },
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
          {
            action: "removeFromLife",
            player: "opponent",
            count: {
              amount: 1,
              upTo: true,
            },
            destination: "trash",
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op08KaidoLinlin119I18n,
};
