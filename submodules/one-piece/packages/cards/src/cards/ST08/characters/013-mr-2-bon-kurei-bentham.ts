import type { CharacterCard } from "@tcg/op-types";
import { st08Mr2BonKureiBentham013I18n } from "./013-mr-2-bon-kurei-bentham.i18n.ts";

export const st08Mr2BonKureiBentham013: CharacterCard = {
  id: "ST08-013",
  canonicalId: "ST08-013",
  slug: "mr-2-bon-kurei-bentham/st08-013",
  name: "Mr.2.Bon.Kurei(Bentham)",
  printings: [
    {
      id: "ST08-013",
      artId: "ST08-013",
      setCode: "ST08",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST08-013.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "ST08",
  cost: 5,
  power: 6000,
  traits: ["Former Baroque Works"],
  attribute: "strike",
  effect:
    "[DON!! x1] At the end of a battle in which this Character battles your opponent's Character, you may K.O. the opponent’s Character you battled with. If you do, K.O. this Character.",
  i18n: st08Mr2BonKureiBentham013I18n,
};
