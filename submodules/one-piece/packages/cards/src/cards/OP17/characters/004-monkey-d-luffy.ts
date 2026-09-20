import type { CharacterCard } from "@tcg/op-types";
import { op17MonkeyDLuffy004I18n } from "./004-monkey-d-luffy.i18n.ts";

export const op17MonkeyDLuffy004: CharacterCard = {
  id: "ST31-004",
  canonicalId: "ST31-004",
  slug: "monkey-d-luffy/st31-004",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "ST31-004",
      artId: "ST31-004_p1",
      setCode: "OP17",
      collectorNumber: "004",
      rarity: "SP",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST31-004_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SP",
  setId: "OP17",
  cost: 7,
  power: 9000,
  traits: ["The Four Emperors", "Straw Hat Crew"],
  attribute: "strike",
  effect:
    "If you have a total of 3 or more given DON!! cards, this Character gains [Rush].\n(This card can attack on the turn in which it is played.)\n[On Play] For every {Straw Hat Crew} type card on your field, give up to 1 of your opponent's Characters −1000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            value: -1000,
            valuePerCardGroup: {
              size: 1,
              target: {
                player: "self",
                zones: ["leader", "character", "stage"],
                count: {
                  amount: "all",
                },
                filters: [
                  {
                    filter: "trait",
                    value: "Straw Hat Crew",
                    match: "includes",
                  },
                ],
              },
            },
            duration: "thisTurn",
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "givenDonCount",
            player: "self",
            comparison: "gte",
            value: 3,
          },
        ],
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            keyword: "rush",
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op17MonkeyDLuffy004I18n,
};
