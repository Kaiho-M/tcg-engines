import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Jango026I18n } from "./026-jango.i18n.ts";

export const op15eb04Jango026: CharacterCard = {
  id: "OP15-026",
  canonicalId: "OP15-026",
  slug: "jango/op15-026",
  name: "Jango",
  printings: [
    {
      id: "OP15-026",
      artId: "OP15-026",
      setCode: "OP15EB04",
      collectorNumber: "026",
      rarity: "UC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-026_WPmtrE8.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "UC",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["East Blue Black Cat Pirates"],
  attribute: "slash",
  effect:
    "[On Play] Look at 3 cards from the top of your deck; reveal up to 1 {East Blue} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.\n[Activate: Main] You may trash this Character: Give up to 1 of your opponent's rested DON!! cards to 1 of your opponent's Characters.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 3,
            source: {
              player: "self",
              zone: "deck",
            },
            revealCount: {
              amount: 1,
              upTo: true,
            },
            revealFilters: [
              {
                filter: "trait",
                value: "East Blue",
                match: "includes",
              },
            ],
            revealDestination: "hand",
            remainderPosition: "bottom",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Jango026I18n,
};
