import type { CharacterCard } from "@tcg/op-types";
import { op17Buggy084I18n } from "./084-buggy.i18n.ts";

export const op17Buggy084: CharacterCard = {
  id: "P-084",
  canonicalId: "P-084",
  slug: "buggy/p-084",
  name: "Buggy",
  printings: [
    {
      id: "P-084",
      artId: "P-084_p1",
      setCode: "OP17",
      collectorNumber: "084",
      rarity: "P",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/P-084_p1.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "P",
  setId: "OP17",
  cost: 7,
  power: 8000,
  effect:
    'This Character cannot attack.If your Leader is [Buggy], all Characters with a cost of 3 or 4 cannot attack.[On Play] Play up to 1 "Cross Guild" type Character card with a cost of 6 or less from your hand.DISCLAIMER: This card is a reprint of the pre-existing card in the OP09 set. The main difference between this card and the original print is the exclusion of "NOT FOR SALE" on the right side, by the copyright information, and the missing gold winner stamp.',
  i18n: op17Buggy084I18n,
};
