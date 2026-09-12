import type { CharacterCard } from "@tcg/op-types";
import { op15eb04MonkeyDLuffy005I18n } from "./005-monkey-d-luffy.i18n.ts";

export const op15eb04MonkeyDLuffy005: CharacterCard = {
  id: "ST26-005",
  canonicalId: "ST26-005",
  slug: "monkey-d-luffy/st26-005",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "ST26-005",
      artId: "ST26-005_p1",
      setCode: "OP15EB04",
      collectorNumber: "005",
      rarity: "SP",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST26-005_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SP",
  setId: "OP15EB04",
  cost: 6,
  power: 7000,
  traits: ["Straw Hat Crew"],
  attribute: "strike",
  effect:
    "[On Play]/[When Attacking] DON!! −2 (You may return the specified number of DON!! cards from your field to your DON!! deck.): If your Leader is multicolored and your opponent has 5 or more DON!! cards on their field, your {Straw Hat Crew} type Leader's base power becomes 7000 until the end of your opponent's next End Phase.",
  i18n: op15eb04MonkeyDLuffy005I18n,
};
