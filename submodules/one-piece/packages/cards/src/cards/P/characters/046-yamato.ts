import type { CharacterCard } from "@tcg/op-types";
import { pYamato046I18n } from "./046-yamato.i18n.ts";

export const pYamato046: CharacterCard = {
  id: "P-046",
  canonicalId: "P-046",
  slug: "yamato/p-046",
  name: "Yamato",
  printings: [
    {
      id: "P-046",
      artId: "P-046",
      setCode: "P",
      collectorNumber: "046",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-046.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "P",
  setId: "P",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Land of Wano"],
  attribute: "strike",
  effect:
    "[On Play] You may place all cards in your hand at the bottom of your deck in any order. If you do, draw cards equal to the number you placed at the bottom of your deck.",
  i18n: pYamato046I18n,
};
