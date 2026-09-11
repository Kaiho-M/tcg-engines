import type { CharacterCard } from "@tcg/op-types";
import { op17Yasopp031I18n } from "./031-yasopp.i18n.ts";

export const op17Yasopp031: CharacterCard = {
  id: "OP17-031",
  canonicalId: "OP17-031",
  slug: "yasopp/op17-031",
  name: "Yasopp",
  printings: [
    {
      id: "OP17-031",
      artId: "OP17-031",
      setCode: "OP17",
      collectorNumber: "031",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-031_GaiJBWQ.jpg",
    },
    {
      id: "OP17-031_p1",
      artId: "OP17-031_p1",
      setCode: "OP17",
      collectorNumber: "031",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-031_p1_NVOGP7a.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SR",
  setId: "OP17",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Red-Haired Pirates"],
  attribute: "ranged",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-031_p1_NVOGP7a.jpg",
      imageId: "OP17-031_p1",
    },
  ],
  effect:
    '[On Play] Draw 1 card and rest up to 1 of your opponent\'s Characters with a cost of 8 or less.\n[End of Your Turn] Set up to 1 of your Characters with a type including "Red-Haired Pirates" as active.',
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
            action: "rest",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "cost",
                  comparison: "lte",
                  value: 8,
                },
              ],
            },
          },
        ],
      },
      {
        trigger: "endOfYourTurn",
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "trait",
                  value: "Red-Haired Pirates",
                  match: "includes",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  i18n: op17Yasopp031I18n,
};
