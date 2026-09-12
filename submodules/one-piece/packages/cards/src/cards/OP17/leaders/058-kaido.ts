import type { LeaderCard } from "@tcg/op-types";
import { op17Kaido058I18n } from "./058-kaido.i18n.ts";

export const op17Kaido058: LeaderCard = {
  id: "OP17-058",
  canonicalId: "OP17-058",
  slug: "kaido/op17-058",
  name: "Kaido",
  printings: [
    {
      id: "OP17-058",
      artId: "OP17-058",
      setCode: "OP17",
      collectorNumber: "058",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-058.png",
    },
    {
      id: "OP17-058_p1",
      artId: "OP17-058_p1",
      setCode: "OP17",
      collectorNumber: "058",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-058_p1.png",
    },
  ],
  cardType: "leader",
  color: ["purple"],
  rarity: "L",
  setId: "OP17",
  power: 5000,
  life: 5,
  traits: ["The Four Emperors", "Animal Kingdom Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-058_p1.png",
      imageId: "OP17-058_p1",
    },
  ],
  effect:
    "[When Attacking]/[On Your Opponent's Attack] [Once Per Turn] DON!! −1: Give up to 1 of your opponent's Characters −2000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            value: -2000,
            duration: "thisTurn",
          },
        ],
        optional: true,
        oncePerTurn: true,
        oncePerTurnKey:
          "shared:whenAttacking|onOpponentAttack:give up to 1 of your opponent's characters −2000 power during this turn.",
      },
      {
        trigger: "onOpponentAttack",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            value: -2000,
            duration: "thisTurn",
          },
        ],
        optional: true,
        oncePerTurn: true,
        oncePerTurnKey:
          "shared:whenAttacking|onOpponentAttack:give up to 1 of your opponent's characters −2000 power during this turn.",
      },
    ],
  },
  i18n: op17Kaido058I18n,
};
