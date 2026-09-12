import type { LeaderCard } from "@tcg/op-types";
import { op15eb04Rebecca039I18n } from "./039-rebecca.i18n.ts";

export const op15eb04Rebecca039: LeaderCard = {
  id: "OP15-039",
  canonicalId: "OP15-039",
  slug: "rebecca/op15-039",
  name: "Rebecca",
  printings: [
    {
      id: "OP15-039",
      artId: "OP15-039",
      setCode: "OP15EB04",
      collectorNumber: "039",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-039.png",
    },
    {
      id: "OP15-039_p1",
      artId: "OP15-039_p1",
      setCode: "OP15EB04",
      collectorNumber: "039",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-039_p1.png",
    },
  ],
  cardType: "leader",
  color: ["blue"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 5,
  traits: ["Dressrosa"],
  attribute: "wisdom",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-039_p1.png",
      imageId: "OP15-039_p1",
    },
  ],
  effect:
    "This Leader cannot attack.\n[Activate: Main] You may rest this Leader and return 1 of your {Dressrosa} type Characters to the owner's hand: Play up to 1 {Dressrosa} type Character card with a cost of 3 from your hand.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restThisCard",
          },
          {
            cost: "returnCharacter",
            amount: 1,
            filters: [
              {
                filter: "trait",
                value: "Dressrosa",
                match: "includes",
              },
            ],
          },
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand",
            },
            count: {
              amount: 1,
              upTo: true,
            },
            filters: [
              {
                filter: "cost",
                comparison: "eq",
                value: 3,
              },
              {
                filter: "trait",
                value: "Dressrosa",
                match: "includes",
              },
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
        optional: true,
      },
    ],
    permanentEffects: [
      {
        actions: [
          {
            action: "cannotAttack",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
              self: true,
            },
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Rebecca039I18n,
};
