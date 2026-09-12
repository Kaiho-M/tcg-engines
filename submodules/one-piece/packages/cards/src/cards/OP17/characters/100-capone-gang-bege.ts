import type { CharacterCard } from "@tcg/op-types";
import { op17CaponeGangBege100I18n } from "./100-capone-gang-bege.i18n.ts";

export const op17CaponeGangBege100: CharacterCard = {
  id: "OP17-100",
  canonicalId: "OP17-100",
  slug: "capone-gang-bege/op17-100",
  name: 'Capone"Gang"Bege',
  printings: [
    {
      id: "OP17-100",
      artId: "OP17-100",
      setCode: "OP17",
      collectorNumber: "100",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-100.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "OP17",
  cost: 7,
  power: 8000,
  counter: 2000,
  traits: ["Supernovas", "Firetank Pirates"],
  attribute: "ranged",
  i18n: op17CaponeGangBege100I18n,
};
