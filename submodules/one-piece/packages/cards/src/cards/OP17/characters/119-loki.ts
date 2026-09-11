import type { CharacterCard } from "@tcg/op-types";
import { op17Loki119I18n } from "./119-loki.i18n.ts";

export const op17Loki119: CharacterCard = {
  id: "OP17-119",
  canonicalId: "OP17-119",
  slug: "loki",
  name: "Loki",
  printings: [
    {
      id: "OP17-119",
      artId: "OP17-119",
      setCode: "OP17",
      collectorNumber: "119",
      rarity: "SEC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-119_UhxVfTG.jpg",
    },
    {
      id: "OP17-119_p1",
      artId: "OP17-119_p1",
      setCode: "OP17",
      collectorNumber: "119",
      rarity: "SEC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-119_p1_leUYdJN.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SEC",
  setId: "OP17",
  cost: 6,
  power: 8000,
  traits: ["Giant Elbaph"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-119_p1_leUYdJN.jpg",
      imageId: "OP17-119_p1",
    },
  ],
  effect:
    "This Character gains +12 cost, and if it is your opponent's turn, this Character gains +3000 power.\n[On Play] K.O. your opponent's Characters with a total cost of 4 or less.",
  i18n: op17Loki119I18n,
};
