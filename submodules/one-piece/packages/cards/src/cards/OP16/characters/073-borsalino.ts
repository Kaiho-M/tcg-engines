import type { CharacterCard } from "@tcg/op-types";
import { op16Borsalino073I18n } from "./073-borsalino.i18n.ts";

export const op16Borsalino073: CharacterCard = {
  id: "OP16-073",
  canonicalId: "OP16-073",
  slug: "borsalino/op16-073",
  name: "Borsalino",
  printings: [
    {
      id: "OP16-073",
      artId: "OP16-073",
      setCode: "OP16",
      collectorNumber: "073",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-073.png",
    },
    {
      id: "OP16-073_p1",
      artId: "OP16-073_p1",
      setCode: "OP16",
      collectorNumber: "073",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-073_p1.png",
    },
    {
      id: "OP16-073_p2",
      artId: "OP16-073_p2",
      setCode: "OP16",
      collectorNumber: "073",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-073_p2.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "R",
  setId: "OP16",
  cost: 7,
  power: 8000,
  traits: ["Admiral", "Navy"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-073_p1.png",
      imageId: "OP16-073_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP16-073_p2.png",
      imageId: "OP16-073_p2",
    },
  ],
  effect:
    "[On Play] Add up to 1 DON!! card from your DON!! deck and set it as active, and add up to 1 additional DON!! card and rest it.\n[End of Your Turn] DON!! −2: Set this Character as active. Then, this Character gains [Blocker] until the end of your opponent's next End Phase.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "addDon",
            count: {
              amount: 1,
              upTo: true,
            },
            state: "active",
          },
          {
            action: "addDon",
            count: {
              amount: 1,
              upTo: true,
            },
            state: "rested",
          },
        ],
      },
      {
        trigger: "endOfYourTurn",
        costs: [
          {
            cost: "returnDon",
            amount: 2,
          },
        ],
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
          },
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
            keyword: "blocker",
            duration: "untilEndOfOpponentNextEndPhase",
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op16Borsalino073I18n,
};
