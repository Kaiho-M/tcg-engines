import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Alvida003I18n } from "./003-alvida.i18n.ts";

export const op15eb04Alvida003: CharacterCard = {
  id: "OP15-003",
  canonicalId: "OP15-003",
  slug: "alvida/op15-003",
  name: "Alvida",
  printings: [
    {
      id: "OP15-003",
      artId: "OP15-003",
      setCode: "OP15EB04",
      collectorNumber: "003",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-003.png",
    },
    {
      id: "OP15-003_p1",
      artId: "OP15-003_p1",
      setCode: "OP15EB04",
      collectorNumber: "003",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-003_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["East Blue", "Alvida Pirates"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-003_p1.png",
      imageId: "OP15-003_p1",
    },
  ],
  effect:
    "If this Character would be K.O.'d, you may trash 1 Character card with a power of 6000 or less from your hand instead.\n[Activate: Main] [Once Per Turn] You may give 1 of your opponent's rested DON!! cards to 1 of your opponent's Characters: Give up to 1 rested DON!! card to its owner's Leader or 1 of their Characters.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "giveDon",
            amount: 1,
            player: "opponent",
            donState: "rested",
            filters: [
              {
                filter: "cardCategory",
                value: "character",
              },
            ],
          },
        ],
        actions: [
          {
            action: "giveDon",
            target: {
              player: "opponent",
              zones: ["leader", "character"],
              count: {
                amount: 1,
              },
            },
            count: {
              amount: 1,
              upTo: true,
            },
            donState: "rested",
          },
        ],
        optional: true,
        oncePerTurn: true,
      },
    ],
    replacementEffects: [
      {
        replacedEvent: "ko",
        eventFilter: {
          targetSelf: true,
        },
        replacementAction: {
          action: "trashFromHand",
          player: "self",
          amount: 1,
          filters: [
            {
              filter: "cardCategory",
              value: "character",
            },
            {
              filter: "power",
              comparison: "lte",
              value: 6000,
            },
          ],
        },
      },
    ],
  },
  i18n: op15eb04Alvida003I18n,
};
