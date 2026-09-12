import type { CharacterCard } from "@tcg/op-types";
import { op17Kyo045I18n } from "./045-kyo.i18n.ts";

export const op17Kyo045: CharacterCard = {
  id: "OP17-045",
  canonicalId: "OP17-045",
  slug: "kyo",
  name: "Kyo",
  printings: [
    {
      id: "OP17-045",
      artId: "OP17-045",
      setCode: "OP17",
      collectorNumber: "045",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-045.png",
    },
    {
      id: "OP17-045_p1",
      artId: "OP17-045_p1",
      setCode: "OP17",
      collectorNumber: "045",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-045_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP17",
  cost: 2,
  power: 4000,
  traits: ["Rocks Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-045_p1.png",
      imageId: "OP17-045_p1",
    },
  ],
  effect:
    "If one of your Characters would be removed from the field by your opponent's effect, you may trash 2 cards from your hand instead.\n[On Play] Draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        target: {
          player: "self",
          zones: ["character"],
          count: {
            amount: 1,
          },
        },
        source: "opponentEffect",
        replacementAction: {
          action: "trashFromHand",
          player: "self",
          amount: 2,
        },
      },
    ],
  },
  i18n: op17Kyo045I18n,
};
