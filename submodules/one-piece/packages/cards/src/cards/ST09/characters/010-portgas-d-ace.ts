import type { CharacterCard } from "@tcg/op-types";
import { st09PortgasDAce010I18n } from "./010-portgas-d-ace.i18n.ts";

export const st09PortgasDAce010: CharacterCard = {
  id: "ST09-010",
  canonicalId: "ST09-010",
  slug: "portgas-d-ace/st09-010",
  name: "Portgas.D.Ace",
  printings: [
    {
      id: "ST09-010",
      artId: "ST09-010",
      setCode: "ST09",
      collectorNumber: "010",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST09-010.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "ST09",
  cost: 6,
  power: 7000,
  traits: ["Land of Wano", "Whitebeard Pirates"],
  attribute: "special",
  effect:
    "[Once Per Turn] If this Character would be K.O.'d, you may trash 1 card from the top or bottom of your Life cards instead.",
  i18n: st09PortgasDAce010I18n,
};
