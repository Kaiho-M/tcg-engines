import type { CharacterCard } from "@tcg/op-types";
import { op15eb04CaptainSeamars062I18n } from "./062-captain-seamars.i18n.ts";

export const op15eb04CaptainSeamars062: CharacterCard = {
  id: "OP15-062",
  canonicalId: "OP15-062",
  slug: "captain-seamars",
  name: "Captain Seamars",
  printings: [
    {
      id: "OP15-062",
      artId: "OP15-062",
      setCode: "OP15EB04",
      collectorNumber: "062",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-062.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "UC",
  setId: "OP15EB04",
  cost: 5,
  power: 6000,
  counter: 2000,
  traits: ["The Moon", "Space Pirates"],
  attribute: "slash",
  i18n: op15eb04CaptainSeamars062I18n,
};
