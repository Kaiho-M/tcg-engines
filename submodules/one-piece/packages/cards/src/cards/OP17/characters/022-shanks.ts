import type { CharacterCard } from "@tcg/op-types";
import { op17Shanks022I18n } from "./022-shanks.i18n.ts";

export const op17Shanks022: CharacterCard = {
  id: "OP17-022",
  canonicalId: "OP17-022",
  slug: "shanks/op17-022",
  name: "Shanks",
  printings: [
    {
      id: "OP17-022",
      artId: "OP17-022",
      setCode: "OP17",
      collectorNumber: "022",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-022_sTZjYso.jpg",
    },
    {
      id: "OP17-022_p1",
      artId: "OP17-022_p1",
      setCode: "OP17",
      collectorNumber: "022",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-022_p1_KiACYS0.jpg",
    },
    {
      id: "OP17-022_p2",
      artId: "OP17-022_p2",
      setCode: "OP17",
      collectorNumber: "022",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-022_p2.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SR",
  setId: "OP17",
  cost: 10,
  power: 12000,
  traits: ["The Four Emperors Red-Haired Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-022_p1_KiACYS0.jpg",
      imageId: "OP17-022_p1",
    },
    {
      type: "manga-rare",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-022_p2.jpg",
      imageId: "OP17-022_p2",
    },
  ],
  effect:
    "[Rush] (This card can attack on the turn in which it is played.)\n[On Play] Set up to 2 of your DON!! cards as active. Then, rest all of your opponent's Characters.",
  effects: {
    keywords: ["rush"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["costArea"],
              count: {
                amount: 2,
                upTo: true,
              },
            },
          },
          {
            action: "rest",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: "all",
              },
            },
          },
        ],
      },
    ],
  },
  i18n: op17Shanks022I18n,
};
