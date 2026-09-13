import type { CharacterCard } from "@tcg/op-types";
import { st17Crocodile001I18n } from "./001-crocodile.i18n.ts";

export const st17Crocodile001: CharacterCard = {
  id: "ST17-001",
  canonicalId: "ST17-001",
  slug: "crocodile/st17-001",
  name: "Crocodile",
  printings: [
    {
      id: "ST17-001",
      artId: "ST17-001",
      setCode: "ST17",
      collectorNumber: "001",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST17-001.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST17",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["The Seven Warlords of the Sea", "Baroque Works"],
  attribute: "special",
  effect:
    "[On Play] Reveal 1 card from the top of your deck. If that card is a {The Seven Warlords of the Sea} type card, draw 2 cards and place 1 card from your hand at the top of your deck.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "revealFromDeck",
            player: "self",
            count: 1,
          },
          {
            action: "returnToDeck",
            target: {
              player: "self",
              zones: ["hand"],
              count: {
                amount: 1,
              },
            },
            position: "top",
          },
        ],
      },
    ],
  },
  i18n: st17Crocodile001I18n,
};
