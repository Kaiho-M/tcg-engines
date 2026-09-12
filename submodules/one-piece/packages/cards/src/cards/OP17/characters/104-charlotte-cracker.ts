import type { CharacterCard } from "@tcg/op-types";
import { op17CharlotteCracker104I18n } from "./104-charlotte-cracker.i18n.ts";

export const op17CharlotteCracker104: CharacterCard = {
  id: "OP17-104",
  canonicalId: "OP17-104",
  slug: "charlotte-cracker/op17-104",
  name: "Charlotte Cracker",
  printings: [
    {
      id: "OP17-104",
      artId: "OP17-104",
      setCode: "OP17",
      collectorNumber: "104",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-104.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "UC",
  setId: "OP17",
  cost: 3,
  power: 4000,
  counter: 1000,
  trigger: "Play this card.",
  traits: ["Big Mom Pirates"],
  attribute: "slash",
  effect:
    "[Your Turn] [On Play] You may rest 2 of your DON!! cards: If your Leader has the {Big Mom Pirates} type, add up to 1 card from the top of your deck to the top of your Life cards.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "turn",
            value: "your",
          },
        ],
        costs: [
          {
            cost: "restDon",
            amount: 2,
          },
        ],
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: ["deck"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            position: "top",
            condition: {
              condition: "leaderTrait",
              trait: "Big Mom Pirates",
              match: "includes",
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
  i18n: op17CharlotteCracker104I18n,
};
