import type { CharacterCard } from "@tcg/op-types";
import { op17Nami023I18n } from "./023-nami.i18n.ts";

export const op17Nami023: CharacterCard = {
  id: "OP17-023",
  canonicalId: "OP17-023",
  slug: "nami/op17-023",
  name: "Nami",
  printings: [
    {
      id: "OP17-023",
      artId: "OP17-023",
      setCode: "OP17",
      collectorNumber: "023",
      rarity: "UC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-023_LyVnUXp.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP17",
  cost: 1,
  power: 1000,
  counter: 2000,
  traits: ["East Blue Straw Hat Crew"],
  attribute: "wisdom",
  effect:
    "If one of your {East Blue} or {Straw Hat Crew} type Characters would be K.O.'d, you may rest this Character instead.",
  i18n: op17Nami023I18n,
};
