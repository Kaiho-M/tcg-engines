import type { CharacterCard } from "@tcg/op-types";
import { pNicoRobin111I18n } from "./111-nico-robin.i18n.ts";

export const pNicoRobin111: CharacterCard = {
  id: "P-111",
  canonicalId: "P-111",
  slug: "nico-robin/p-111",
  name: "Nico Robin",
  printings: [
    {
      id: "P-111",
      artId: "P-111",
      setCode: "P",
      collectorNumber: "111",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-111.png",
    },
    {
      id: "P-111_p1",
      artId: "P-111_p1",
      setCode: "P",
      collectorNumber: "111",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-111_p1.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "P",
  setId: "P",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-111_p1.png",
      imageId: "P-111_p1",
    },
  ],
  effect:
    "[Once Per Turn] If your {Straw Hat Crew} type Character would be removed from the field by your opponent's effect, you may rest 1 of your DON!! cards instead.",
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
              value: "Straw Hat Crew",
              match: "includes",
            },
          ],
        },
        source: "opponentEffect",
        replacementAction: {
          action: "rest",
          target: {
            player: "self",
            zones: ["costArea"],
            count: {
              amount: 1,
            },
          },
        },
        oncePerTurn: true,
      },
    ],
  },
  i18n: pNicoRobin111I18n,
};
