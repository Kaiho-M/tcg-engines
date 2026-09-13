import type { CharacterCard } from "@tcg/op-types";
import { st35Hack001I18n } from "./001-hack.i18n.ts";

export const st35Hack001: CharacterCard = {
  id: "ST35-001",
  canonicalId: "ST35-001",
  slug: "hack/st35-001",
  name: "Hack",
  printings: [
    {
      id: "ST35-001",
      artId: "ST35-001",
      setCode: "ST35",
      collectorNumber: "001",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST35-001.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "ST35",
  cost: 4,
  power: 4000,
  counter: 1000,
  traits: ["Fish-Man", "Dressrosa", "Revolutionary Army"],
  attribute: "strike",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] K.O. up to 1 of your opponent's Characters with 2000 base power or less.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "basePower",
                  comparison: "lte",
                  value: 2000,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: st35Hack001I18n,
};
