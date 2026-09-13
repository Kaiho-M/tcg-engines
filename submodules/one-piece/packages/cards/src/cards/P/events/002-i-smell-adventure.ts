import type { EventCard } from "@tcg/op-types";
import { pISmellAdventure002I18n } from "./002-i-smell-adventure.i18n.ts";

export const pISmellAdventure002: EventCard = {
  id: "P-002",
  canonicalId: "P-002",
  slug: "i-smell-adventure",
  name: "I Smell Adventure!!!",
  printings: [
    {
      id: "P-002",
      artId: "P-002",
      setCode: "P",
      collectorNumber: "002",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-002.png",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "P",
  setId: "P",
  cost: 1,
  trigger: "Activate this card's [Main] effect.",
  traits: ["Straw Hat Crew"],
  effect:
    "[Main] Return all cards in your hand to your deck and shuffle your deck. Then, draw cards equal to the number you returned to your deck.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "redrawHand",
            player: "self",
            drawCount: "returned",
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "activateEffect",
            effectTrigger: "main",
          },
        ],
      },
    ],
  },
  i18n: pISmellAdventure002I18n,
};
