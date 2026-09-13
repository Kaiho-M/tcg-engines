import type { CharacterCard } from "@tcg/op-types";
import { st09KouzukiOden005I18n } from "./005-kouzuki-oden.i18n.ts";

export const st09KouzukiOden005: CharacterCard = {
  id: "ST09-005",
  canonicalId: "ST09-005",
  slug: "kouzuki-oden/st09-005",
  name: "Kouzuki Oden",
  printings: [
    {
      id: "ST09-005",
      artId: "ST09-005",
      setCode: "ST09",
      collectorNumber: "005",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST09-005.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "ST09",
  cost: 7,
  power: 7000,
  traits: ["Land of Wano", "Kouzuki Clan"],
  attribute: "slash",
  effect:
    "[DON!! x1] This Character gains [Double Attack].\n(This card deals 2 damage.)\n[On K.O.] You may trash 2 cards from your hand: Add up to 1 card from the top of your deck to the top of your Life cards.",
  effects: {
    effects: [
      {
        trigger: "onKo",
        costs: [
          {
            cost: "trashFromHand",
            amount: 2,
          },
        ],
        actions: [
          {
            action: "addToLife",
            target: {
              player: "self",
              zones: ["deck"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            position: "top",
          },
        ],
        optional: true,
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
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
            keyword: "doubleAttack",
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: st09KouzukiOden005I18n,
};
