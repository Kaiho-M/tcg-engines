import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Zeff004I18n } from "./004-zeff.i18n.ts";

export const op15eb04Zeff004: CharacterCard = {
  id: "EB04-004",
  canonicalId: "EB04-004",
  slug: "zeff/eb04-004",
  name: "Zeff",
  printings: [
    {
      id: "EB04-004",
      artId: "EB04-004",
      setCode: "OP15EB04",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-004.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 7,
  power: 8000,
  traits: ["East Blue"],
  attribute: "strike",
  effect:
    "[When Attacking] Your Leader's base power becomes 7000 until the end of your opponent's next End Phase.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
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
            value: 7000,
            duration: "untilEndOfOpponentNextEndPhase",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Zeff004I18n,
};
