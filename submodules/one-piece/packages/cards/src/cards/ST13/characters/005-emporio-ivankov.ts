import type { CharacterCard } from "@tcg/op-types";
import { st13EmporioIvankov005I18n } from "./005-emporio-ivankov.i18n.ts";

export const st13EmporioIvankov005: CharacterCard = {
  id: "ST13-005",
  canonicalId: "ST13-005",
  slug: "emporio-ivankov/st13-005",
  name: "Emporio.Ivankov",
  printings: [
    {
      id: "ST13-005",
      artId: "ST13-005",
      setCode: "ST13",
      collectorNumber: "005",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-005.png",
    },
    {
      id: "ST13-005_p1",
      artId: "ST13-005_p1",
      setCode: "ST13",
      collectorNumber: "005",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-005_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "R",
  setId: "ST13",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Revolutionary Army"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-005_p1.png",
      imageId: "ST13-005_p1",
    },
  ],
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] You may trash 1 card from the top or bottom of your Life cards: Reveal up to 1 Character card with a cost of 5 from your hand and add it to the top of your Life cards face-down.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashLife",
            amount: 1,
            position: "choice",
          },
        ],
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
            },
            position: "top",
            previousActionTargets: true,
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: st13EmporioIvankov005I18n,
};
