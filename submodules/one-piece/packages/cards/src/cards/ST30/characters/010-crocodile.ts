import type { CharacterCard } from "@tcg/op-types";
import { st30Crocodile010I18n } from "./010-crocodile.i18n.ts";

export const st30Crocodile010: CharacterCard = {
  id: "ST30-010",
  canonicalId: "ST30-010",
  slug: "crocodile/st30-010",
  name: "Crocodile",
  printings: [
    {
      id: "ST30-010",
      artId: "ST30-010",
      setCode: "ST30",
      collectorNumber: "010",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-010.png",
    },
    {
      id: "ST30-010_p1",
      artId: "ST30-010_p1",
      setCode: "ST30",
      collectorNumber: "010",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-010_p1.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "C",
  setId: "ST30",
  cost: 6,
  power: 6000,
  counter: 1000,
  traits: ["Impel Down", "Former Baroque Works"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-010_p1.png",
      imageId: "ST30-010_p1",
    },
  ],
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] Up to 1 of your opponent's rested Characters will not become active in your opponent's next Refresh Phase.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "freeze",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "state",
                  value: "rested",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: st30Crocodile010I18n,
};
