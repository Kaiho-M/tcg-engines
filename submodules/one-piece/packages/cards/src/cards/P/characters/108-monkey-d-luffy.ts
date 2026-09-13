import type { CharacterCard } from "@tcg/op-types";
import { pMonkeyDLuffy108I18n } from "./108-monkey-d-luffy.i18n.ts";

export const pMonkeyDLuffy108: CharacterCard = {
  id: "P-108",
  canonicalId: "P-108",
  slug: "monkey-d-luffy/p-108",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "P-108",
      artId: "P-108",
      setCode: "P",
      collectorNumber: "108",
      rarity: "P",
      imageUrl: "https://www.onepiece-cardgame.com/images/cardlist/card/P-108.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "P",
  setId: "P",
  cost: 3,
  power: 2000,
  counter: 1000,
  traits: ["Supernovas", "Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On K.O.] Set up to 2 of your DON!! cards as active.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["costArea"],
              count: {
                amount: 2,
                upTo: true,
              },
            },
          },
        ],
      },
    ],
  },
  i18n: pMonkeyDLuffy108I18n,
};
