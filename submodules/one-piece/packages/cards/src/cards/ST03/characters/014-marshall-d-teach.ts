import type { CharacterCard } from "@tcg/op-types";
import { st03MarshallDTeach014I18n } from "./014-marshall-d-teach.i18n.ts";

export const st03MarshallDTeach014: CharacterCard = {
  id: "ST03-014",
  canonicalId: "ST03-014",
  slug: "marshall-d-teach/st03-014",
  name: "Marshall.D.Teach",
  printings: [
    {
      id: "ST03-014",
      artId: "ST03-014",
      setCode: "ST03",
      collectorNumber: "014",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-014.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 4,
  power: 4000,
  counter: 1000,
  traits: ["The Seven Warlords of the Sea", "Blackbeard Pirates"],
  attribute: "special",
  effect: "[On Play] Return up to 1 Character with a cost of 3 or less to the owner's hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "returnToHand",
            target: {
              player: "any",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 3,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: st03MarshallDTeach014I18n,
};
