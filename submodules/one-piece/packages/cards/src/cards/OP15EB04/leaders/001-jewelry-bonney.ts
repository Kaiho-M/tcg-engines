import type { LeaderCard } from "@tcg/op-types";
import { op15eb04JewelryBonney001I18n } from "./001-jewelry-bonney.i18n.ts";

export const op15eb04JewelryBonney001: LeaderCard = {
  id: "EB04-001",
  canonicalId: "EB04-001",
  slug: "jewelry-bonney/eb04-001",
  name: "Jewelry Bonney",
  printings: [
    {
      id: "EB04-001",
      artId: "EB04-001",
      setCode: "OP15EB04",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-001.jpg",
    },
    {
      id: "EB04-001_p1",
      artId: "EB04-001_p1",
      setCode: "OP15EB04",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-001_p1.jpg",
    },
  ],
  cardType: "leader",
  color: ["red", "yellow"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 4,
  traits: ["Bonney Pirates Egghead"],
  attribute: "special",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-001_p1.jpg",
      imageId: "EB04-001_p1",
    },
  ],
  effect:
    "[Opponent's Turn] If you have 1 or less Life cards, this Leader gains +2000 power. [Activate: Main] [Once Per Turn] Give up to 1 of your opponent's Characters -1000 power during this turn. Then, if you have 2 or more Life cards, you may add 1 card from the top of your Life cards to your hand.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            value: -1000,
            duration: "thisTurn",
          },
          {
            action: "removeFromLife",
            player: "self",
            count: {
              amount: 1,
            },
            destination: "hand",
            position: "top",
            condition: {
              condition: "lifeCount",
              player: "self",
              comparison: "gte",
              value: 2,
            },
          },
        ],
        oncePerTurn: true,
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "turn",
            value: "opponent",
          },
          {
            condition: "lifeCount",
            player: "self",
            comparison: "lte",
            value: 1,
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: "all",
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
  i18n: op15eb04JewelryBonney001I18n,
};
