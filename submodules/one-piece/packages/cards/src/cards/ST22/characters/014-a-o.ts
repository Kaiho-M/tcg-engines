import type { CharacterCard } from "@tcg/op-types";
import { st22AO014I18n } from "./014-a-o.i18n.ts";

export const st22AO014: CharacterCard = {
  id: "ST22-014",
  canonicalId: "ST22-014",
  slug: "a-o",
  name: "A.O.",
  printings: [
    {
      id: "ST22-014",
      artId: "ST22-014",
      setCode: "ST22",
      collectorNumber: "014",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-014.png",
    },
    {
      id: "ST22-014_p1",
      artId: "ST22-014_p1",
      setCode: "ST22",
      collectorNumber: "014",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-014_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST22",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["Whitebeard Pirates Allies"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-014_p1.png",
      imageId: "ST22-014_p1",
    },
  ],
  i18n: st22AO014I18n,
};
