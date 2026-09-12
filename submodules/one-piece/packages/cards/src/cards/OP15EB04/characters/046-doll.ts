import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Doll046I18n } from "./046-doll.i18n.ts";

export const op15eb04Doll046: CharacterCard = {
  id: "EB04-046",
  canonicalId: "EB04-046",
  slug: "doll/eb04-046",
  name: "Doll",
  printings: [
    {
      id: "EB04-046",
      artId: "EB04-046",
      setCode: "OP15EB04",
      collectorNumber: "046",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-046.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 2,
  power: 1000,
  counter: 1000,
  traits: ["Egghead", "Navy"],
  attribute: "strike",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[Opponent's Turn] All of your {Navy} type Characters gain +2 cost.",
  effects: {
    keywords: ["blocker"],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "turn",
            value: "opponent",
          },
        ],
        actions: [
          {
            action: "modifyCost",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "trait",
                  value: "Navy",
                  match: "includes",
                },
              ],
            },
            value: 2,
          },
        ],
      },
    ],
  },
  i18n: op15eb04Doll046I18n,
};
