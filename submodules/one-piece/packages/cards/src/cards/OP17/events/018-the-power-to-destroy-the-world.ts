import type { EventCard } from "@tcg/op-types";
import { op17ThePowerToDestroyTheWorld018I18n } from "./018-the-power-to-destroy-the-world.i18n.ts";

export const op17ThePowerToDestroyTheWorld018: EventCard = {
  id: "OP17-018",
  canonicalId: "OP17-018",
  slug: "the-power-to-destroy-the-world",
  name: "The Power to Destroy the World",
  printings: [
    {
      id: "OP17-018",
      artId: "OP17-018",
      setCode: "OP17",
      collectorNumber: "018",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-018.png",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "UC",
  setId: "OP17",
  cost: 1,
  traits: ["The Four Emperors", "Whitebeard Pirates"],
  effect:
    "[Main] You may rest 2 of your DON!! cards: K.O. up to 1 of your opponent's Stages.\n[Counter] If you have 2 or more Characters with 8000 base power or more, up to 1 of your Leader or Characters gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        costs: [
          {
            cost: "restDon",
            amount: 2,
          },
        ],
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["stage"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op17ThePowerToDestroyTheWorld018I18n,
};
