import type { LeaderCard } from "@tcg/op-types";
import { op16Buggy041I18n } from "./041-buggy.i18n.ts";

export const op16Buggy041: LeaderCard = {
  id: "OP16-041",
  canonicalId: "OP16-041",
  slug: "buggy/op16-041",
  name: "Buggy",
  printings: [
    {
      id: "OP16-041",
      artId: "OP16-041",
      setCode: "OP16",
      collectorNumber: "041",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-041_TbocLEZ.jpg",
    },
    {
      id: "OP16-041_p1",
      artId: "OP16-041_p1",
      setCode: "OP16",
      collectorNumber: "041",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-041_p1_XzwbnlK.jpg",
    },
  ],
  cardType: "leader",
  color: ["blue"],
  rarity: "L",
  setId: "OP16",
  power: 5000,
  life: 5,
  traits: ["Buggy Pirates Impel Down"],
  attribute: "slash",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-041_p1_XzwbnlK.jpg",
      imageId: "OP16-041_p1",
    },
  ],
  effect:
    "[DON!! X1] [Once Per Turn] This effect can be activated when your {Impel Down} type Character card is removed from the field. Play up to 1 [Prisoner of Impel Down] card from your hand.",
  i18n: op16Buggy041I18n,
};
