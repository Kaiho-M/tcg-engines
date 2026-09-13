import type { CharacterCard } from "@tcg/op-types";
import { pRoronoaZoro141I18n } from "./141-roronoa-zoro.i18n.ts";

export const pRoronoaZoro141: CharacterCard = {
  id: "P-141",
  canonicalId: "P-141",
  slug: "roronoa-zoro/p-141",
  name: "Roronoa Zoro",
  printings: [
    {
      id: "P-141",
      artId: "P-141",
      setCode: "P",
      collectorNumber: "141",
      rarity: "P",
      imageUrl: "https://www.onepiece-cardgame.com/images/cardlist/card/P-141.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "P",
  setId: "P",
  cost: 7,
  power: 6000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  attribute: "slash",
  effect:
    "[Rush] (This card can attack on the turn in which it is played.)\n[On Play] Give up to 1 of your opponent's Leader or Character cards −1000 power during this turn.",
  effects: {
    keywords: ["rush"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["leader", "character"],
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
    ],
  },
  i18n: pRoronoaZoro141I18n,
};
