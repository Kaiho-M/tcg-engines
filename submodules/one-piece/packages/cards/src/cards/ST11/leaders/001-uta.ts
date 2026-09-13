import type { LeaderCard } from "@tcg/op-types";
import { st11Uta001I18n } from "./001-uta.i18n.ts";

export const st11Uta001: LeaderCard = {
  id: "ST11-001",
  canonicalId: "ST11-001",
  slug: "uta/st11-001",
  name: "Uta",
  printings: [
    {
      id: "ST11-001",
      artId: "ST11-001",
      setCode: "ST11",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST11-001.png",
    },
  ],
  cardType: "leader",
  color: ["green"],
  rarity: "L",
  setId: "ST11",
  power: 5000,
  life: 5,
  traits: ["FILM"],
  attribute: "special",
  effect:
    "[DON!! x1] [When Attacking] [Once Per Turn] Reveal 1 card from the top of your deck and add up to 1 {FILM} type card to your hand. Then, place the rest at the bottom of your deck.",
  effects: {
    effects: [
      {
        trigger: "whenAttacking",
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "revealFromDeck",
            player: "self",
            count: 1,
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: st11Uta001I18n,
};
