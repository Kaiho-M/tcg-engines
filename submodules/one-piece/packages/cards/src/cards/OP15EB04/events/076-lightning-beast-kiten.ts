import type { EventCard } from "@tcg/op-types";
import { op15eb04LightningBeastKiten076I18n } from "./076-lightning-beast-kiten.i18n.ts";

export const op15eb04LightningBeastKiten076: EventCard = {
  id: "OP15-076",
  canonicalId: "OP15-076",
  slug: "lightning-beast-kiten",
  name: "Lightning Beast Kiten",
  printings: [
    {
      id: "OP15-076",
      artId: "OP15-076",
      setCode: "OP15EB04",
      collectorNumber: "076",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-076.png",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "UC",
  setId: "OP15EB04",
  cost: 0,
  traits: ["Sky Island"],
  effect:
    "[Main] DON!! −1: If your Leader is [Enel], draw 1 card. Then, give up to 1 of your opponent's Characters −1000 power during this turn.\n[Counter] Up to 1 of your [Enel] cards gains +2000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
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
            amount: 1,
            condition: {
              condition: "leaderName",
              name: "Enel",
            },
          },
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
            value: -1000,
            duration: "thisTurn",
          },
        ],
      },
      {
        trigger: "counter",
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
              filters: [
                {
                  filter: "name",
                  value: "Enel",
                },
              ],
            },
            value: 2000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: op15eb04LightningBeastKiten076I18n,
};
