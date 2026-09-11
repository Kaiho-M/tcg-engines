import type { LeaderCard } from "@tcg/op-types";
import { op16Sengoku060I18n } from "./060-sengoku.i18n.ts";

export const op16Sengoku060: LeaderCard = {
  id: "OP16-060",
  canonicalId: "OP16-060",
  slug: "sengoku/op16-060",
  name: "Sengoku",
  printings: [
    {
      id: "OP16-060",
      artId: "OP16-060",
      setCode: "OP16",
      collectorNumber: "060",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-060_VSwFbaU.jpg",
    },
    {
      id: "OP16-060_p1",
      artId: "OP16-060_p1",
      setCode: "OP16",
      collectorNumber: "060",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-060_p1_p1nmfF3.jpg",
    },
  ],
  cardType: "leader",
  color: ["purple"],
  rarity: "L",
  setId: "OP16",
  power: 5000,
  life: 5,
  traits: ["Navy"],
  attribute: "wisdom",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-060_p1_p1nmfF3.jpg",
      imageId: "OP16-060_p1",
    },
  ],
  effect:
    "[Activate: Main] You may return 8 of your active DON!! cards to your DON!! deck: Play up to 3 {Admiral} type Character cards with different card names from your hand.",
  i18n: op16Sengoku060I18n,
};
