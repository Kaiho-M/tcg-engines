import type { CharacterCard } from "@tcg/op-types";
import { pKouzukiMomonosuke064I18n } from "./064-kouzuki-momonosuke.i18n.ts";

export const pKouzukiMomonosuke064: CharacterCard = {
  id: "P-064",
  canonicalId: "P-064",
  slug: "kouzuki-momonosuke/p-064",
  name: "Kouzuki Momonosuke",
  printings: [
    {
      id: "P-064",
      artId: "P-064",
      setCode: "P",
      collectorNumber: "064",
      rarity: "P",
      imageUrl: "https://www.onepiece-cardgame.com/images/cardlist/card/P-064.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "P",
  setId: "P",
  cost: 6,
  power: 8000,
  counter: 1000,
  traits: ["Land of Wano", "Kouzuki Clan"],
  attribute: "special",
  i18n: pKouzukiMomonosuke064I18n,
};
