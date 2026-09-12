import type { CharacterCard } from "@tcg/op-types";
import { st30LittleoarsJr009I18n } from "./009-littleoars-jr.i18n.ts";

export const st30LittleoarsJr009: CharacterCard = {
  id: "ST30-009",
  canonicalId: "ST30-009",
  slug: "littleoars-jr/st30-009",
  name: "LittleOars Jr.",
  printings: [
    {
      id: "ST30-009",
      artId: "ST30-009",
      setCode: "ST30",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-009.png",
    },
    {
      id: "ST30-009_p1",
      artId: "ST30-009_p1",
      setCode: "ST30",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-009_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST30",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Giant", "Whitebeard Pirates Allies"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-009_p1.png",
      imageId: "ST30-009_p1",
    },
  ],
  effect:
    "If your Character with 6000 base power would be removed from the field by your opponent's effect, you may trash this Character and draw 1 card instead.",
  effects: {
    permanentEffects: [
      {
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
            condition: {
              condition: "replacement",
              event: "removed",
              targetSelf: false,
              source: "opponentEffect",
              target: {
                player: "self",
                zones: ["character"],
                count: {
                  amount: 1,
                },
                filters: [
                  {
                    filter: "basePower",
                    comparison: "eq",
                    value: 6000,
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  i18n: st30LittleoarsJr009I18n,
};
