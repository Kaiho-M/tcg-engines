import type { CharacterCard } from "@tcg/op-types";
import { op17EdwardNewgate005I18n } from "./005-edward-newgate.i18n.ts";

export const op17EdwardNewgate005: CharacterCard = {
  id: "OP17-005",
  canonicalId: "OP17-005",
  slug: "edward-newgate/op17-005",
  name: "Edward.Newgate",
  printings: [
    {
      id: "OP17-005",
      artId: "OP17-005",
      setCode: "OP17",
      collectorNumber: "005",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-005.png",
    },
    {
      id: "OP17-005_p1",
      artId: "OP17-005_p1",
      setCode: "OP17",
      collectorNumber: "005",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-005_p1.png",
    },
    {
      id: "OP17-005_p2",
      artId: "OP17-005_p2",
      setCode: "OP17",
      collectorNumber: "005",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-005_p2.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "OP17",
  cost: 10,
  power: 12000,
  traits: ["The Four Emperors", "Whitebeard Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-005_p1.png",
      imageId: "OP17-005_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-005_p2.png",
      imageId: "OP17-005_p2",
    },
  ],
  effect:
    "If your opponent has a Character with 10000 power or more, give this card in your hand −4 cost.\n[On Play] Your monocolored Leader's base power becomes 8000 until the end of your opponent's next End Phase.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "leaderMulticolored",
            negate: true,
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
            value: 8000,
            duration: "untilEndOfOpponentNextEndPhase",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "hasCard",
            player: "opponent",
            zone: "character",
            filters: [
              {
                filter: "power",
                comparison: "gte",
                value: 10000,
              },
            ],
          },
        ],
        actions: [
          {
            action: "modifyCost",
            target: {
              player: "self",
              zones: ["hand"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: -4,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op17EdwardNewgate005I18n,
};
