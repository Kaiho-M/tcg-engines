import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Goro065I18n } from "./065-goro.i18n.ts";

export const op15eb04Goro065: CharacterCard = {
  id: "OP15-065",
  canonicalId: "OP15-065",
  slug: "goro",
  name: "Goro",
  printings: [
    {
      id: "OP15-065",
      artId: "OP15-065",
      setCode: "OP15EB04",
      collectorNumber: "065",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-065.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 3,
  counter: 2000,
  traits: ["Alabasta", "Hot Springs Island"],
  attribute: "wisdom",
  effect:
    "[On Play] Reveal 1 card from the top of your deck. If the revealed card has a cost of 2 or less, add up to 1 DON!! card from your DON!! deck and rest it.",
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
        ],
      },
    ],
  },
  i18n: op15eb04Goro065I18n,
};
