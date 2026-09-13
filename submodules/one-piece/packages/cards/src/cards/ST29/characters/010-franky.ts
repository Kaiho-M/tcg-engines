import type { CharacterCard } from "@tcg/op-types";
import { st29Franky010I18n } from "./010-franky.i18n.ts";

export const st29Franky010: CharacterCard = {
  id: "ST29-010",
  canonicalId: "ST29-010",
  slug: "franky/st29-010",
  name: "Franky",
  printings: [
    {
      id: "ST29-010",
      artId: "ST29-010",
      setCode: "ST29",
      collectorNumber: "010",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-010.png",
    },
    {
      id: "ST29-010_p1",
      artId: "ST29-010_p1",
      setCode: "ST29",
      collectorNumber: "010",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-010_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST29",
  cost: 5,
  power: 6000,
  counter: 2000,
  traits: ["Egghead", "Straw Hat Crew"],
  attribute: "ranged",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-010_p1.png",
      imageId: "ST29-010_p1",
    },
  ],
  i18n: st29Franky010I18n,
};
