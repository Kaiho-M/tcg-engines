import type { CharacterCard } from "@tcg/op-types";
import { st30Jozu005I18n } from "./005-jozu.i18n.ts";

export const st30Jozu005: CharacterCard = {
  id: "ST30-005",
  canonicalId: "ST30-005",
  slug: "jozu/st30-005",
  name: "Jozu",
  printings: [
    {
      id: "ST30-005",
      artId: "ST30-005",
      setCode: "ST30",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-005.png",
    },
    {
      id: "ST30-005_p1",
      artId: "ST30-005_p1",
      setCode: "ST30",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-005_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST30",
  cost: 5,
  power: 6000,
  counter: 2000,
  traits: ["Whitebeard Pirates"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-005_p1.png",
      imageId: "ST30-005_p1",
    },
  ],
  i18n: st30Jozu005I18n,
};
