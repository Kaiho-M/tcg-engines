import type { LeaderCard } from "@tcg/op-types";
import { st13PortgasDAce002I18n } from "./002-portgas-d-ace.i18n.ts";

export const st13PortgasDAce002: LeaderCard = {
  id: "ST13-002",
  canonicalId: "ST13-002",
  slug: "portgas-d-ace/st13-002",
  name: "Portgas.D.Ace",
  printings: [
    {
      id: "ST13-002",
      artId: "ST13-002",
      setCode: "ST13",
      collectorNumber: "002",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-002.png",
    },
    {
      id: "ST13-002_p1",
      artId: "ST13-002_p1",
      setCode: "ST13",
      collectorNumber: "002",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-002_p1.png",
    },
  ],
  cardType: "leader",
  color: ["blue", "yellow"],
  rarity: "L",
  setId: "ST13",
  power: 5000,
  life: 4,
  traits: ["Whitebeard Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-002_p1.png",
      imageId: "ST13-002_p1",
    },
  ],
  effect:
    "[DON!! x2] [Activate: Main] [Once Per Turn] Look at 5 cards from the top of your deck and add up to 1 Character card with a cost of 5 to the top of your Life cards face-up. Then, place the rest at the bottom of your deck in any order.\n[End of Your Turn] Trash all your face-up Life cards.",
  i18n: st13PortgasDAce002I18n,
};
