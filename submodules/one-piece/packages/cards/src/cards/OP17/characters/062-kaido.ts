import type { CharacterCard } from "@tcg/op-types";
import { op17Kaido062I18n } from "./062-kaido.i18n.ts";

export const op17Kaido062: CharacterCard = {
  id: "OP17-062",
  canonicalId: "OP17-062",
  slug: "kaido/op17-062",
  name: "Kaido",
  printings: [
    {
      id: "OP17-062",
      artId: "OP17-062",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062.png",
    },
    {
      id: "OP17-062_p1",
      artId: "OP17-062_p1",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062_p1.png",
    },
    {
      id: "OP17-062_p2",
      artId: "OP17-062_p2",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062_p2.png",
    },
    {
      id: "OP17-062_p3",
      artId: "OP17-062_p3",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062_p3.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SR",
  setId: "OP17",
  cost: 10,
  power: 12000,
  traits: ["The Four Emperors", "Animal Kingdom Pirates"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062_p1.png",
      imageId: "OP17-062_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062_p2.png",
      imageId: "OP17-062_p2",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-062_p3.png",
      imageId: "OP17-062_p3",
    },
  ],
  effect:
    "[Blocker]\n[Your Turn] [Once Per Turn] When a DON!! card on your field is returned to your DON!! deck, add up to 1 DON!! card as active from your DON!! deck. Then, set up to 1 of your DON!! cards as active.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "whenDonReturned",
        conditions: [
          {
            condition: "turn",
            value: "your",
          },
        ],
        actions: [
          {
            action: "addDon",
            count: {
              amount: 1,
              upTo: true,
            },
            state: "active",
          },
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["costArea"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op17Kaido062I18n,
};
