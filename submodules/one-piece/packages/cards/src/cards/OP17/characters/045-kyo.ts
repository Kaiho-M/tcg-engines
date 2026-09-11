import type { CharacterCard } from "@tcg/op-types";
import { op17Kyo045I18n } from "./045-kyo.i18n.ts";

export const op17Kyo045: CharacterCard = {
  id: "OP17-045",
  canonicalId: "OP17-045",
  slug: "kyo",
  name: "Kyo",
  printings: [
    {
      id: "OP17-045",
      artId: "OP17-045",
      setCode: "OP17",
      collectorNumber: "045",
      rarity: "UC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-045_jHQDLDk.jpg",
    },
    {
      id: "OP17-045",
      artId: "OP17-045",
      setCode: "OP17",
      collectorNumber: "045",
      rarity: "UC",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-045_Sfd2qcU.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "UC",
  setId: "OP17",
  cost: 2,
  power: 4000,
  traits: ["Rocks Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-045_Sfd2qcU.jpg",
      imageId: "OP17-045",
    },
  ],
  effect:
    "If one of your Characters would be removed from the field by your opponent's effect, you may trash 2 cards from your hand instead.\n\n[On Play] Draw 1 card.",
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
  i18n: op17Kyo045I18n,
};
