import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Buggy012I18n } from "./012-buggy.i18n.ts";

export const op15eb04Buggy012: CharacterCard = {
  id: "OP15-012",
  canonicalId: "OP15-012",
  slug: "buggy/op15-012",
  name: "Buggy",
  printings: [
    {
      id: "OP15-012",
      artId: "OP15-012",
      setCode: "OP15EB04",
      collectorNumber: "012",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-012_NMvHtDd.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Buggy Pirates East Blue"],
  attribute: "slash",
  effect:
    "[When Attacking] Give up to 1 rested DON!! card to its owner's Leader or 1 of their Characters.\n[On K.O.] Draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
  },
  i18n: op15eb04Buggy012I18n,
};
