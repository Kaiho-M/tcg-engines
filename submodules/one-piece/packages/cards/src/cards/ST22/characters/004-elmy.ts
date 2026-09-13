import type { CharacterCard } from "@tcg/op-types";
import { st22Elmy004I18n } from "./004-elmy.i18n.ts";

export const st22Elmy004: CharacterCard = {
  id: "ST22-004",
  canonicalId: "ST22-004",
  slug: "elmy",
  name: "Elmy",
  printings: [
    {
      id: "ST22-004",
      artId: "ST22-004",
      setCode: "ST22",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-004.png",
    },
    {
      id: "ST22-004_p1",
      artId: "ST22-004_p1",
      setCode: "ST22",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-004_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST22",
  cost: 3,
  power: 5000,
  counter: 1000,
  traits: ["Whitebeard Pirates Allies"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-004_p1.png",
      imageId: "ST22-004_p1",
    },
  ],
  i18n: st22Elmy004I18n,
};
