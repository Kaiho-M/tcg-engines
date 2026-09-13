import type { EventCard } from "@tcg/op-types";
import { st07PowerMochi016I18n } from "./016-power-mochi.i18n.ts";

export const st07PowerMochi016: EventCard = {
  id: "ST07-016",
  canonicalId: "ST07-016",
  slug: "power-mochi",
  name: "Power Mochi",
  printings: [
    {
      id: "ST07-016",
      artId: "ST07-016",
      setCode: "ST07",
      collectorNumber: "016",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST07-016.png",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "C",
  setId: "ST07",
  cost: 1,
  trigger:
    "Draw 1 card, look at up to 1 card from the top of your or your opponent's Life cards, and place it at the top or bottom of the Life cards.",
  traits: ["Big Mom Pirates"],
  effect:
    "[Counter] Look at up to 1 card from the top of your or your opponent's Life cards, and place it at the top or bottom of the Life cards. Then, up to 1 of your Leader or Character cards gains +2000 power during this battle.",
  effects: {
    effects: [
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
            },
            value: 2000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: st07PowerMochi016I18n,
};
