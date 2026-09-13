import type { CharacterCard } from "@tcg/op-types";
import { st03Pacifista012I18n } from "./012-pacifista.i18n.ts";

export const st03Pacifista012: CharacterCard = {
  id: "ST03-012",
  canonicalId: "ST03-012",
  slug: "pacifista/st03-012",
  name: "Pacifista",
  printings: [
    {
      id: "ST03-012",
      artId: "ST03-012",
      setCode: "ST03",
      collectorNumber: "012",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-012.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["Biological Weapon", "Navy"],
  attribute: "special",
  i18n: st03Pacifista012I18n,
};
