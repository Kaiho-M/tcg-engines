import type { EventCard } from "@tcg/op-types";
import { op15eb04ILlWhipYouIntoShape050I18n } from "./050-i-ll-whip-you-into-shape.i18n.ts";

export const op15eb04ILlWhipYouIntoShape050: EventCard = {
  id: "EB04-050",
  canonicalId: "EB04-050",
  slug: "i-ll-whip-you-into-shape",
  name: "I'll Whip You Into Shape. ♡",
  printings: [
    {
      id: "EB04-050",
      artId: "EB04-050",
      setCode: "OP15EB04",
      collectorNumber: "050",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-050.png",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 1,
  traits: ["Navy", "SWORD"],
  effect:
    "[Main] Up to 1 of your {SWORD} type Leader or Character cards can also attack active Characters during this turn.\n[Counter] Your Leader gains +3000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        actions: [
          {
            action: "canAttackActive",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "trait",
                  value: "SWORD",
                  match: "includes",
                },
              ],
            },
            duration: "thisTurn",
          },
        ],
      },
      {
        trigger: "counter",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
            },
            value: 3000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: op15eb04ILlWhipYouIntoShape050I18n,
};
