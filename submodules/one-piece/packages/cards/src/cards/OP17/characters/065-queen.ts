import type { CharacterCard } from "@tcg/op-types";
import { op17Queen065I18n } from "./065-queen.i18n.ts";

export const op17Queen065: CharacterCard = {
  id: "OP17-065",
  canonicalId: "OP17-065",
  slug: "queen/op17-065",
  name: "Queen",
  printings: [
    {
      id: "OP17-065",
      artId: "OP17-065",
      setCode: "OP17",
      collectorNumber: "065",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-065.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "UC",
  setId: "OP17",
  cost: 9,
  power: 10000,
  traits: ["Animal Kingdom Pirates"],
  attribute: "strike",
  effect:
    "[Banish]\n[On Play] DON!! −1: Draw 1 card, and up to 2 of your opponent's Characters with a cost of 5 or less cannot attack until the end of your opponent's next End Phase.",
  effects: {
    keywords: ["banish"],
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
          {
            action: "cannotAttack",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 2,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 5,
                },
              ],
            },
            duration: "untilEndOfOpponentNextEndPhase",
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op17Queen065I18n,
};
