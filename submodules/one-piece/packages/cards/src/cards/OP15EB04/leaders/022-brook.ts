import type { LeaderCard } from "@tcg/op-types";
import { op15eb04Brook022I18n } from "./022-brook.i18n.ts";

export const op15eb04Brook022: LeaderCard = {
  id: "OP15-022",
  canonicalId: "OP15-022",
  slug: "brook/op15-022",
  name: "Brook",
  printings: [
    {
      id: "OP15-022",
      artId: "OP15-022",
      setCode: "OP15EB04",
      collectorNumber: "022",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-022.jpg",
    },
    {
      id: "OP15-022_p1",
      artId: "OP15-022_p1",
      setCode: "OP15EB04",
      collectorNumber: "022",
      rarity: "L",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-022_p1.jpg",
    },
  ],
  cardType: "leader",
  color: ["green", "black"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 4,
  traits: ["Straw Hat Crew"],
  attribute: "slash",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-022_p1.jpg",
      imageId: "OP15-022_p1",
    },
  ],
  effect:
    "Under the rules of this game, you do not lose when your deck has 0 cards. You lose at the end of the turn in which your deck becomes 0 cards. [Activate: Main] [Once Per Turn] Trash 4 cards from the top of your deck. Then, if your deck has 0 cards, set up to 1 of your Characters as active.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        actions: [
          {
            action: "trashFromDeck",
            player: "self",
            amount: 4,
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op15eb04Brook022I18n,
};
