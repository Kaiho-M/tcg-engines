import type { EventCard } from "@tcg/op-types";
import { op17DrunkenDragonBagua078I18n } from "./078-drunken-dragon-bagua.i18n.ts";

export const op17DrunkenDragonBagua078: EventCard = {
  id: "OP17-078",
  canonicalId: "OP17-078",
  slug: "drunken-dragon-bagua",
  name: "Drunken Dragon Bagua",
  printings: [
    {
      id: "OP17-078",
      artId: "OP17-078",
      setCode: "OP17",
      collectorNumber: "078",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-078.png",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "C",
  setId: "OP17",
  cost: 2,
  traits: ["The Four Emperors", "Animal Kingdom Pirates"],
  effect:
    "[Main] You may rest 2 of your DON!! cards and trash 2 cards from your hand: If your Leader has the {Animal Kingdom Pirates} type, add up to 3 DON!! cards as rested from your DON!! deck.\n[Counter] Up to 1 of your Leader or Characters gains +4000 power during this battle.",
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
            value: 4000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: op17DrunkenDragonBagua078I18n,
};
