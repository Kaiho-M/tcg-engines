import type { CharacterCard } from "@tcg/op-types";
import { st09Yamato013I18n } from "./013-yamato.i18n.ts";

export const st09Yamato013: CharacterCard = {
  id: "ST09-013",
  canonicalId: "ST09-013",
  slug: "yamato/st09-013",
  name: "Yamato",
  printings: [
    {
      id: "ST09-013",
      artId: "ST09-013",
      setCode: "ST09",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST09-013.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST09",
  cost: 5,
  power: 7000,
  counter: 1000,
  traits: ["Land of Wano"],
  attribute: "special",
  i18n: st09Yamato013I18n,
};
