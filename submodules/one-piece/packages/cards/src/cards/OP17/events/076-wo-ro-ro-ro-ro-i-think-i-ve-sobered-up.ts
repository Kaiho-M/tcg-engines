import type { EventCard } from "@tcg/op-types";
import { op17WoRoRoRoRoIThinkIVeSoberedUp076I18n } from "./076-wo-ro-ro-ro-ro-i-think-i-ve-sobered-up.i18n.ts";

export const op17WoRoRoRoRoIThinkIVeSoberedUp076: EventCard = {
  id: "OP17-076",
  canonicalId: "OP17-076",
  slug: "wo-ro-ro-ro-ro-i-think-i-ve-sobered-up",
  name: "Wo Ro Ro Ro Ro... I Think I've Sobered Up",
  printings: [
    {
      id: "OP17-076",
      artId: "OP17-076",
      setCode: "OP17",
      collectorNumber: "076",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-076.png",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "R",
  setId: "OP17",
  cost: 0,
  trigger: "DON!! −1: Draw 2 cards.",
  traits: ["The Four Emperors", "Animal Kingdom Pirates"],
  effect:
    "[Counter] You may trash 1 card from your hand: Up to 1 of your Leader or Charactes gains +3000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "counter",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            value: 3000,
            duration: "thisBattle",
          },
        ],
        optional: true,
      },
      {
        trigger: "trigger",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 2,
          },
        ],
      },
    ],
  },
  i18n: op17WoRoRoRoRoIThinkIVeSoberedUp076I18n,
};
