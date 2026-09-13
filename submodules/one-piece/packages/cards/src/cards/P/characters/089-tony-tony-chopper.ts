import type { CharacterCard } from "@tcg/op-types";
import { pTonyTonyChopper089I18n } from "./089-tony-tony-chopper.i18n.ts";

export const pTonyTonyChopper089: CharacterCard = {
  id: "P-089",
  canonicalId: "P-089",
  slug: "tony-tony-chopper/p-089",
  name: "Tony Tony.Chopper",
  printings: [
    {
      id: "P-089",
      artId: "P-089",
      setCode: "P",
      collectorNumber: "089",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-089.png",
    },
    {
      id: "P-089_p1",
      artId: "P-089_p1",
      setCode: "P",
      collectorNumber: "089",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-089_p1.png",
    },
    {
      id: "P-089_p2",
      artId: "P-089_p2",
      setCode: "P",
      collectorNumber: "089",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-089_p2.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "P",
  setId: "P",
  cost: 5,
  power: 7000,
  counter: 1000,
  traits: ["Animal", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-089_p1.png",
      imageId: "P-089_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-089_p2.png",
      imageId: "P-089_p2",
    },
  ],
  i18n: pTonyTonyChopper089I18n,
};
