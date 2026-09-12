import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Fuza070I18n } from "./070-fuza.i18n.ts";

export const op15eb04Fuza070: CharacterCard = {
  id: "OP15-070",
  canonicalId: "OP15-070",
  slug: "fuza/op15-070",
  name: "Fuza",
  printings: [
    {
      id: "OP15-070",
      artId: "OP15-070",
      setCode: "OP15EB04",
      collectorNumber: "070",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-070.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Animal", "Sky Island"],
  attribute: "special",
  effect:
    "All of your [Shura] cards and this Character gain [Unblockable].\n(This card cannot be blocked.)\n[Opponent's Turn] All of your [Shura] cards' base power and this Character's base power become 6000.",
  effects: {
    permanentEffects: [
      {
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            keyword: "unblockable",
            duration: "permanent",
          },
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "name",
                  value: "Shura",
                },
              ],
            },
            keyword: "unblockable",
            duration: "permanent",
          },
        ],
      },
      {
        conditions: [
          {
            condition: "turn",
            value: "opponent",
          },
        ],
        actions: [
          {
            action: "setBasePower",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "name",
                  value: "Shura",
                },
              ],
            },
            value: 6000,
            duration: "permanent",
          },
          {
            action: "setBasePower",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: 6000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Fuza070I18n,
};
