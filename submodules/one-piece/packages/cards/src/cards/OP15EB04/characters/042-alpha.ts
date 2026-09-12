import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Alpha042I18n } from "./042-alpha.i18n.ts";

export const op15eb04Alpha042: CharacterCard = {
  id: "EB04-042",
  canonicalId: "EB04-042",
  slug: "alpha",
  name: "Alpha",
  printings: [
    {
      id: "EB04-042",
      artId: "EB04-042",
      setCode: "OP15EB04",
      collectorNumber: "042",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-042.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 2000,
  traits: ["CP8"],
  attribute: "strike",
  effect:
    "[On Play] You may trash 3 cards from the top of your deck: Give up to 1 of your opponent's Characters −1 cost during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "zoneCount",
            player: "self",
            zone: "deck",
            comparison: "gte",
            value: 3,
          },
        ],
        actions: [
          {
            action: "trashFromDeck",
            player: "self",
            amount: 3,
          },
          {
            action: "modifyCost",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            value: -1,
            duration: "thisTurn",
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op15eb04Alpha042I18n,
};
