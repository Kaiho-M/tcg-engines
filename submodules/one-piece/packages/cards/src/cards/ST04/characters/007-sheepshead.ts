import type { CharacterCard } from "@tcg/op-types";
import { st04Sheepshead007I18n } from "./007-sheepshead.i18n.ts";

export const st04Sheepshead007: CharacterCard = {
  id: "ST04-007",
  canonicalId: "ST04-007",
  slug: "sheepshead/st04-007",
  name: "Sheepshead",
  printings: [
    {
      id: "ST04-007",
      artId: "ST04-007",
      setCode: "ST04",
      collectorNumber: "007",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST04-007.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "ST04",
  cost: 2,
  power: 4000,
  counter: 1000,
  traits: ["Animal Kingdom Pirates", "Smile"],
  attribute: "slash",
  i18n: st04Sheepshead007I18n,
};
