import type { LeaderCard } from "@tcg/op-types";
import { op15eb04MonkeyDLuffy098I18n } from "./098-monkey-d-luffy.i18n.ts";

export const op15eb04MonkeyDLuffy098: LeaderCard = {
  id: "OP15-098",
  canonicalId: "OP15-098",
  slug: "monkey-d-luffy/op15-098",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP15-098",
      artId: "OP15-098",
      setCode: "OP15EB04",
      collectorNumber: "098",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-098_JhOEeQ0.jpg",
    },
    {
      id: "OP15-098_p1",
      artId: "OP15-098_p1",
      setCode: "OP15EB04",
      collectorNumber: "098",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-098_p1_vHsa8gH.jpg",
    },
  ],
  cardType: "leader",
  color: ["yellow"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 5,
  traits: ["Straw Hat Crew Sky Island"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-098_p1_vHsa8gH.jpg",
      imageId: "OP15-098_p1",
    },
  ],
  effect:
    "If your {Sky Island} type Character with 6000 base power or more would be removed from the field by your opponent, you may add 1 card from the top of your Life cards to your hand instead.",
  effects: {
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        target: {
          player: "self",
          zones: ["character"],
          count: {
            amount: 1,
          },
          filters: [
            {
              filter: "trait",
              value: "Sky Island",
              match: "includes",
            },
            {
              filter: "basePower",
              comparison: "gte",
              value: 6000,
            },
          ],
        },
        replacementAction: {
          action: "removeFromLife",
          player: "self",
          count: {
            amount: 1,
          },
          destination: "hand",
          position: "top",
        },
      },
    ],
  },
  i18n: op15eb04MonkeyDLuffy098I18n,
};
