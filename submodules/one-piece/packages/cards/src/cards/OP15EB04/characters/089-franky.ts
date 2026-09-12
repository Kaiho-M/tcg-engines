import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Franky089I18n } from "./089-franky.i18n.ts";

export const op15eb04Franky089: CharacterCard = {
  id: "OP15-089",
  canonicalId: "OP15-089",
  slug: "franky/op15-089",
  name: "Franky",
  printings: [
    {
      id: "OP15-089",
      artId: "OP15-089",
      setCode: "OP15EB04",
      collectorNumber: "089",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-089.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "UC",
  setId: "OP15EB04",
  cost: 5,
  power: 6000,
  counter: 2000,
  traits: ["Straw Hat Crew"],
  attribute: "strike",
  i18n: op15eb04Franky089I18n,
};
