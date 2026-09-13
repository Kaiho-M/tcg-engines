import type { EventCard } from "@tcg/op-types";
import { st14GumGumGiantRifle014I18n } from "./014-gum-gum-giant-rifle.i18n.ts";

export const st14GumGumGiantRifle014: EventCard = {
  id: "ST14-014",
  canonicalId: "ST14-014",
  slug: "gum-gum-giant-rifle",
  name: "Gum-Gum Giant Rifle",
  printings: [
    {
      id: "ST14-014",
      artId: "ST14-014",
      setCode: "ST14",
      collectorNumber: "014",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST14-014.png",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "C",
  setId: "ST14",
  cost: 1,
  trigger:
    "Add up to 1 of your Character cards with a cost of 2 or less from your trash to your hand.",
  traits: ["Straw Hat Crew"],
  effect:
    "[Counter] If you have a Character with a cost of 8 or more, up to 1 of your Leader or Character cards gains +3000 power during this battle.",
  effects: {
    effects: [
      {
        trigger: "counter",
        conditions: [
          {
            condition: "hasCard",
            player: "self",
            zone: "character",
            filters: [
              {
                filter: "cost",
                comparison: "gte",
                value: 8,
              },
            ],
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
            value: 3000,
            duration: "thisBattle",
          },
        ],
      },
    ],
  },
  i18n: st14GumGumGiantRifle014I18n,
};
