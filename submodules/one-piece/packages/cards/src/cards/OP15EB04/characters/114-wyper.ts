import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Wyper114I18n } from "./114-wyper.i18n.ts";

export const op15eb04Wyper114: CharacterCard = {
  id: "OP15-114",
  canonicalId: "OP15-114",
  slug: "wyper/op15-114",
  name: "Wyper",
  printings: [
    {
      id: "OP15-114",
      artId: "OP15-114",
      setCode: "OP15EB04",
      collectorNumber: "114",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-114.png",
    },
    {
      id: "OP15-114_p1",
      artId: "OP15-114_p1",
      setCode: "OP15EB04",
      collectorNumber: "114",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-114_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Sky Island", "Shandian Warrior"],
  attribute: "ranged",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-114_p1.png",
      imageId: "OP15-114_p1",
    },
  ],
  effect:
    "[On Play] You may turn 1 card from the top of your Life cards face-up: Give all of your opponent's Characters −2000 power during this turn. Then, K.O. all of your opponent's Characters with 0 power or less.\n[Activate: Main] [Once Per Turn] Give up to 1 rested DON!! card to 1 of your {Sky Island} type Leader or Character cards.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "turnLifeFaceUp",
            count: 1,
            faceUp: true,
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
            duration: "thisTurn",
          },
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "power",
                  comparison: "lte",
                  value: 0,
                },
              ],
            },
          },
        ],
        optional: true,
      },
      {
        trigger: "activateMain",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: 1,
              },
              filters: [
                {
                  filter: "trait",
                  value: "Sky Island",
                  match: "includes",
                },
              ],
            },
            count: {
              amount: 1,
              upTo: true,
            },
            donState: "rested",
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op15eb04Wyper114I18n,
};
