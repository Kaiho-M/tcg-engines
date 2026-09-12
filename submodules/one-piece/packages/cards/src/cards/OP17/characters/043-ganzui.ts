import type { CharacterCard } from "@tcg/op-types";
import { op17Ganzui043I18n } from "./043-ganzui.i18n.ts";

export const op17Ganzui043: CharacterCard = {
  id: "OP17-043",
  canonicalId: "OP17-043",
  slug: "ganzui",
  name: "Ganzui",
  printings: [
    {
      id: "OP17-043",
      artId: "OP17-043",
      setCode: "OP17",
      collectorNumber: "043",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-043.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP17",
  cost: 5,
  power: 7000,
  traits: ["Rocks Pirates"],
  attribute: "special",
  effect:
    "If this Character would be removed from the field, you may trash 2 cards from your hand instead.\n[On Play] Your Leader's base power becomes 6000 until the end of your opponent's next End Phase.",
  effects: {
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        eventFilter: {
          targetSelf: true,
        },
        replacementAction: {
          action: "trashFromHand",
          player: "self",
          amount: 2,
        },
      },
    ],
  },
  i18n: op17Ganzui043I18n,
};
