import type { CharacterCard } from "@tcg/op-types";
import { op15eb04CharlotteLola082I18n } from "./082-charlotte-lola.i18n.ts";

export const op15eb04CharlotteLola082: CharacterCard = {
  id: "OP15-082",
  canonicalId: "OP15-082",
  slug: "charlotte-lola/op15-082",
  name: "Charlotte Lola",
  printings: [
    {
      id: "OP15-082",
      artId: "OP15-082",
      setCode: "OP15EB04",
      collectorNumber: "082",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-082.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 4,
  power: 5000,
  counter: 1000,
  traits: ["Rolling Pirates"],
  attribute: "slash",
  effect:
    "[On Play] Trash 3 cards from the top of your deck.\n[On K.O.] Add up to 1 of your Character cards with a cost of 8 or less from your trash to your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "trashFromDeck",
            player: "self",
            amount: 3,
          },
        ],
      },
    ],
  },
  i18n: op15eb04CharlotteLola082I18n,
};
