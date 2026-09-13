import type { CharacterCard } from "@tcg/op-types";
import { st03BartholomewKuma010I18n } from "./010-bartholomew-kuma.i18n.ts";

export const st03BartholomewKuma010: CharacterCard = {
  id: "ST03-010",
  canonicalId: "ST03-010",
  slug: "bartholomew-kuma/st03-010",
  name: "Bartholomew Kuma",
  printings: [
    {
      id: "ST03-010",
      artId: "ST03-010",
      setCode: "ST03",
      collectorNumber: "010",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-010.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 2,
  power: 3000,
  trigger: "Play this card.",
  traits: ["The Seven Warlords of the Sea", "Revolutionary Army"],
  attribute: "strike",
  effect:
    "[On Play] Look at 3 cards from the top of your deck and return them to the top or bottom of the deck in any order.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
    ],
  },
  i18n: st03BartholomewKuma010I18n,
};
