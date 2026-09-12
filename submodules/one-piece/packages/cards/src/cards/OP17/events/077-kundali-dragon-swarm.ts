import type { EventCard } from "@tcg/op-types";
import { op17KundaliDragonSwarm077I18n } from "./077-kundali-dragon-swarm.i18n.ts";

export const op17KundaliDragonSwarm077: EventCard = {
  id: "OP17-077",
  canonicalId: "OP17-077",
  slug: "kundali-dragon-swarm",
  name: "Kundali Dragon Swarm",
  printings: [
    {
      id: "OP17-077",
      artId: "OP17-077",
      setCode: "OP17",
      collectorNumber: "077",
      rarity: "UC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-077.png",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "UC",
  setId: "OP17",
  cost: 1,
  traits: ["The Four Emperors", "Animal Kingdom Pirates"],
  effect:
    "[Main] You may rest 3 of your DON!! cards and trash 2 cards from your hand: If your Leader has the {Animal Kingdom Pirates} type, add up to 3 DON!! cards as rested from your DON!! deck.\n[Counter] DON!! −1: Your Leader gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "counter",
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
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
            },
            value: 4000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: op17KundaliDragonSwarm077I18n,
};
