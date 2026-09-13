import type { CharacterCard } from "@tcg/op-types";
import { st04Queen005I18n } from "./005-queen.i18n.ts";

export const st04Queen005: CharacterCard = {
  id: "ST04-005",
  canonicalId: "ST04-005",
  slug: "queen/st04-005",
  name: "Queen",
  printings: [
    {
      id: "ST04-005",
      artId: "ST04-005",
      setCode: "ST04",
      collectorNumber: "005",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST04-005.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "ST04",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Animal Kingdom Pirates"],
  attribute: "strike",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] DON!! −1 (You may return the specified number of DON!! cards from your field to your DON!! deck.): Draw 2 cards and trash 1 card from your hand.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
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
        optional: true,
      },
    ],
  },
  i18n: st04Queen005I18n,
};
