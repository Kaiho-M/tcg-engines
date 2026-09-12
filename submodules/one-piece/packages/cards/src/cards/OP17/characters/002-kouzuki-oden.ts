import type { CharacterCard } from "@tcg/op-types";
import { op17KouzukiOden002I18n } from "./002-kouzuki-oden.i18n.ts";

export const op17KouzukiOden002: CharacterCard = {
  id: "ST32-002",
  canonicalId: "ST32-002",
  slug: "kouzuki-oden/st32-002",
  name: "Kouzuki Oden",
  printings: [
    {
      id: "ST32-002",
      artId: "ST32-002_p1",
      setCode: "OP17",
      collectorNumber: "002",
      rarity: "SP",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST32-002_p1.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SP",
  setId: "OP17",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Land of Wano", "Kouzuki Clan"],
  attribute: "slash",
  effect:
    "[On Play] Draw 1 card, and up to 1 of your opponent's Characters with a base cost of 6 or less cannot be rested until the end of your opponent's next End Phase.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
          {
            action: "cannotBeRested",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            duration: "untilEndOfOpponentNextEndPhase",
          },
        ],
      },
    ],
  },
  i18n: op17KouzukiOden002I18n,
};
