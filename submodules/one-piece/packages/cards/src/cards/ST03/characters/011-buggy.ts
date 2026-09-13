import type { CharacterCard } from "@tcg/op-types";
import { st03Buggy011I18n } from "./011-buggy.i18n.ts";

export const st03Buggy011: CharacterCard = {
  id: "ST03-011",
  canonicalId: "ST03-011",
  slug: "buggy/st03-011",
  name: "Buggy",
  printings: [
    {
      id: "ST03-011",
      artId: "ST03-011",
      setCode: "ST03",
      collectorNumber: "011",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-011.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 1,
  power: 3000,
  counter: 1000,
  traits: ["The Seven Warlords of the Sea", "Buggy's Delivery"],
  attribute: "slash",
  i18n: st03Buggy011I18n,
};
