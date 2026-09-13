import type { CharacterCard } from "@tcg/op-types";
import { st13Shanks009I18n } from "./009-shanks.i18n.ts";

export const st13Shanks009: CharacterCard = {
  id: "ST13-009",
  canonicalId: "ST13-009",
  slug: "shanks/st13-009",
  name: "Shanks",
  printings: [
    {
      id: "ST13-009",
      artId: "ST13-009",
      setCode: "ST13",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-009.png",
    },
    {
      id: "ST13-009_p1",
      artId: "ST13-009_p1",
      setCode: "ST13",
      collectorNumber: "009",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-009_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST13",
  cost: 7,
  power: 7000,
  traits: ["The Four Emperors", "Red-Haired Pirates"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-009_p1.png",
      imageId: "ST13-009_p1",
    },
  ],
  effect:
    "[On Play] You may turn 1 of your face-up Life cards face-down: If your opponent has 7 or more cards in their hand, trash up to 1 card from the top of your opponent's Life cards.",
  i18n: st13Shanks009I18n,
};
