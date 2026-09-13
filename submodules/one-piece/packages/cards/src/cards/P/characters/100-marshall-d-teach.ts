import type { CharacterCard } from "@tcg/op-types";
import { pMarshallDTeach100I18n } from "./100-marshall-d-teach.i18n.ts";

export const pMarshallDTeach100: CharacterCard = {
  id: "P-100",
  canonicalId: "P-100",
  slug: "marshall-d-teach/p-100",
  name: "Marshall.D.Teach",
  printings: [
    {
      id: "P-100",
      artId: "P-100",
      setCode: "P",
      collectorNumber: "100",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-100.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "P",
  setId: "P",
  cost: 10,
  power: 12000,
  traits: ["The Four Emperors", "Blackbeard Pirates"],
  attribute: "special",
  effect:
    "[When Attacking] Negate the effects of your opponent's Leader and all of their Characters during this turn.",
  i18n: pMarshallDTeach100I18n,
};
