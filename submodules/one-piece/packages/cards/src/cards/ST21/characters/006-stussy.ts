import type { CharacterCard } from "@tcg/op-types";
import { st21Stussy006I18n } from "./006-stussy.i18n.ts";

export const st21Stussy006: CharacterCard = {
  id: "ST21-006",
  canonicalId: "ST21-006",
  slug: "stussy/st21-006",
  name: "Stussy",
  printings: [
    {
      id: "ST21-006",
      artId: "ST21-006",
      setCode: "ST21",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-006.png",
    },
    {
      id: "ST21-006_p1",
      artId: "ST21-006_p1",
      setCode: "ST21",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-006_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 3,
  power: 5000,
  counter: 1000,
  traits: ["Egghead"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-006_p1.png",
      imageId: "ST21-006_p1",
    },
  ],
  i18n: st21Stussy006I18n,
};
