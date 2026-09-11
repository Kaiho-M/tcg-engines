import type { CharacterCard } from "@tcg/op-types";
import { op17Kaido062I18n } from "./062-kaido.i18n.ts";

export const op17Kaido062: CharacterCard = {
  id: "OP17-062",
  canonicalId: "OP17-062",
  slug: "kaido/op17-062",
  name: "Kaido",
  printings: [
    {
      id: "OP17-062",
      artId: "OP17-062",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_mIC3DvV.jpg",
    },
    {
      id: "OP17-062",
      artId: "OP17-062",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_I09XSAq.jpg",
    },
    {
      id: "OP17-062_p1",
      artId: "OP17-062_p1",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_p1_iMGymAQ.jpg",
    },
    {
      id: "OP17-062_p2",
      artId: "OP17-062_p2",
      setCode: "OP17",
      collectorNumber: "062",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_p2.jpg",
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
      type: "other",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_I09XSAq.jpg",
      imageId: "OP17-062",
    },
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_p1_iMGymAQ.jpg",
      imageId: "OP17-062_p1",
    },
    {
      type: "manga-rare",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-062_p2.jpg",
      imageId: "OP17-062_p2",
    },
  ],
  effect:
    "[Blocker]\n[Your Turn] [Once Per Turn] When a DON!! card on your field is returned to your DON!! deck, add up to 1 DON!! card as active from your DON!! deck. Then, set up to 1 of your DON!! cards as active.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "whenDonReturned",
        conditions: [
          {
            condition: "turn",
            value: "your",
          },
        ],
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["costArea"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op17Kaido062I18n,
};
