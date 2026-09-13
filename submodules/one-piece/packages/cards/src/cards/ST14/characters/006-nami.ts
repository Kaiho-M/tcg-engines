import type { CharacterCard } from "@tcg/op-types";
import { st14Nami006I18n } from "./006-nami.i18n.ts";

export const st14Nami006: CharacterCard = {
  id: "ST14-006",
  canonicalId: "ST14-006",
  slug: "nami/st14-006",
  name: "Nami",
  printings: [
    {
      id: "ST14-006",
      artId: "ST14-006",
      setCode: "ST14",
      collectorNumber: "006",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST14-006.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "ST14",
  cost: 3,
  power: 2000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "special",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] If you have 6 or less cards in your hand and a Character with a cost of 8 or more, draw 1 card.",
  effects: {
    keywords: ["blocker"],
  },
  i18n: st14Nami006I18n,
};
