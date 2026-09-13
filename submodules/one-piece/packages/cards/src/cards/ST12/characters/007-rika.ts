import type { CharacterCard } from "@tcg/op-types";
import { st12Rika007I18n } from "./007-rika.i18n.ts";

export const st12Rika007: CharacterCard = {
  id: "ST12-007",
  canonicalId: "ST12-007",
  slug: "rika",
  name: "Rika",
  printings: [
    {
      id: "ST12-007",
      artId: "ST12-007",
      setCode: "ST12",
      collectorNumber: "007",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST12-007.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "ST12",
  cost: 2,
  counter: 2000,
  traits: ["East Blue"],
  attribute: "wisdom",
  effect:
    "[On Play] ➁ (You may rest the specified number of DON!! cards in your cost area.): If your opponent has 3 or more Life cards, set up to 1 of your <Slash> attribute Characters with a cost of 4 or less as active.",
  i18n: st12Rika007I18n,
};
