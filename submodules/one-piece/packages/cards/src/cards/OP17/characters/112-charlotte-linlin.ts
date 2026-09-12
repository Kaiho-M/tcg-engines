import type { CharacterCard } from "@tcg/op-types";
import { op17CharlotteLinlin112I18n } from "./112-charlotte-linlin.i18n.ts";

export const op17CharlotteLinlin112: CharacterCard = {
  id: "OP17-112",
  canonicalId: "OP17-112",
  slug: "charlotte-linlin/op17-112",
  name: "Charlotte Linlin",
  printings: [
    {
      id: "OP17-112",
      artId: "OP17-112",
      setCode: "OP17",
      collectorNumber: "112",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-112.png",
    },
    {
      id: "OP17-112_p1",
      artId: "OP17-112_p1",
      setCode: "OP17",
      collectorNumber: "112",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-112_p1.png",
    },
    {
      id: "OP17-112_p2",
      artId: "OP17-112_p2",
      setCode: "OP17",
      collectorNumber: "112",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-112_p2.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "OP17",
  cost: 10,
  power: 12000,
  traits: ["The Four Emperors", "Big Mom Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-112_p1.png",
      imageId: "OP17-112_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-112_p2.png",
      imageId: "OP17-112_p2",
    },
  ],
  effect:
    "[Your Turn] The base power of all of your Characters with a [Trigger] and 4000 base power becomes 8000.\n[On Play] Draw 1 card, then choose one:\n• Add up to 1 card from the top of your deck to the top of your Life cards.\n• Add up to 1 card from the top of your opponent's Life cards to the owner's hand.",
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
          {
            action: "choice",
            options: [
              [
                {
                  action: "addToLife",
                  target: {
                    player: "self",
                    zones: ["deck"],
                    count: {
                      amount: 1,
                      upTo: true,
                    },
                  },
                  position: "top",
                },
              ],
              [
                {
                  action: "removeFromLife",
                  player: "opponent",
                  count: {
                    amount: 1,
                    upTo: true,
                  },
                  destination: "hand",
                },
              ],
            ],
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "turn",
            value: "your",
          },
        ],
        actions: [
          {
            action: "setBasePower",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "hasTrigger",
                  value: true,
                },
                {
                  filter: "basePower",
                  comparison: "eq",
                  value: 4000,
                },
              ],
            },
            value: 8000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op17CharlotteLinlin112I18n,
};
