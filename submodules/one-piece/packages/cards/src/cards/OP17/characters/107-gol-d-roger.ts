import type { CharacterCard } from "@tcg/op-types";
import { op17GolDRoger107I18n } from "./107-gol-d-roger.i18n.ts";

export const op17GolDRoger107: CharacterCard = {
  id: "P-107",
  canonicalId: "P-107",
  slug: "gol-d-roger/p-107",
  name: "Gol.D.Roger",
  printings: [
    {
      id: "P-107",
      artId: "P-107_p1",
      setCode: "OP17",
      collectorNumber: "107",
      rarity: "P",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/P-107_p1.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "P",
  setId: "OP17",
  cost: 8,
  power: 10000,
  traits: ["Roger Pirates King of the Pirates"],
  attribute: "slash",
  effect:
    "[On Play] If either you or your opponent has 10 DON!! cards on the field, your Leader gains +2000 power until the end of your opponent's next End Phase.",
  i18n: op17GolDRoger107I18n,
};
