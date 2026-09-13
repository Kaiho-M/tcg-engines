import type { CharacterCard } from "@tcg/op-types";
import { st04Ginrummy009I18n } from "./009-ginrummy.i18n.ts";

export const st04Ginrummy009: CharacterCard = {
  id: "ST04-009",
  canonicalId: "ST04-009",
  slug: "ginrummy/st04-009",
  name: "Ginrummy",
  printings: [
    {
      id: "ST04-009",
      artId: "ST04-009",
      setCode: "ST04",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST04-009.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "ST04",
  cost: 1,
  power: 3000,
  counter: 1000,
  traits: ["Animal Kingdom Pirates", "Smile"],
  attribute: "strike",
  i18n: st04Ginrummy009I18n,
};
