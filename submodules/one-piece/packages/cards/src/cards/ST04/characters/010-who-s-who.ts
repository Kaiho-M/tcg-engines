import type { CharacterCard } from "@tcg/op-types";
import { st04WhoSWho010I18n } from "./010-who-s-who.i18n.ts";

export const st04WhoSWho010: CharacterCard = {
  id: "ST04-010",
  canonicalId: "ST04-010",
  slug: "who-s-who/st04-010",
  name: "Who's.Who",
  printings: [
    {
      id: "ST04-010",
      artId: "ST04-010",
      setCode: "ST04",
      collectorNumber: "010",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST04-010.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "ST04",
  cost: 3,
  power: 3000,
  trigger: "Play this card.",
  traits: ["Animal Kingdom Pirates"],
  attribute: "slash",
  effect:
    "[On Play] DON!! −1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): K.O. up to 1 of your opponent's Characters with a cost of 3 or less.",
  effects: {
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
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 3,
                },
              ],
            },
          },
        ],
        optional: true,
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
    ],
  },
  i18n: st04WhoSWho010I18n,
};
