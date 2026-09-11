import type { LeaderCard } from "@tcg/op-types";
import { op15eb04Lucy002I18n } from "./002-lucy.i18n.ts";

export const op15eb04Lucy002: LeaderCard = {
  id: "OP15-002",
  canonicalId: "OP15-002",
  slug: "lucy/op15-002",
  name: "Lucy",
  printings: [
    {
      id: "OP15-002",
      artId: "OP15-002",
      setCode: "OP15EB04",
      collectorNumber: "002",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-002_9JJSMVX.jpg",
    },
    {
      id: "OP15-002_p1",
      artId: "OP15-002_p1",
      setCode: "OP15EB04",
      collectorNumber: "002",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-002_p1_bm75Dds.jpg",
    },
  ],
  cardType: "leader",
  color: ["blue", "red"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 4,
  traits: ["Revolutionary Army Dressrosa"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-002_p1_bm75Dds.jpg",
      imageId: "OP15-002_p1",
    },
  ],
  effect:
    "[When Attacking]/[On Your Opponent's Attack] You may trash any number of Event or Stage cards from your hand. This Leader gains +1000 power during this battle for every card trashed.\n[Activate: Main] [Once Per Turn] If you have activated an Event with a base cost of 3 or more during this turn, draw 1 card.",
  i18n: op15eb04Lucy002I18n,
};
