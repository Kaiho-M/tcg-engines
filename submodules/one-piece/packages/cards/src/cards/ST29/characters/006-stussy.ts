import type { CharacterCard } from "@tcg/op-types";
import { st29Stussy006I18n } from "./006-stussy.i18n.ts";

export const st29Stussy006: CharacterCard = {
  id: "ST29-006",
  canonicalId: "ST29-006",
  slug: "stussy/st29-006",
  name: "Stussy",
  printings: [
    {
      id: "ST29-006",
      artId: "ST29-006",
      setCode: "ST29",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-006.png",
    },
    {
      id: "ST29-006_p1",
      artId: "ST29-006_p1",
      setCode: "ST29",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-006_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST29",
  cost: 6,
  power: 7000,
  counter: 2000,
  traits: ["Egghead"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-006_p1.png",
      imageId: "ST29-006_p1",
    },
  ],
  i18n: st29Stussy006I18n,
};
