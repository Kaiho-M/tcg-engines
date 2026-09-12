import type { CharacterCard } from "@tcg/op-types";
import { op17CroneOli021I18n } from "./021-crone-oli.i18n.ts";

export const op17CroneOli021: CharacterCard = {
  id: "OP17-021",
  canonicalId: "OP17-021",
  slug: "crone-oli",
  name: "Crone Oli",
  printings: [
    {
      id: "OP17-021",
      artId: "OP17-021",
      setCode: "OP17",
      collectorNumber: "021",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-021.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP17",
  cost: 1,
  counter: 2000,
  traits: ["Red-Haired Pirates Allies"],
  attribute: "slash",
  effect:
    'If your Character with a type including "Red-Haired Pirates" would be removed from the field by your opponent\'s effect, you may rest 1 of your cards instead.',
  effects: {
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        target: {
          player: "self",
          zones: ["character"],
          count: {
            amount: 1,
          },
          filters: [
            {
              filter: "trait",
              value: "Red-Haired Pirates",
              match: "includes",
            },
          ],
        },
        source: "opponentEffect",
        replacementAction: {
          action: "rest",
          target: {
            player: "self",
            zones: ["leader", "character", "stage", "costArea"],
            count: {
              amount: 1,
            },
          },
        },
      },
    ],
  },
  i18n: op17CroneOli021I18n,
};
