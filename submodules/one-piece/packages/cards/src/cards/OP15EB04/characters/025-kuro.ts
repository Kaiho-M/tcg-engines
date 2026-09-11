import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Kuro025I18n } from "./025-kuro.i18n.ts";

export const op15eb04Kuro025: CharacterCard = {
  id: "OP15-025",
  canonicalId: "OP15-025",
  slug: "kuro/op15-025",
  name: "Kuro",
  printings: [
    {
      id: "OP15-025",
      artId: "OP15-025",
      setCode: "OP15EB04",
      collectorNumber: "025",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-025_ERyGR2X.jpg",
    },
    {
      id: "OP15-025_p1",
      artId: "OP15-025_p1",
      setCode: "OP15EB04",
      collectorNumber: "025",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-025_p1_VNRkO3g.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 7,
  power: 7000,
  counter: 1000,
  traits: ["East Blue Black Cat Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-025_p1_VNRkO3g.jpg",
      imageId: "OP15-025_p1",
    },
  ],
  effect:
    "[Blocker]\n[On Play] Give up to 2 DON!! cards from your opponent's cost area to 1 of your opponent's Characters. Then, at the end of this turn, up to 1 rested Character with 3 or more DON!! cards given will not become active in your opponent's next Refresh Phase.",
  effects: {
    keywords: ["blocker"],
  },
  i18n: op15eb04Kuro025I18n,
};
