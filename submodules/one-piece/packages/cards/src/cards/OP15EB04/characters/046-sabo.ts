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
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-046.png",
    },
    {
      id: "OP15-046_p1",
      artId: "OP15-046_p1",
      setCode: "OP15EB04",
      collectorNumber: "046",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-046_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 7,
  power: 9000,
  traits: ["Dressrosa", "Revolutionary Army"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-046_p1.png",
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
