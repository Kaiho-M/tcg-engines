import type { CharacterCard } from "@tcg/op-types";
import { st07Pekoms014I18n } from "./014-pekoms.i18n.ts";

export const st07Pekoms014: CharacterCard = {
  id: "ST07-014",
  canonicalId: "ST07-014",
  slug: "pekoms/st07-014",
  name: "Pekoms",
  printings: [
    {
      id: "ST07-014",
      artId: "ST07-014",
      setCode: "ST07",
      collectorNumber: "014",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST07-014.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST07",
  cost: 3,
  power: 5000,
  counter: 1000,
  traits: ["Minks", "Big Mom Pirates"],
  attribute: "strike",
  i18n: st07Pekoms014I18n,
};
