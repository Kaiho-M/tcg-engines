import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Krieg008I18n } from "./008-krieg.i18n.ts";

export const op15eb04Krieg008: CharacterCard = {
  id: "OP15-008",
  canonicalId: "OP15-008",
  slug: "krieg/op15-008",
  name: "Krieg",
  printings: [
    {
      id: "OP15-008",
      artId: "OP15-008",
      setCode: "OP15EB04",
      collectorNumber: "008",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-008.png",
    },
    {
      id: "OP15-008_p1",
      artId: "OP15-008_p1",
      setCode: "OP15EB04",
      collectorNumber: "008",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-008_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 8,
  power: 9000,
  traits: ["East Blue", "Krieg Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-008_p1.png",
      imageId: "OP15-008_p1",
    },
  ],
  effect:
    "[On Play] Give up to 3 of your opponent's rested DON!! cards to 1 of your opponent's Characters. Then, this Character gains [Rush] during this turn.\n[Activate: Main] [Once Per Turn] If this Character was played on this turn, give all of your opponent's Characters −1000 power during this turn for every DON!! card given to that Character.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
              },
            },
            count: {
              amount: 3,
              upTo: true,
            },
            donState: "rested",
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
            keyword: "rush",
            duration: "thisTurn",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Krieg008I18n,
};
