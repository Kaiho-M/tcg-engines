import type { CharacterCard } from "@tcg/op-types";
import { op17ScratchmenApoo070I18n } from "./070-scratchmen-apoo.i18n.ts";

export const op17ScratchmenApoo070: CharacterCard = {
  id: "OP17-070",
  canonicalId: "OP17-070",
  slug: "scratchmen-apoo/op17-070",
  name: "Scratchmen Apoo",
  printings: [
    {
      id: "OP17-070",
      artId: "OP17-070",
      setCode: "OP17",
      collectorNumber: "070",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-070.png",
    },
    {
      id: "OP17-070_p1",
      artId: "OP17-070_p1",
      setCode: "OP17",
      collectorNumber: "070",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-070_p1.png",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP17",
  cost: 6,
  power: 7000,
  counter: 2000,
  traits: ["On-Air Pirates", "Animal Kingdom Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-070_p1.png",
      imageId: "OP17-070_p1",
    },
  ],
  i18n: op17ScratchmenApoo070I18n,
};
