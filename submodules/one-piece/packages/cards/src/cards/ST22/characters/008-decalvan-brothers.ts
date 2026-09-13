import type { CharacterCard } from "@tcg/op-types";
import { st22DecalvanBrothers008I18n } from "./008-decalvan-brothers.i18n.ts";

export const st22DecalvanBrothers008: CharacterCard = {
  id: "ST22-008",
  canonicalId: "ST22-008",
  slug: "decalvan-brothers",
  name: "Decalvan Brothers",
  printings: [
    {
      id: "ST22-008",
      artId: "ST22-008",
      setCode: "ST22",
      collectorNumber: "008",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-008.png",
    },
    {
      id: "ST22-008_p1",
      artId: "ST22-008_p1",
      setCode: "ST22",
      collectorNumber: "008",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-008_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST22",
  cost: 2,
  power: 4000,
  counter: 1000,
  traits: ["Whitebeard Pirates Allies"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST22-008_p1.png",
      imageId: "ST22-008_p1",
    },
  ],
  i18n: st22DecalvanBrothers008I18n,
};
