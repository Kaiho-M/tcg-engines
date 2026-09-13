import type { CharacterCard } from "@tcg/op-types";
import { st21TonyTonyChopper008I18n } from "./008-tony-tony-chopper.i18n.ts";

export const st21TonyTonyChopper008: CharacterCard = {
  id: "ST21-008",
  canonicalId: "ST21-008",
  slug: "tony-tony-chopper/st21-008",
  name: "Tony Tony.Chopper",
  printings: [
    {
      id: "ST21-008",
      artId: "ST21-008",
      setCode: "ST21",
      collectorNumber: "008",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-008.png",
    },
    {
      id: "ST21-008_p1",
      artId: "ST21-008_p1",
      setCode: "ST21",
      collectorNumber: "008",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-008_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST21",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["Animal", "Straw Hat Crew"],
  attribute: "wisdom",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-008_p1.png",
      imageId: "ST21-008_p1",
    },
  ],
  i18n: st21TonyTonyChopper008I18n,
};
