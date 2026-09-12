import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Pacifista056I18n } from "./056-pacifista.i18n.ts";

export const op15eb04Pacifista056: CharacterCard = {
  id: "EB04-056",
  canonicalId: "EB04-056",
  slug: "pacifista/eb04-056",
  name: "Pacifista",
  printings: [
    {
      id: "EB04-056",
      artId: "EB04-056",
      setCode: "OP15EB04",
      collectorNumber: "056",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-056.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 1000,
  counter: 2000,
  traits: ["Biological Weapon", "Egghead", "Navy"],
  attribute: "special",
  effect:
    "If you have [Jewelry Bonney] and you have 0 Life cards, this Character gains [Blocker].\n(After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "compound",
            operator: "and",
            conditions: [
              {
                condition: "hasCard",
                player: "self",
                zone: "field",
                filters: [
                  {
                    filter: "name",
                    value: "Jewelry Bonney",
                  },
                ],
              },
              {
                condition: "lifeCount",
                player: "self",
                comparison: "eq",
                value: 0,
              },
            ],
          },
        ],
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
            keyword: "blocker",
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Pacifista056I18n,
};
