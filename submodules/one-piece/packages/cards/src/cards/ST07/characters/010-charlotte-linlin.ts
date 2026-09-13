import type { CharacterCard } from "@tcg/op-types";
import { st07CharlotteLinlin010I18n } from "./010-charlotte-linlin.i18n.ts";

export const st07CharlotteLinlin010: CharacterCard = {
  id: "ST07-010",
  canonicalId: "ST07-010",
  slug: "charlotte-linlin/st07-010",
  name: "Charlotte Linlin",
  printings: [
    {
      id: "ST07-010",
      artId: "ST07-010",
      setCode: "ST07",
      collectorNumber: "010",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST07-010.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "ST07",
  cost: 7,
  power: 8000,
  traits: ["The Four Emperors", "Big Mom Pirates"],
  attribute: "special",
  effect:
    "[On Play] Your opponent chooses one:\n- Trash 1 card from the top of your opponent's Life cards.\n- Add 1 card from the top of your deck to the top of your Life cards.",
  i18n: st07CharlotteLinlin010I18n,
};
