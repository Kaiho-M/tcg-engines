import type { CharacterCard } from "@tcg/op-types";
import { op17Nami023I18n } from "./023-nami.i18n.ts";

export const op17Nami023: CharacterCard = {
  id: "OP17-023",
  canonicalId: "OP17-023",
  slug: "nami/op17-023",
  name: "Nami",
  printings: [
    {
      id: "OP17-023",
      artId: "OP17-023",
      setCode: "OP17",
      collectorNumber: "023",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-023.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP17",
  cost: 1,
  power: 1000,
  counter: 2000,
  traits: ["East Blue", "Straw Hat Crew"],
  attribute: "wisdom",
  effect:
    "If one of your {East Blue} or {Straw Hat Crew} type Characters would be K.O.'d, you may rest this Character instead.",
  effects: {
    replacementEffects: [
      {
        replacedEvent: "ko",
        target: {
          player: "self",
          zones: ["character"],
          count: {
            amount: 1,
          },
          filters: [
            {
              filter: "anyOf",
              filters: [
                {
                  filter: "trait",
                  value: "East Blue",
                  match: "includes",
                },
                {
                  filter: "trait",
                  value: "Straw Hat Crew",
                  match: "includes",
                },
              ],
            },
          ],
        },
        replacementAction: {
          action: "rest",
          target: {
            player: "self",
            zones: ["character"],
            count: {
              amount: 1,
            },
            self: true,
          },
        },
      },
    ],
  },
  i18n: op17Nami023I18n,
};
