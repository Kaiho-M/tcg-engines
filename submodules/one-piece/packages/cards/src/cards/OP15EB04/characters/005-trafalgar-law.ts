import type { CharacterCard } from "@tcg/op-types";
import { op15eb04TrafalgarLaw005I18n } from "./005-trafalgar-law.i18n.ts";

export const op15eb04TrafalgarLaw005: CharacterCard = {
  id: "EB04-005",
  canonicalId: "EB04-005",
  slug: "trafalgar-law/eb04-005",
  name: "Trafalgar Law",
  printings: [
    {
      id: "EB04-005",
      artId: "EB04-005",
      setCode: "OP15EB04",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-005_3PAWn8I.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 3,
  power: 5000,
  counter: 2000,
  traits: ["Heart Pirates Supernovas The Seven Warlords of the Sea"],
  attribute: "slash",
  effect:
    "This Character cannot attack unless your opponent has 2 or more Characters with a base power of 5000 or more.",
  i18n: op15eb04TrafalgarLaw005I18n,
};
