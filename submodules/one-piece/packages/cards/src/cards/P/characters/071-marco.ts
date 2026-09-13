import type { CharacterCard } from "@tcg/op-types";
import { pMarco071I18n } from "./071-marco.i18n.ts";

export const pMarco071: CharacterCard = {
  id: "P-071",
  canonicalId: "P-071",
  slug: "marco/p-071",
  name: "Marco",
  printings: [
    {
      id: "P-071",
      artId: "P-071",
      setCode: "P",
      collectorNumber: "071",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-071.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "P",
  setId: "P",
  cost: 4,
  power: 6000,
  traits: ["Whitebeard Pirates"],
  attribute: "special",
  effect: "[On K.O.] You may add this Character card to your hand.",
  i18n: pMarco071I18n,
};
