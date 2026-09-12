import type { CharacterCard } from "@tcg/op-types";
import { op17MarshallDTeach005I18n } from "./005-marshall-d-teach.i18n.ts";

export const op17MarshallDTeach005: CharacterCard = {
  id: "ST27-005",
  canonicalId: "ST27-005",
  slug: "marshall-d-teach/st27-005",
  name: "Marshall.D.Teach",
  printings: [
    {
      id: "ST27-005",
      artId: "ST27-005_p1",
      setCode: "OP17",
      collectorNumber: "005",
      rarity: "SP",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST27-005_p1.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SP",
  setId: "OP17",
  cost: 7,
  power: 8000,
  traits: ["The Four Emperors", "Blackbeard Pirates"],
  attribute: "special",
  effect:
    "[Activate: Main] You may rest this Character: K.O. up to 1 Character with a cost of 3 or less.\n[On K.O.] Add up to 1 black card from your trash to your hand.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "restThisCard",
          },
        ],
        actions: [
          {
            action: "ko",
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
        optional: true,
      },
    ],
  },
  i18n: op17MarshallDTeach005I18n,
};
