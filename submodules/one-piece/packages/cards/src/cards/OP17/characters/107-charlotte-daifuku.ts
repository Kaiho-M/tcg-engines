import type { CharacterCard } from "@tcg/op-types";
import { op17CharlotteDaifuku107I18n } from "./107-charlotte-daifuku.i18n.ts";

export const op17CharlotteDaifuku107: CharacterCard = {
  id: "OP17-107",
  canonicalId: "OP17-107",
  slug: "charlotte-daifuku/op17-107",
  name: "Charlotte Daifuku",
  printings: [
    {
      id: "OP17-107",
      artId: "OP17-107",
      setCode: "OP17",
      collectorNumber: "107",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-107.png",
    },
    {
      id: "OP17-107_p1",
      artId: "OP17-107_p1",
      setCode: "OP17",
      collectorNumber: "107",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-107_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "UC",
  setId: "OP17",
  cost: 3,
  power: 4000,
  counter: 2000,
  trigger: "Play this card.",
  traits: ["Big Mom Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-107_p1.png",
      imageId: "OP17-107_p1",
    },
  ],
  effect: "[Trigger] Play this card.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
    ],
  },
  i18n: op17CharlotteDaifuku107I18n,
};
