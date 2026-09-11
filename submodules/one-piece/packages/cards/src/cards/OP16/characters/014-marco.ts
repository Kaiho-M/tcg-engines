import type { CharacterCard } from "@tcg/op-types";
import { op16Marco014I18n } from "./014-marco.i18n.ts";

export const op16Marco014: CharacterCard = {
  id: "OP16-014",
  canonicalId: "OP16-014",
  slug: "marco/op16-014",
  name: "Marco",
  printings: [
    {
      id: "OP16-014",
      artId: "OP16-014",
      setCode: "OP16",
      collectorNumber: "014",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-014_g0EgQrF.jpg",
    },
    {
      id: "OP16-014_p1",
      artId: "OP16-014_p1",
      setCode: "OP16",
      collectorNumber: "014",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-014_p1_W6pXmYz.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP16",
  cost: 6,
  power: 8000,
  traits: ["Whitebeard Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-014_p1_W6pXmYz.jpg",
      imageId: "OP16-014_p1",
    },
  ],
  effect:
    "If one of your Characters would be removed from the field by your opponent's effect, you may K.O. this character instead.\n[On K.O.] You may trash 1 Character card with 8000 power from your hand: Play this Character card from your trash.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
            filters: [
              {
                filter: "cardCategory",
                value: "character",
              },
              {
                filter: "power",
                comparison: "eq",
                value: 8000,
              },
            ],
          },
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "trash",
            },
            count: {
              amount: 1,
            },
            self: true,
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op16Marco014I18n,
};
