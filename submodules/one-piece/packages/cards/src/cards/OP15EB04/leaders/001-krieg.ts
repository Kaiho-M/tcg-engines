import type { LeaderCard } from "@tcg/op-types";
import { op15eb04Krieg001I18n } from "./001-krieg.i18n.ts";

export const op15eb04Krieg001: LeaderCard = {
  id: "OP15-001",
  canonicalId: "OP15-001",
  slug: "krieg/op15-001",
  name: "Krieg",
  printings: [
    {
      id: "OP15-001",
      artId: "OP15-001",
      setCode: "OP15EB04",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-001_YhftEiD.jpg",
    },
    {
      id: "OP15-001_p1",
      artId: "OP15-001_p1",
      setCode: "OP15EB04",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-001_p1_v0n0iIW.jpg",
    },
  ],
  cardType: "leader",
  color: ["green", "red"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 4,
  traits: ["Krieg Pirates East Blue"],
  attribute: "slash",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-001_p1_v0n0iIW.jpg",
      imageId: "OP15-001_p1",
    },
  ],
  effect:
    "[DON!! x1] [Opponent's Turn] If the only Characters on your field are {East Blue} type Characters, give all of your opponent's Characters -2000 power.\n[Activate: Main] [Once Per Turn] Rest up to 1 of your opponent's Characters that has 2 or more DON!! cards given.",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
          {
            condition: "turn",
            value: "opponent",
          },
          {
            condition: "zoneCount",
            player: "self",
            zone: "character",
            comparison: "eq",
            value: 0,
            filters: [
              {
                filter: "trait",
                value: "East Blue",
                match: "includes",
                negate: true,
              },
            ],
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: "all",
              },
            },
            value: -2000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Krieg001I18n,
};
