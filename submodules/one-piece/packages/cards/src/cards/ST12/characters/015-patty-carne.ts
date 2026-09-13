import type { CharacterCard } from "@tcg/op-types";
import { st12PattyCarne015I18n } from "./015-patty-carne.i18n.ts";

export const st12PattyCarne015: CharacterCard = {
  id: "ST12-015",
  canonicalId: "ST12-015",
  slug: "patty-carne",
  name: "Patty & Carne",
  printings: [
    {
      id: "ST12-015",
      artId: "ST12-015",
      setCode: "ST12",
      collectorNumber: "015",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST12-015.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST12",
  cost: 2,
  power: 4000,
  counter: 1000,
  traits: ["East Blue"],
  attribute: "slash",
  i18n: st12PattyCarne015I18n,
};
