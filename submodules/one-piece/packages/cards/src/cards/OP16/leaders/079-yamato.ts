import type { LeaderCard } from "@tcg/op-types";
import { op16Yamato079I18n } from "./079-yamato.i18n.ts";

export const op16Yamato079: LeaderCard = {
  id: "OP16-079",
  canonicalId: "OP16-079",
  slug: "yamato/op16-079",
  name: "Yamato",
  printings: [
    {
      id: "OP16-079",
      artId: "OP16-079",
      setCode: "OP16",
      collectorNumber: "079",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-079_9Me7LN0.jpg",
    },
    {
      id: "OP16-079_p1",
      artId: "OP16-079_p1",
      setCode: "OP16",
      collectorNumber: "079",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-079_p1_649YLmm.jpg",
    },
  ],
  cardType: "leader",
  color: ["black"],
  rarity: "L",
  setId: "OP16",
  power: 5000,
  life: 5,
  traits: ["Land of Wano"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-079_p1_649YLmm.jpg",
      imageId: "OP16-079_p1",
    },
  ],
  effect:
    "When a {Land of Wano} type Character card is played from your trash, that Character gains [Rush] during this turn.\n(This card can attack on the turn in which it is played.)",
  i18n: op16Yamato079I18n,
};
