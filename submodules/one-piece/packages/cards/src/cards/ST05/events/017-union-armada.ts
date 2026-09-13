import type { EventCard } from "@tcg/op-types";
import { st05UnionArmada017I18n } from "./017-union-armada.i18n.ts";

export const st05UnionArmada017: EventCard = {
  id: "ST05-017",
  canonicalId: "ST05-017",
  slug: "union-armada",
  name: "Union Armada",
  printings: [
    {
      id: "ST05-017",
      artId: "ST05-017",
      setCode: "ST05",
      collectorNumber: "017",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST05-017.png",
    },
  ],
  cardType: "event",
  color: ["purple"],
  rarity: "C",
  setId: "ST05",
  cost: 2,
  trigger: "Add up to 1 DON!! card from your DON!! deck and set it as active.",
  traits: ["FILM", "The Pirates Fest"],
  effect:
    "[Counter] Up to 1 of your {FILM} type Leader or Character cards gains +4000 power during this battle. If that card is a Character, that Character cannot be K.O.'d during this turn.",
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
                  filter: "trait",
                  value: "FILM",
                  match: "includes",
                },
              ],
            },
            value: 4000,
            duration: "thisBattle",
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "addDon",
            count: {
              amount: 1,
              upTo: true,
            },
            state: "active",
          },
        ],
      },
    ],
  },
  i18n: st05UnionArmada017I18n,
};
