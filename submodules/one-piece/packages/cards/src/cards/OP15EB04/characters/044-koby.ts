import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Koby044I18n } from "./044-koby.i18n.ts";

export const op15eb04Koby044: CharacterCard = {
  id: "EB04-044",
  canonicalId: "EB04-044",
  slug: "koby/eb04-044",
  name: "Koby",
  printings: [
    {
      id: "EB04-044",
      artId: "EB04-044",
      setCode: "OP15EB04",
      collectorNumber: "044",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-044.png",
    },
    {
      id: "EB04-044_p1",
      artId: "EB04-044_p1",
      setCode: "OP15EB04",
      collectorNumber: "044",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-044_p1.png",
    },
    {
      id: "EB04-044_p2",
      artId: "EB04-044_p2",
      setCode: "OP15EB04",
      collectorNumber: "044",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-044_p2.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 6,
  power: 7000,
  counter: 1000,
  traits: ["Navy", "SWORD"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-044_p1.png",
      imageId: "EB04-044_p1",
    },
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-044_p2.png",
      imageId: "EB04-044_p2",
    },
  ],
  effect:
    "[Once Per Turn] If your Leader's type includes \"Navy\" and this Character would be removed from the field, you may trash 1 card from your hand instead.\n[Your Turn] [Once Per Turn] When your opponent's Character is K.O.'d, draw 1 card.",
  effects: {
    effects: [
      {
        trigger: "whenCharacterKod",
        conditions: [
          {
            condition: "turn",
            value: "your",
          },
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
        oncePerTurn: true,
      },
    ],
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        eventFilter: {
          targetSelf: true,
        },
        replacementAction: {
          action: "trashFromHand",
          player: "self",
          amount: 1,
        },
        conditions: [
          {
            condition: "leaderTrait",
            trait: "Navy",
            match: "includes",
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op15eb04Koby044I18n,
};
