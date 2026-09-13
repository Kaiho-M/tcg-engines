import type { CharacterCard } from "@tcg/op-types";
import { op08Chessmarimo006I18n } from "./006-chessmarimo.i18n.ts";

export const op08Chessmarimo006: CharacterCard = {
  id: "OP08-006",
  canonicalId: "OP08-006",
  slug: "chessmarimo",
  name: "Chessmarimo",
  printings: [
    {
      id: "OP08-006",
      artId: "OP08-006",
      setCode: "OP08",
      collectorNumber: "006",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP08-006.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "UC",
  setId: "OP08",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Drum Kingdom"],
  attribute: ["strike", "ranged"],
  effect:
    "[Your Turn] If you have [Kuromarimo] and [Chess] in your trash, this Character gains +2000 power.",
  i18n: op08Chessmarimo006I18n,
};
