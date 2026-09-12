import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Nami086I18n } from "./086-nami.i18n.ts";

export const op15eb04Nami086: CharacterCard = {
  id: "OP15-086",
  canonicalId: "OP15-086",
  slug: "nami/op15-086",
  name: "Nami",
  printings: [
    {
      id: "OP15-086",
      artId: "OP15-086",
      setCode: "OP15EB04",
      collectorNumber: "086",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-086.png",
    },
    {
      id: "OP15-086_p1",
      artId: "OP15-086_p1",
      setCode: "OP15EB04",
      collectorNumber: "086",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-086_p1.png",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 8,
  power: 6000,
  traits: ["Straw Hat Crew"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-086_p1.png",
      imageId: "OP15-086_p1",
    },
  ],
  effect:
    "[On Play] If your Leader has the {Straw Hat Crew} type, play up to 1 {Straw Hat Crew} type Character with a cost of 7 or less from your trash. The Character played with this effect gains [Rush] during this turn.",
  i18n: op15eb04Nami086I18n,
};
