import type { CharacterCard } from "@tcg/op-types";
import { op17Sasaki068I18n } from "./068-sasaki.i18n.ts";

export const op17Sasaki068: CharacterCard = {
  id: "OP17-068",
  canonicalId: "OP17-068",
  slug: "sasaki/op17-068",
  name: "Sasaki",
  printings: [
    {
      id: "OP17-068",
      artId: "OP17-068",
      setCode: "OP17",
      collectorNumber: "068",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-068.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP17",
  cost: 3,
  power: 4000,
  counter: 2000,
  traits: ["Animal Kingdom Pirates"],
  attribute: "slash",
  effect:
    "[When Attacking] You may trash 2 cards from your hand: If your Leader has the {Animal Kingdom Pirates} type, add up to 2 DON!! cards as rested from your DON!! deck.",
  i18n: op17Sasaki068I18n,
};
