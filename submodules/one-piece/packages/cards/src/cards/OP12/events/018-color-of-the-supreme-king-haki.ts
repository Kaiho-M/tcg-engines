import type { EventCard } from "@tcg/op-types";
import { op12ColorOfTheSupremeKingHaki018I18n } from "./018-color-of-the-supreme-king-haki.i18n.ts";

export const op12ColorOfTheSupremeKingHaki018: EventCard = {
  id: "OP12-018",
  canonicalId: "OP12-018",
  slug: "color-of-the-supreme-king-haki",
  name: "Color of the Supreme King Haki",
  printings: [
    {
      id: "OP12-018",
      artId: "OP12-018",
      setCode: "OP12",
      collectorNumber: "018",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP12-018.png",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "R",
  setId: "OP12",
  cost: 0,
  traits: ["Former Roger Pirates"],
  effect:
    "[Counter] Up to 1 of your Characters or [Silvers Rayleigh] gains +2000 power during this battle. Then, you may rest 1 of your DON!! cards. If you do, give your opponent's Leader and all of their Characters −1000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "counter",
        actions: [
          {
            action: "rest",
            target: {
              player: "self",
              zones: ["costArea"],
              count: {
                amount: 1,
              },
            },
          },
        ],
      },
    ],
  },
  i18n: op12ColorOfTheSupremeKingHaki018I18n,
};
