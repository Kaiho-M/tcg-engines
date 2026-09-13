import type { EventCard } from "@tcg/op-types";
import { st03Sables015I18n } from "./015-sables.i18n.ts";

export const st03Sables015: EventCard = {
  id: "ST03-015",
  canonicalId: "ST03-015",
  slug: "sables",
  name: "Sables",
  printings: [
    {
      id: "ST03-015",
      artId: "ST03-015",
      setCode: "ST03",
      collectorNumber: "015",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-015.png",
    },
  ],
  cardType: "event",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 4,
  trigger: "Activate this card's [Main] effect.",
  traits: ["The Seven Warlords of the Sea", "Baroque Works"],
  effect: "[Main] Return up to 1 Character with a cost of 7 or less to the owner's hand.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "returnToHand",
            target: {
              player: "any",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 7,
                },
              ],
            },
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "activateEffect",
            effectTrigger: "main",
          },
        ],
      },
    ],
  },
  i18n: st03Sables015I18n,
};
