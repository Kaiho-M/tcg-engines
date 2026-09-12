import type { LeaderCard } from "@tcg/op-types";
import { op17CharlotteLinlin099I18n } from "./099-charlotte-linlin.i18n.ts";

export const op17CharlotteLinlin099: LeaderCard = {
  id: "OP17-099",
  canonicalId: "OP17-099",
  slug: "charlotte-linlin/op17-099",
  name: "Charlotte Linlin",
  printings: [
    {
      id: "OP17-099",
      artId: "OP17-099",
      setCode: "OP17",
      collectorNumber: "099",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-099.png",
    },
    {
      id: "OP17-099_p1",
      artId: "OP17-099_p1",
      setCode: "OP17",
      collectorNumber: "099",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-099_p1.png",
    },
  ],
  cardType: "leader",
  color: ["yellow"],
  rarity: "L",
  setId: "OP17",
  power: 5000,
  life: 5,
  traits: ["The Four Emperors", "Big Mom Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-099_p1.png",
      imageId: "OP17-099_p1",
    },
  ],
  effect:
    "[When Attacking] You may trash 1 card from your hand: Your opponent chooses one:\n• Trash 1 card from your hand. Then, add up to 1 card from the top of your deck to the top of your Life cards.\n• Trash 1 card from your opponent's hand.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "choice",
            player: "opponent",
            options: [
              [
                {
                  action: "trashFromHand",
                  player: "self",
                  amount: 1,
                },
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
                  action: "trashFromHand",
                  player: "opponent",
                  amount: 1,
                },
              ],
            ],
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op17CharlotteLinlin099I18n,
};
