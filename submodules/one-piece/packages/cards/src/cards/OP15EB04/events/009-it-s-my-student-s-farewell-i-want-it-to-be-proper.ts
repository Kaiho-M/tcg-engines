import type { EventCard } from "@tcg/op-types";
import { op15eb04ItSMyStudentSFarewellIWantItToBeProper009I18n } from "./009-it-s-my-student-s-farewell-i-want-it-to-be-proper.i18n.ts";

export const op15eb04ItSMyStudentSFarewellIWantItToBeProper009: EventCard = {
  id: "EB04-009",
  canonicalId: "EB04-009",
  slug: "it-s-my-student-s-farewell-i-want-it-to-be-proper",
  name: "It's My Student's Farewell. I Want It to Be Proper.",
  printings: [
    {
      id: "EB04-009",
      artId: "EB04-009",
      setCode: "OP15EB04",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-009.png",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 0,
  traits: ["Former Roger Pirates"],
  effect:
    "[Main] You may give 1 active DON!! card to 1 of your [Silvers Rayleigh]: Give up to 1 of your opponent's Characters −2000 power during this turn.\n[Counter] Up to 1 of your Characters or [Silvers Rayleigh] gains +2000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "counter",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "anyOf",
                  groups: [
                    [
                      {
                        filter: "cardCategory",
                        value: "character",
                      },
                    ],
                    [
                      {
                        filter: "name",
                        value: "Silvers Rayleigh",
                      },
                    ],
                  ],
                },
              ],
            },
            value: 2000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: op15eb04ItSMyStudentSFarewellIWantItToBeProper009I18n,
};
