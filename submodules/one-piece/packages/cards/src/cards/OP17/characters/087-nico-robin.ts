import type { CharacterCard } from "@tcg/op-types";
import { op17NicoRobin087I18n } from "./087-nico-robin.i18n.ts";

export const op17NicoRobin087: CharacterCard = {
  id: "OP17-087",
  canonicalId: "OP17-087",
  slug: "nico-robin/op17-087",
  name: "Nico Robin",
  printings: [
    {
      id: "OP17-087",
      artId: "OP17-087",
      setCode: "OP17",
      collectorNumber: "087",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-087.png",
    },
    {
      id: "OP17-087_p1",
      artId: "OP17-087_p1",
      setCode: "OP17",
      collectorNumber: "087",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-087_p1.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "OP17",
  cost: 2,
  power: 2000,
  counter: 1000,
  traits: ["Elbaph", "Straw Hat Crew"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-087_p1.png",
      imageId: "OP17-087_p1",
    },
  ],
  effect:
    "If there is a Character with a cost of 12 or more, this Character gains +3000 power.\n[On Play] If there is a Character with a cost of 12 or more, give up to 1 of your opponent's Characters −3000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        conditions: [
          {
            condition: "existsOnField",
            zone: "character",
            filters: [
              {
                filter: "cost",
                comparison: "gte",
                value: 12,
              },
            ],
          },
        ],
        actions: [
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
            value: -3000,
            duration: "thisTurn",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "existsOnField",
            zone: "character",
            filters: [
              {
                filter: "cost",
                comparison: "gte",
                value: 12,
              },
            ],
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: 3000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op17NicoRobin087I18n,
};
