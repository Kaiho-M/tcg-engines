import type { CharacterCard } from "@tcg/op-types";
import { op17Kaido063I18n } from "./063-kaido.i18n.ts";

export const op17Kaido063: CharacterCard = {
  id: "OP17-063",
  canonicalId: "OP17-063",
  slug: "kaido/op17-063",
  name: "Kaido",
  printings: [
    {
      id: "OP17-063",
      artId: "OP17-063",
      setCode: "OP17",
      collectorNumber: "063",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-063_rHqjXa5.jpg",
    },
    {
      id: "OP17-063_p1",
      artId: "OP17-063_p1",
      setCode: "OP17",
      collectorNumber: "063",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-063_p1_cE0dG6Y.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "SR",
  setId: "OP17",
  cost: 10,
  power: 12000,
  traits: ["Animal Kingdom Pirates The Four Emperors"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-063_p1_cE0dG6Y.jpg",
      imageId: "OP17-063_p1",
    },
  ],
  effect:
    "All Character cards in your hand without a Counter have a +1000 Counter.\n[Activate: Main] [Once Per Turn] DON!! -1: If this Character was played on this turn, negate the effect of up to 1 of your opponent's Characters with a cost of 6 or less during this turn, and K.O. it.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        costs: [
          {
            cost: "returnDon",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "conditional",
            predicate: {
              condition: "playedThisTurn",
            },
            whenTrue: [
              {
                action: "negateEffects",
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
                      value: 6,
                    },
                  ],
                },
                duration: "thisTurn",
              },
              {
                action: "ko",
                target: {
                  player: "opponent",
                  zones: ["character"],
                  count: {
                    amount: 1,
                  },
                },
              },
            ],
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op17Kaido063I18n,
};
