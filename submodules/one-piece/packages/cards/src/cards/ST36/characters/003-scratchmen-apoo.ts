import type { CharacterCard } from "@tcg/op-types";
import { st36ScratchmenApoo003I18n } from "./003-scratchmen-apoo.i18n.ts";

export const st36ScratchmenApoo003: CharacterCard = {
  id: "ST36-003",
  canonicalId: "ST36-003",
  slug: "scratchmen-apoo/st36-003",
  name: "Scratchmen Apoo",
  printings: [
    {
      id: "ST36-003",
      artId: "ST36-003",
      setCode: "ST36",
      collectorNumber: "003",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST36-003.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST36",
  cost: 4,
  power: 4000,
  counter: 2000,
  trigger:
    "Draw 1 card and your {Supernovas} type Leader's base power becomes 7000 during this turn.",
  traits: ["Supernovas", "On-Air Pirates"],
  attribute: "ranged",
  effect:
    "[Trigger] Draw 1 card and your {Supernovas} type Leader's base power becomes 7000 during this turn.",
  i18n: st36ScratchmenApoo003I18n,
};
