import type { CharacterCard } from "@tcg/op-types";
import { op17RocksDXebec118I18n } from "./118-rocks-d-xebec.i18n.ts";

export const op17RocksDXebec118: CharacterCard = {
  id: "OP17-118",
  canonicalId: "OP17-118",
  slug: "rocks-d-xebec/op17-118",
  name: "Rocks.D.Xebec",
  printings: [
    {
      id: "OP17-118",
      artId: "OP17-118",
      setCode: "OP17",
      collectorNumber: "118",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-118.png",
    },
    {
      id: "OP17-118_p1",
      artId: "OP17-118_p1",
      setCode: "OP17",
      collectorNumber: "118",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-118_p1.png",
    },
    {
      id: "OP17-118_p2",
      artId: "OP17-118_p2",
      setCode: "OP17",
      collectorNumber: "118",
      rarity: "SEC",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-118_p2.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SEC",
  setId: "OP17",
  cost: 10,
  power: 12000,
  traits: ["Rocks Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-118_p1.png",
      imageId: "OP17-118_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-118_p2.png",
      imageId: "OP17-118_p2",
    },
  ],
  effect:
    "If you only have Characters without a Counter, this card in your hand has a +2000 Counter.\n[On Play] Draw 1 card and play up to 2 {Rocks Pirates} type cards with different card names and a total cost of 9 or less from your hand.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand",
            },
            count: {
              amount: 2,
              upTo: true,
            },
            differentNames: true,
            filters: [
              {
                filter: "trait",
                value: "Rocks Pirates",
                match: "includes",
              },
            ],
          },
        ],
      },
    ],
    permanentEffects: [
      {
        conditions: [
          {
            condition: "notHasCard",
            player: "self",
            zone: "character",
            filters: [
              {
                filter: "counter",
                comparison: "gt",
                value: 0,
              },
            ],
          },
        ],
        actions: [
          {
            action: "modifyCounter",
            target: {
              player: "self",
              zones: ["hand"],
              count: {
                amount: 1,
              },
              self: true,
            },
            value: 2000,
          },
        ],
      },
    ],
  },
  i18n: op17RocksDXebec118I18n,
};
