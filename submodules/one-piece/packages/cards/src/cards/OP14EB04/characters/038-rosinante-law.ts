import type { CharacterCard } from "@tcg/op-types";
import { op14eb04RosinanteLaw038I18n } from "./038-rosinante-law.i18n.ts";

export const op14eb04RosinanteLaw038: CharacterCard = {
  id: "EB04-038",
  canonicalId: "EB04-038",
  slug: "rosinante-law",
  name: "Rosinante & Law",
  printings: [
    {
      id: "EB04-038",
      artId: "EB04-038",
      setCode: "OP14EB04",
      collectorNumber: "038",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-038.png",
    },
    {
      id: "EB04-038_p1",
      artId: "EB04-038_p1",
      setCode: "OP14EB04",
      collectorNumber: "038",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-038_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SR",
  setId: "OP14EB04",
  cost: 6,
  power: 8000,
  traits: ["Navy", "Donquixote Pirates"],
  alternateNames: ["Trafalgar Law", "Donquixote Rosinante"],
  attribute: ["special", "wisdom"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-038_p1.png",
      imageId: "EB04-038_p1",
    },
  ],
  effect:
    "Under the rules of this game, also treat this card's name as [Trafalgar Law] and [Donquixote Rosinante].\n[Blocker]\n[On Play] If the number of DON!! cards on your field is equal to or less than the number on your opponent's field, draw 1 card. Then, add up to 1 DON!! card from your DON!! deck and set it as active.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
            condition: {
              condition: "donFieldComparison",
              selfComparison: "lte",
            },
          },
          {
            action: "addDon",
            count: {
              amount: 1,
              upTo: true,
            },
            state: "active",
          },
        ],
      },
    ],
  },
  i18n: op14eb04RosinanteLaw038I18n,
};
