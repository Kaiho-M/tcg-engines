import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Ginny045I18n } from "./045-ginny.i18n.ts";

export const op15eb04Ginny045: CharacterCard = {
  id: "EB04-045",
  canonicalId: "EB04-045",
  slug: "ginny",
  name: "Ginny",
  printings: [
    {
      id: "EB04-045",
      artId: "EB04-045",
      setCode: "OP15EB04",
      collectorNumber: "045",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-045.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 2000,
  traits: ["Revolutionary Army"],
  attribute: "ranged",
  effect:
    "[Activate: Main] You may rest this Character: If there are 2 or more Characters with a cost of 8 or more, up to 1 of your {Revolutionary Army} type Leader or Character cards gains +1000 power during this turn.",
  i18n: op15eb04Ginny045I18n,
};
