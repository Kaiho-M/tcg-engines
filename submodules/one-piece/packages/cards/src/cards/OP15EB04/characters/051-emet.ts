import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Emet051I18n } from "./051-emet.i18n.ts";

export const op15eb04Emet051: CharacterCard = {
  id: "EB04-051",
  canonicalId: "EB04-051",
  slug: "emet",
  name: "Emet",
  printings: [
    {
      id: "EB04-051",
      artId: "EB04-051",
      setCode: "OP15EB04",
      collectorNumber: "051",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-051.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 8,
  power: 7000,
  trigger:
    "Give all of your opponent's Characters −3000 power during this turn. Then, if you have 0 Life cards, play this card.",
  traits: ["Egghead"],
  attribute: "strike",
  effect: "This Character cannot attack unless there is a Character with 12000 base power or more.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: "all",
              },
            },
            value: -3000,
            duration: "thisTurn",
          },
          {
            action: "playThisCard",
            condition: {
              condition: "lifeCount",
              player: "self",
              comparison: "eq",
              value: 0,
            },
          },
        ],
      },
    ],
  },
  i18n: op15eb04Emet051I18n,
};
