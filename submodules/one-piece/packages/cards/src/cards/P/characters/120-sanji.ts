import type { CharacterCard } from "@tcg/op-types";
import { pSanji120I18n } from "./120-sanji.i18n.ts";

export const pSanji120: CharacterCard = {
  id: "P-120",
  canonicalId: "P-120",
  slug: "sanji/p-120",
  name: "Sanji",
  printings: [
    {
      id: "P-120",
      artId: "P-120",
      setCode: "P",
      collectorNumber: "120",
      rarity: "P",
      imageUrl: "https://www.onepiece-cardgame.com/images/cardlist/card/P-120.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "P",
  setId: "P",
  cost: 6,
  power: 6000,
  counter: 2000,
  traits: ["Sky Island", "Straw Hat Crew"],
  attribute: "strike",
  effect:
    "If a card was removed from your opponent's Life cards during this turn, give this card in your hand −2 cost.",
  i18n: pSanji120I18n,
};
