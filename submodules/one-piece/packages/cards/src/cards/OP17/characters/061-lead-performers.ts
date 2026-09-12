import type { CharacterCard } from "@tcg/op-types";
import { op17LeadPerformers061I18n } from "./061-lead-performers.i18n.ts";

export const op17LeadPerformers061: CharacterCard = {
  id: "OP17-061",
  canonicalId: "OP17-061",
  slug: "lead-performers",
  name: "Lead Performers",
  printings: [
    {
      id: "OP17-061",
      artId: "OP17-061",
      setCode: "OP17",
      collectorNumber: "061",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-061.png",
    },
    {
      id: "OP17-061_p1",
      artId: "OP17-061_p1",
      setCode: "OP17",
      collectorNumber: "061",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-061_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "R",
  setId: "OP17",
  cost: 9,
  power: 11000,
  traits: ["Fish-Man", "Animal Kingdom Pirates"],
  attribute: ["strike", "special"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-061_p1.png",
      imageId: "OP17-061_p1",
    },
  ],
  effect:
    "[On Play] DON!! −1: If your Leader has the {Animal Kingdom Pirates} type, add up to 1 card from the top of your deck to the top of your Life cards.\n[Activate: Main] You may trash this Character: Play up to 1 [King], [Queen], or [Jack] from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
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
            condition: {
              condition: "leaderTrait",
              trait: "Animal Kingdom Pirates",
              match: "includes",
            },
          },
        ],
        optional: true,
      },
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "trashThisCard",
          },
        ],
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand",
            },
            count: {
              amount: 1,
              upTo: true,
            },
            filters: [
              {
                filter: "anyOf",
                filters: [
                  {
                    filter: "name",
                    value: "King",
                  },
                  {
                    filter: "name",
                    value: "Queen",
                  },
                  {
                    filter: "name",
                    value: "Jack",
                  },
                ],
              },
            ],
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op17LeadPerformers061I18n,
};
