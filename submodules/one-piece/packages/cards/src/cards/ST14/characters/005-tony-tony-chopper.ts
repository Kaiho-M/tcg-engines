import type { CharacterCard } from "@tcg/op-types";
import { st14TonyTonyChopper005I18n } from "./005-tony-tony-chopper.i18n.ts";

export const st14TonyTonyChopper005: CharacterCard = {
  id: "ST14-005",
  canonicalId: "ST14-005",
  slug: "tony-tony-chopper/st14-005",
  name: "Tony Tony.Chopper",
  printings: [
    {
      id: "ST14-005",
      artId: "ST14-005",
      setCode: "ST14",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST14-005.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "ST14",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["Animal", "Straw Hat Crew"],
  attribute: "wisdom",
  i18n: st14TonyTonyChopper005I18n,
};
