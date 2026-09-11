import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Sabo046I18n } from "./046-sabo.i18n.ts";

export const op15eb04Sabo046: CharacterCard = {
  id: "OP15-046",
  canonicalId: "OP15-046",
  slug: "sabo/op15-046",
  name: "Sabo",
  printings: [
    {
      id: "OP15-046",
      artId: "OP15-046",
      setCode: "OP15EB04",
      collectorNumber: "046",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-046_hRbLfA6.jpg",
    },
    {
      id: "OP15-046_p1",
      artId: "OP15-046_p1",
      setCode: "OP15EB04",
      collectorNumber: "046",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-046_p1_Zpqnbqv.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 7,
  power: 9000,
  traits: ["Revolutionary Army Dressrosa"],
  attribute: "special",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-046_p1_Zpqnbqv.jpg",
      imageId: "OP15-046_p1",
    },
  ],
  effect:
    "[Blocker]\n[On Play] If your Leader has the {Dressrosa} type, activate up to 1 {Dressrosa} type Event from your hand.",
  effects: {
    keywords: ["blocker"],
  },
  i18n: op15eb04Sabo046I18n,
};
