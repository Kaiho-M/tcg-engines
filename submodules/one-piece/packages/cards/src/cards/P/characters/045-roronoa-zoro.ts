import type { CharacterCard } from "@tcg/op-types";
import { pRoronoaZoro045I18n } from "./045-roronoa-zoro.i18n.ts";

export const pRoronoaZoro045: CharacterCard = {
  id: "P-045",
  canonicalId: "P-045",
  slug: "roronoa-zoro/p-045",
  name: "Roronoa Zoro",
  printings: [
    {
      id: "P-045",
      artId: "P-045",
      setCode: "P",
      collectorNumber: "045",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-045.png",
    },
    {
      id: "P-045_p1",
      artId: "P-045_p1",
      setCode: "P",
      collectorNumber: "045",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-045_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "P",
  setId: "P",
  cost: 6,
  power: 7000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-045_p1.png",
      imageId: "P-045_p1",
    },
  ],
  effect:
    "[Banish] (When this card deals damage, the target card is trashed without activating its Trigger.)",
  effects: {
    keywords: ["banish"],
  },
  i18n: pRoronoaZoro045I18n,
};
