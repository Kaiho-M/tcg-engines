import type { CharacterCard } from "@tcg/op-types";
import { st03EdwardWeevil002I18n } from "./002-edward-weevil.i18n.ts";

export const st03EdwardWeevil002: CharacterCard = {
  id: "ST03-002",
  canonicalId: "ST03-002",
  slug: "edward-weevil/st03-002",
  name: "Edward Weevil",
  printings: [
    {
      id: "ST03-002",
      artId: "ST03-002",
      setCode: "ST03",
      collectorNumber: "002",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-002.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 3,
  power: 5000,
  counter: 1000,
  traits: ["The Seven Warlords of the Sea"],
  attribute: "slash",
  i18n: st03EdwardWeevil002I18n,
};
