import type { CharacterCard } from "@tcg/op-types";
import { op15eb04RobLucci048I18n } from "./048-rob-lucci.i18n.ts";

export const op15eb04RobLucci048: CharacterCard = {
  id: "EB04-048",
  canonicalId: "EB04-048",
  slug: "rob-lucci/eb04-048",
  name: "Rob Lucci",
  printings: [
    {
      id: "EB04-048",
      artId: "EB04-048",
      setCode: "OP15EB04",
      collectorNumber: "048",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-048.png",
    },
    {
      id: "EB04-048_p1",
      artId: "EB04-048_p1",
      setCode: "OP15EB04",
      collectorNumber: "048",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-048_p1.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 4,
  power: 6000,
  traits: ["Egghead", "CP0"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-048_p1.png",
      imageId: "EB04-048_p1",
    },
  ],
  effect:
    'If your Leader\'s type includes "CP", this Character gains +1000 power and +2 cost for every 5 cards in your trash.\n[On Play] You may trash 1 of your Characters: Draw 1 card.',
  effects: {
    effects: [
      {
        trigger: "onPlay",
        costs: [
          {
            cost: "trashCharacter",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
        optional: true,
      },
    ],
  },
  i18n: op15eb04RobLucci048I18n,
};
