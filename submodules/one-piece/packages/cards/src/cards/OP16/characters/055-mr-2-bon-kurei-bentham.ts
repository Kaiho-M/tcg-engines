import type { CharacterCard } from "@tcg/op-types";
import { op16Mr2BonKureiBentham055I18n } from "./055-mr-2-bon-kurei-bentham.i18n.ts";

export const op16Mr2BonKureiBentham055: CharacterCard = {
  id: "OP16-055",
  canonicalId: "OP16-055",
  slug: "mr-2-bon-kurei-bentham/op16-055",
  name: "Mr.2.Bon.Kurei(Bentham)",
  printings: [
    {
      id: "OP16-055",
      artId: "OP16-055",
      setCode: "OP16",
      collectorNumber: "055",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-055_ZXMaohf.jpg",
    },
    {
      id: "OP16-055_p1",
      artId: "OP16-055_p1",
      setCode: "OP16",
      collectorNumber: "055",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-055_p1_zbCLyxp.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "OP16",
  cost: 2,
  power: 1000,
  traits: ["Impel Down Former Baroque Works"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-055_p1_zbCLyxp.jpg",
      imageId: "OP16-055_p1",
    },
  ],
  effect:
    "[On Play] Draw 1 card.\n[DON!! x1] [When Attacking] This Character's base power becomes the same as your opponent's Leader's power during this turn.",
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
        ],
      },
    ],
  },
  i18n: op16Mr2BonKureiBentham055I18n,
};
