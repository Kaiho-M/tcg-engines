import type { CharacterCard } from "@tcg/op-types";
import { pShanks104I18n } from "./104-shanks.i18n.ts";

export const pShanks104: CharacterCard = {
  id: "P-104",
  canonicalId: "P-104",
  slug: "shanks/p-104",
  name: "Shanks",
  printings: [
    {
      id: "P-104",
      artId: "P-104",
      setCode: "P",
      collectorNumber: "104",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-104.png",
    },
    {
      id: "P-104_p1",
      artId: "P-104_p1",
      setCode: "P",
      collectorNumber: "104",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-104_p1.png",
    },
    {
      id: "P-104_p2",
      artId: "P-104_p2",
      setCode: "P",
      collectorNumber: "104",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-104_p2.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "P",
  setId: "P",
  cost: 8,
  power: 10000,
  traits: ["The Four Emperors", "Red-Haired Pirates", "Former Roger Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-104_p1.png",
      imageId: "P-104_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-104_p2.png",
      imageId: "P-104_p2",
    },
  ],
  effect:
    "If either you or your opponent has 10 DON!! cards on the field, this Character cannot be removed from the field by your opponent's effects.",
  i18n: pShanks104I18n,
};
