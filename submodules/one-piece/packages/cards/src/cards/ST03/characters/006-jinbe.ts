import type { CharacterCard } from "@tcg/op-types";
import { st03Jinbe006I18n } from "./006-jinbe.i18n.ts";

export const st03Jinbe006: CharacterCard = {
  id: "ST03-006",
  canonicalId: "ST03-006",
  slug: "jinbe/st03-006",
  name: "Jinbe",
  printings: [
    {
      id: "ST03-006",
      artId: "ST03-006",
      setCode: "ST03",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-006.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 2,
  power: 4000,
  counter: 1000,
  traits: ["Fish-Man", "The Seven Warlords of the Sea", "The Sun Pirates"],
  attribute: "strike",
  i18n: st03Jinbe006I18n,
};
