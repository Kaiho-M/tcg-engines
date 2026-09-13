import type { CharacterCard } from "@tcg/op-types";
import { st09Ulti003I18n } from "./003-ulti.i18n.ts";

export const st09Ulti003: CharacterCard = {
  id: "ST09-003",
  canonicalId: "ST09-003",
  slug: "ulti/st09-003",
  name: "Ulti",
  printings: [
    {
      id: "ST09-003",
      artId: "ST09-003",
      setCode: "ST09",
      collectorNumber: "003",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST09-003.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST09",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["Animal Kingdom Pirates"],
  attribute: "strike",
  i18n: st09Ulti003I18n,
};
