import type { CharacterCard } from "@tcg/op-types";
import { st21Vegapunk013I18n } from "./013-vegapunk.i18n.ts";

export const st21Vegapunk013: CharacterCard = {
  id: "ST21-013",
  canonicalId: "ST21-013",
  slug: "vegapunk/st21-013",
  name: "Vegapunk",
  printings: [
    {
      id: "ST21-013",
      artId: "ST21-013",
      setCode: "ST21",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-013.png",
    },
    {
      id: "ST21-013_p1",
      artId: "ST21-013_p1",
      setCode: "ST21",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-013_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 1,
  power: 3000,
  counter: 1000,
  traits: ["Scientist", "Egghead"],
  attribute: "wisdom",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-013_p1.png",
      imageId: "ST21-013_p1",
    },
  ],
  i18n: st21Vegapunk013I18n,
};
