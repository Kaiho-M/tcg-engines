import type { EventCard } from "@tcg/op-types";
import { op15eb04BlackRopeDragonTwiste059I18n } from "./059-black-rope-dragon-twiste.i18n.ts";

export const op15eb04BlackRopeDragonTwiste059: EventCard = {
  id: "EB04-059",
  canonicalId: "EB04-059",
  slug: "black-rope-dragon-twiste",
  name: "Black Rope Dragon Twiste",
  printings: [
    {
      id: "EB04-059",
      artId: "EB04-059",
      setCode: "OP15EB04",
      collectorNumber: "059",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-059.jpg",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 6,
  traits: ["Straw Hat Crew Supernovas Fish-Man Island"],
  effect:
    "[Main] You may turn 1 card from the top of your Life cards face-up: If you have less Characters than your opponent, K.O. up to 1 of your opponent's Characters with a cost of 6 or less and up to 1 of your opponent's Characters with a cost of 5 or less. [Trigger] Draw 2 cards and trash 1 card from your hand.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2,
          },
          {
            action: "trashFromHand",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
  },
  i18n: op15eb04BlackRopeDragonTwiste059I18n,
};
