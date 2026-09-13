import type { CharacterCard } from "@tcg/op-types";
import { st12ElephantTrueBluefin009I18n } from "./009-elephant-true-bluefin.i18n.ts";

export const st12ElephantTrueBluefin009: CharacterCard = {
  id: "ST12-009",
  canonicalId: "ST12-009",
  slug: "elephant-true-bluefin",
  name: "Elephant True Bluefin",
  printings: [
    {
      id: "ST12-009",
      artId: "ST12-009",
      setCode: "ST12",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST12-009.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST12",
  cost: 1,
  power: 3000,
  counter: 1000,
  traits: ["Animal"],
  attribute: "strike",
  i18n: st12ElephantTrueBluefin009I18n,
};
