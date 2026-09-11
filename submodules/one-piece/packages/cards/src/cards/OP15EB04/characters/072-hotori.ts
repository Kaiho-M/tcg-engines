import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Hotori072I18n } from "./072-hotori.i18n.ts";

export const op15eb04Hotori072: CharacterCard = {
  id: "OP15-072",
  canonicalId: "OP15-072",
  slug: "hotori/op15-072",
  name: "Hotori",
  printings: [
    {
      id: "OP15-072",
      artId: "OP15-072",
      setCode: "OP15EB04",
      collectorNumber: "072",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-072_XRudesu.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Sky Island"],
  attribute: "special",
  effect:
    "[Activate: Main] DON!! 2, You may rest this Character: If you have [Kotori] and [Satori], give up to 1 of your opponent's Characters −3000 power during this turn.",
  i18n: op15eb04Hotori072I18n,
};
