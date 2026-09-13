import type { CharacterCard } from "@tcg/op-types";
import { eb02SanjiPudding035I18n } from "./035-sanji-pudding.i18n.ts";

export const eb02SanjiPudding035: CharacterCard = {
  id: "EB02-035",
  canonicalId: "EB02-035",
  slug: "sanji-pudding",
  name: "Sanji & Pudding",
  printings: [
    {
      id: "EB02-035",
      artId: "EB02-035",
      setCode: "EB02",
      collectorNumber: "035",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB02-035.png",
    },
    {
      id: "EB02-035_p1",
      artId: "EB02-035_p1",
      setCode: "EB02",
      collectorNumber: "035",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB02-035_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SR",
  setId: "EB02",
  cost: 5,
  power: 7000,
  traits: ["Big Mom Pirates", "Straw Hat Crew"],
  attribute: ["strike", "wisdom"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB02-035_p1.png",
      imageId: "EB02-035_p1",
    },
  ],
  effect:
    "[Your Turn] [Once Per Turn] When 2 or more DON!! cards on your field are returned to your DON!! deck, add up to 1 DON!! card from your DON!! deck and set it as active.\n[On Play] If the number of DON!! cards on your field is equal to or less than the number on your opponent's field, draw 1 card.",
  effects: {
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
        ],
        oncePerTurn: true,
      },
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "donFieldComparison",
            selfComparison: "lte",
          },
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
  },
  i18n: eb02SanjiPudding035I18n,
};
