import type { CharacterCard } from "@tcg/op-types";
import { st22Vista009I18n } from "./009-vista.i18n.ts";

export const st22Vista009: CharacterCard = {
  id: "ST22-009",
  canonicalId: "ST22-009",
  slug: "vista/st22-009",
  name: "Vista",
  printings: [
    {
      id: "ST22-009",
      artId: "ST22-009",
      setCode: "ST22",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-009.png",
    },
    {
      id: "ST22-009_p1",
      artId: "ST22-009_p1",
      setCode: "ST22",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-009_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST22",
  cost: 1,
  power: 1000,
  traits: ["Whitebeard Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-009_p1.png",
      imageId: "ST22-009_p1",
    },
  ],
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",
  effects: {
    keywords: ["blocker"],
  },
  i18n: st22Vista009I18n,
};
