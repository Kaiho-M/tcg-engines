import type { LeaderCard } from "@tcg/op-types";
import { st13Sabo001I18n } from "./001-sabo.i18n.ts";

export const st13Sabo001: LeaderCard = {
  id: "ST13-001",
  canonicalId: "ST13-001",
  slug: "sabo/st13-001",
  name: "Sabo",
  printings: [
    {
      id: "ST13-001",
      artId: "ST13-001",
      setCode: "ST13",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-001.png",
    },
    {
      id: "ST13-001_p1",
      artId: "ST13-001_p1",
      setCode: "ST13",
      collectorNumber: "001",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-001_p1.png",
    },
  ],
  cardType: "leader",
  color: ["red", "yellow"],
  rarity: "L",
  setId: "ST13",
  power: 5000,
  life: 4,
  traits: ["Dressrosa", "Revolutionary Army"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-001_p1.png",
      imageId: "ST13-001_p1",
    },
  ],
  effect:
    "[DON!! x1] [Activate: Main] [Once Per Turn] You may add 1 of your Characters with a cost of 3 or more and 7000 power or more to the top of your Life cards face-up: Up to 1 of your Characters gains +2000 power until the start of your next turn.",
  i18n: st13Sabo001I18n,
};
