import type { EventCard } from "@tcg/op-types";
import { op12ColorOfObservationHaki017I18n } from "./017-color-of-observation-haki.i18n.ts";

export const op12ColorOfObservationHaki017: EventCard = {
  id: "OP12-017",
  canonicalId: "OP12-017",
  slug: "color-of-observation-haki",
  name: "Color of Observation Haki",
  printings: [
    {
      id: "OP12-017",
      artId: "OP12-017",
      setCode: "OP12",
      collectorNumber: "017",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP12-017.png",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "UC",
  setId: "OP12",
  cost: 0,
  traits: ["Former Roger Pirates"],
  effect:
    "[Main] You may give 1 active DON!! card to 1 of your [Silvers Rayleigh]: Look at 4 cards from the top of your deck; reveal up to 1 red Event or up to 1 Character card with a cost of 3 or more and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
  i18n: op12ColorOfObservationHaki017I18n,
};
