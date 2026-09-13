import type { CharacterCard } from "@tcg/op-types";
import { st07Prometheus013I18n } from "./013-prometheus.i18n.ts";

export const st07Prometheus013: CharacterCard = {
  id: "ST07-013",
  canonicalId: "ST07-013",
  slug: "prometheus/st07-013",
  name: "Prometheus",
  printings: [
    {
      id: "ST07-013",
      artId: "ST07-013",
      setCode: "ST07",
      collectorNumber: "013",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST07-013.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST07",
  cost: 3,
  power: 3000,
  counter: 1000,
  trigger: "Play this card.",
  traits: ["Big Mom Pirates", "Homies"],
  attribute: "special",
  effect:
    "[Activate: Main] You may rest this Character: Up to 1 of your [Charlotte Linlin] cards gains [Double Attack] during this turn.\n(This card deals 2 damage.)",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restThisCard",
          },
        ],
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "name",
                  value: "Charlotte Linlin",
                },
              ],
            },
            keyword: "doubleAttack",
            duration: "thisTurn",
          },
        ],
        optional: true,
      },
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
  i18n: st07Prometheus013I18n,
};
