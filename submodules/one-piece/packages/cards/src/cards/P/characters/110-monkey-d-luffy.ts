import type { CharacterCard } from "@tcg/op-types";
import { pMonkeyDLuffy110I18n } from "./110-monkey-d-luffy.i18n.ts";

export const pMonkeyDLuffy110: CharacterCard = {
  id: "P-110",
  canonicalId: "P-110",
  slug: "monkey-d-luffy/p-110",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "P-110",
      artId: "P-110",
      setCode: "P",
      collectorNumber: "110",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-110.png",
    },
    {
      id: "P-110_p1",
      artId: "P-110_p1",
      setCode: "P",
      collectorNumber: "110",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-110_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "P",
  setId: "P",
  cost: 7,
  power: 9000,
  counter: 1000,
  traits: ["Elbaph", "The Four Emperors", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-110_p1.png",
      imageId: "P-110_p1",
    },
  ],
  i18n: pMonkeyDLuffy110I18n,
};
