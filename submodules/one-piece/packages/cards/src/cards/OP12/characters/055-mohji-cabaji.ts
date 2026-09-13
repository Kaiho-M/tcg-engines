import type { CharacterCard } from "@tcg/op-types";
import { op12MohjiCabaji055I18n } from "./055-mohji-cabaji.i18n.ts";

export const op12MohjiCabaji055: CharacterCard = {
  id: "OP12-055",
  canonicalId: "OP12-055",
  slug: "mohji-cabaji/op12-055",
  name: "Mohji & Cabaji",
  printings: [
    {
      id: "OP12-055",
      artId: "OP12-055",
      setCode: "OP12",
      collectorNumber: "055",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP12-055.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP12",
  cost: 5,
  power: 6000,
  counter: 2000,
  traits: ["Cross Guild"],
  attribute: ["slash", "wisdom"],
  i18n: op12MohjiCabaji055I18n,
};
