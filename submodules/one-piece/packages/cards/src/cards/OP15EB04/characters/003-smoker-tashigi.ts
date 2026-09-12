import type { CharacterCard } from "@tcg/op-types";
import { op15eb04SmokerTashigi003I18n } from "./003-smoker-tashigi.i18n.ts";

export const op15eb04SmokerTashigi003: CharacterCard = {
  id: "EB04-003",
  canonicalId: "EB04-003",
  slug: "smoker-tashigi",
  name: "Smoker & Tashigi",
  printings: [
    {
      id: "EB04-003",
      artId: "EB04-003",
      setCode: "OP15EB04",
      collectorNumber: "003",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-003.png",
    },
    {
      id: "EB04-003_p1",
      artId: "EB04-003_p1",
      setCode: "OP15EB04",
      collectorNumber: "003",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-003_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 8,
  power: 8000,
  traits: ["Punk Hazard", "Navy"],
  attribute: ["slash", "special"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-003_p1.png",
      imageId: "EB04-003_p1",
    },
  ],
  effect:
    "[Rush] (This card can attack on the turn in which it is played.)\n[Opponent's Turn] Your {Navy} type Leader's base power becomes 7000.",
  effects: {
    keywords: ["rush"],
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
            action: "setBasePower",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
              filters: [
                {
                  filter: "trait",
                  value: "Navy",
                  match: "includes",
                },
              ],
            },
            value: 7000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04SmokerTashigi003I18n,
};
