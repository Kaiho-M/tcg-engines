import type { CharacterCard } from "@tcg/op-types";
import { st36Bartolomeo004I18n } from "./004-bartolomeo.i18n.ts";

export const st36Bartolomeo004: CharacterCard = {
  id: "ST36-004",
  canonicalId: "ST36-004",
  slug: "bartolomeo/st36-004",
  name: "Bartolomeo",
  printings: [
    {
      id: "ST36-004",
      artId: "ST36-004",
      setCode: "ST36",
      collectorNumber: "004",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST36-004.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST36",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Dressrosa", "Supernovas", "Barto Club"],
  attribute: "special",
  effect: "[On Play] You may trash 1 {Supernovas} type card from your hand: Draw 2 cards.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
            filters: [
              {
                filter: "trait",
                value: "Supernovas",
                match: "includes",
              },
            ],
          },
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2,
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: st36Bartolomeo004I18n,
};
