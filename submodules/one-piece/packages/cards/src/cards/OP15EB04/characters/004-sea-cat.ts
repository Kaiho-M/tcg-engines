import type { CharacterCard } from "@tcg/op-types";
import { op15eb04SeaCat004I18n } from "./004-sea-cat.i18n.ts";

export const op15eb04SeaCat004: CharacterCard = {
  id: "OP15-004",
  canonicalId: "OP15-004",
  slug: "sea-cat",
  name: "Sea Cat",
  printings: [
    {
      id: "OP15-004",
      artId: "OP15-004",
      setCode: "OP15EB04",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-004.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  counter: 1000,
  traits: ["Animal", "Alabasta"],
  attribute: "wisdom",
  effect:
    "[On Play] If your Leader has 0 power or less, give up to 1 of your opponent's Characters −3000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "hasCard",
            player: "self",
            zone: "leader",
            filters: [
              {
                filter: "power",
                comparison: "lte",
                value: 0,
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
                amount: 1,
                upTo: true,
              },
            },
            value: -3000,
            duration: "thisTurn",
          },
        ],
      },
    ],
  },
  i18n: op15eb04SeaCat004I18n,
};
