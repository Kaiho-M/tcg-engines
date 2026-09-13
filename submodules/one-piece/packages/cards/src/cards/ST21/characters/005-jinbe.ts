import type { CharacterCard } from "@tcg/op-types";
import { st21Jinbe005I18n } from "./005-jinbe.i18n.ts";

export const st21Jinbe005: CharacterCard = {
  id: "ST21-005",
  canonicalId: "ST21-005",
  slug: "jinbe/st21-005",
  name: "Jinbe",
  printings: [
    {
      id: "ST21-005",
      artId: "ST21-005",
      setCode: "ST21",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-005.png",
    },
    {
      id: "ST21-005_p1",
      artId: "ST21-005_p1",
      setCode: "ST21",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-005_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 2,
  power: 4000,
  counter: 1000,
  traits: ["Fish-Man", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-005_p1.png",
      imageId: "ST21-005_p1",
    },
  ],
  i18n: st21Jinbe005I18n,
};
