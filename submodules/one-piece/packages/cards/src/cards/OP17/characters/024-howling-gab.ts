import type { CharacterCard } from "@tcg/op-types";
import { op17HowlingGab024I18n } from "./024-howling-gab.i18n.ts";

export const op17HowlingGab024: CharacterCard = {
  id: "OP17-024",
  canonicalId: "OP17-024",
  slug: "howling-gab/op17-024",
  name: "Howling Gab",
  printings: [
    {
      id: "OP17-024",
      artId: "OP17-024",
      setCode: "OP17",
      collectorNumber: "024",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-024.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "OP17",
  cost: 8,
  power: 8000,
  counter: 1000,
  traits: ["Red-Haired Pirates"],
  attribute: "special",
  effect:
    "[Banish] (When this card deals damage, the target card is trashed without activating its Trigger.)\n[On Play] Rest up to 1 of your opponent's Characters.",
  effects: {
    keywords: ["banish"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
          },
        ],
      },
    ],
  },
  i18n: op17HowlingGab024I18n,
};
