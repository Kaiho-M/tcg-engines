import type { CharacterCard } from "@tcg/op-types";
import { op15eb04MonkeyDLuffy119I18n } from "./119-monkey-d-luffy.i18n.ts";

export const op15eb04MonkeyDLuffy119: CharacterCard = {
  id: "OP15-119",
  canonicalId: "OP15-119",
  slug: "monkey-d-luffy/op15-119",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP15-119",
      artId: "OP15-119",
      setCode: "OP15EB04",
      collectorNumber: "119",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-119.png",
    },
    {
      id: "OP15-119_p1",
      artId: "OP15-119_p1",
      setCode: "OP15EB04",
      collectorNumber: "119",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-119_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SEC",
  setId: "OP15EB04",
  cost: 5,
  power: 7000,
  traits: ["Sky Island", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-119_p1.png",
      imageId: "OP15-119_p1",
    },
  ],
  effect:
    "If you have 6 or more DON!! cards on your field, this Character gains [Rush].\nWhen your opponent activates an Event or [Blocker], reveal up to 1 card from the top of your Life cards. This Character gains +1000 power during this turn per 1 cost on the revealed card.",
  effects: {
    effects: [
      {
        trigger: "whenBlockerActivated",
        actions: [
          {
            action: "revealFromLife",
            player: "self",
          },
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
            value: 0,
            valuePerPreviousActionTargetCost: 1000,
            duration: "thisTurn",
          },
        ],
      },
      {
        trigger: "whenOpponentActivatesEvent",
        actions: [
          {
            action: "revealFromLife",
            player: "self",
          },
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
            value: 0,
            valuePerPreviousActionTargetCost: 1000,
            duration: "thisTurn",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donFieldCount",
            player: "self",
            comparison: "gte",
            value: 6,
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
  i18n: op15eb04MonkeyDLuffy119I18n,
};
