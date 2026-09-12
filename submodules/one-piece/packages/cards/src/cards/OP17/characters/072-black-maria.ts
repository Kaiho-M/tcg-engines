import type { CharacterCard } from "@tcg/op-types";
import { op17BlackMaria072I18n } from "./072-black-maria.i18n.ts";

export const op17BlackMaria072: CharacterCard = {
  id: "OP17-072",
  canonicalId: "OP17-072",
  slug: "black-maria/op17-072",
  name: "Black Maria",
  printings: [
    {
      id: "OP17-072",
      artId: "OP17-072",
      setCode: "OP17",
      collectorNumber: "072",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-072.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP17",
  cost: 2,
  power: 1000,
  counter: 1000,
  traits: ["Animal Kingdom Pirates"],
  attribute: "special",
  effect:
    "[Blocker]\n[On Your Opponent's Attack] [Once Per Turn] You may trash 1 card from your hand: Up to 1 of your Leader or Characters gains +1000 power during this battle.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onOpponentAttack",
        costs: [
          {
            cost: "trashFromHand",
            amount: 1,
          },
        ],
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
            },
            value: 1000,
            duration: "thisBattle",
          },
        ],
        optional: true,
        oncePerTurn: true,
      },
    ],
  },
  i18n: op17BlackMaria072I18n,
};
