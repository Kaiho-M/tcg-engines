import type { EventCard } from "@tcg/op-types";
import { op15eb04GumGumGoldenRifle116I18n } from "./116-gum-gum-golden-rifle.i18n.ts";

export const op15eb04GumGumGoldenRifle116: EventCard = {
  id: "OP15-116",
  canonicalId: "OP15-116",
  slug: "gum-gum-golden-rifle",
  name: "Gum-Gum Golden Rifle",
  printings: [
    {
      id: "OP15-116",
      artId: "OP15-116",
      setCode: "OP15EB04",
      collectorNumber: "116",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-116.png",
    },
    {
      id: "OP15-116_p1",
      artId: "OP15-116_p1",
      setCode: "OP15EB04",
      collectorNumber: "116",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-116_p1.png",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 1,
  traits: ["Sky Island", "Straw Hat Crew"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-116_p1.png",
      imageId: "OP15-116_p1",
    },
  ],
  effect:
    "[Main] If your Leader has the {Straw Hat Crew} type, trash 1 card from the top of your Life cards. Then, add up to 1 card from the top of your deck to the top of your Life cards and trash 1 card from your hand.\n[Counter] Your Leader gains +4000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "main",
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Straw Hat Crew",
            match: "includes",
          },
        ],
        actions: [
          {
            action: "removeFromLife",
            player: "self",
            count: {
              amount: 1,
            },
            destination: "trash",
          },
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
          {
            action: "trashFromHand",
            player: "self",
            amount: 1,
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
            value: 4000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: op15eb04GumGumGoldenRifle116I18n,
};
