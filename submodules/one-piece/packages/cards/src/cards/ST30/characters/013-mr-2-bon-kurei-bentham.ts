import type { CharacterCard } from "@tcg/op-types";
import { st30Mr2BonKureiBentham013I18n } from "./013-mr-2-bon-kurei-bentham.i18n.ts";

export const st30Mr2BonKureiBentham013: CharacterCard = {
  id: "ST30-013",
  canonicalId: "ST30-013",
  slug: "mr-2-bon-kurei-bentham/st30-013",
  name: "Mr.2.Bon.Kurei(Bentham)",
  printings: [
    {
      id: "ST30-013",
      artId: "ST30-013",
      setCode: "ST30",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-013.png",
    },
    {
      id: "ST30-013_p1",
      artId: "ST30-013_p1",
      setCode: "ST30",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-013_p1.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "ST30",
  cost: 4,
  power: 6000,
  counter: 1000,
  traits: ["Impel Down", "Former Baroque Works"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-013_p1.png",
      imageId: "ST30-013_p1",
    },
  ],
  i18n: st30Mr2BonKureiBentham013I18n,
};
