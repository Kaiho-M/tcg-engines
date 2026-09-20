import type { LeaderCard } from "@tcg/op-types";
import { st30LuffyAce001I18n } from "./001-luffy-ace.i18n.ts";

export const st30LuffyAce001: LeaderCard = {
  id: "ST30-001",
  canonicalId: "ST30-001",
  slug: "luffy-ace",
  name: "Luffy & Ace",
  printings: [
    {
      id: "ST30-001",
      artId: "ST30-001",
      setCode: "ST30",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-001.png",
    },
    {
      id: "ST30-001_p1",
      artId: "ST30-001_p1",
      setCode: "ST30",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-001_p1.png",
    },
  ],
  cardType: "leader",
  color: ["red", "green"],
  rarity: "L",
  setId: "ST30",
  power: 6000,
  life: 4,
  traits: ["Impel Down", "Whitebeard Pirates", "Straw Hat Crew"],
  attribute: ["strike", "special"],
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST30-001_p1.png",
      imageId: "ST30-001_p1",
    },
  ],
  effect:
    "If you have a Character with 7000 base power or more, give this Leader −2000 power.\n[Opponent's Turn] All of your [Portgas.D.Ace] and [Monkey.D.Luffy] cards gain +3000 power.",
  effects: {
    permanentEffects: [
      {
        conditions: [
          {
            condition: "hasCard",
            player: "self",
            zone: "character",
            filters: [
              {
                filter: "basePower",
                comparison: "gte",
                value: 7000,
              },
            ],
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: "all",
              },
              self: true,
            },
            value: -2000,
            duration: "permanent",
          },
        ],
      },
      {
        conditions: [
          {
            condition: "turn",
            value: "opponent",
          },
        ],
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader", "character"],
              count: {
                amount: "all",
              },
              filters: [
                {
                  filter: "anyOf",
                  filters: [
                    {
                      filter: "name",
                      value: "Portgas.D.Ace",
                    },
                    {
                      filter: "name",
                      value: "Monkey.D.Luffy",
                    },
                  ],
                },
              ],
            },
            value: 3000,
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: st30LuffyAce001I18n,
};
