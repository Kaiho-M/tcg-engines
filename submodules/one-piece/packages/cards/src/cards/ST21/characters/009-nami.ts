import type { CharacterCard } from "@tcg/op-types";
import { st21Nami009I18n } from "./009-nami.i18n.ts";

export const st21Nami009: CharacterCard = {
  id: "ST21-009",
  canonicalId: "ST21-009",
  slug: "nami/st21-009",
  name: "Nami",
  printings: [
    {
      id: "ST21-009",
      artId: "ST21-009",
      setCode: "ST21",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-009.png",
    },
    {
      id: "ST21-009_p1",
      artId: "ST21-009_p1",
      setCode: "ST21",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-009_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 3,
  power: 1000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-009_p1.png",
      imageId: "ST21-009_p1",
    },
  ],
  effect:
    "[Activate: Main] [Once Per Turn] Give up to 2 rested DON!! cards to 1 of your {Straw Hat Crew} type Leader or Character cards.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        actions: [
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: ["leader", "character"],
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
            count: {
              amount: 2,
              upTo: true,
            },
            donState: "rested",
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: st21Nami009I18n,
};
