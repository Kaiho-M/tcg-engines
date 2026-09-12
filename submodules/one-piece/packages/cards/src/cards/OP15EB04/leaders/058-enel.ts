import type { LeaderCard } from "@tcg/op-types";
import { op15eb04Enel058I18n } from "./058-enel.i18n.ts";

export const op15eb04Enel058: LeaderCard = {
  id: "OP15-058",
  canonicalId: "OP15-058",
  slug: "enel/op15-058",
  name: "Enel",
  printings: [
    {
      id: "OP15-058",
      artId: "OP15-058",
      setCode: "OP15EB04",
      collectorNumber: "058",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-058.png",
    },
    {
      id: "OP15-058_p1",
      artId: "OP15-058_p1",
      setCode: "OP15EB04",
      collectorNumber: "058",
      rarity: "L",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-058_p1.png",
    },
  ],
  cardType: "leader",
  color: ["purple"],
  rarity: "L",
  setId: "OP15EB04",
  power: 5000,
  life: 5,
  traits: ["Sky Island"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP15-058_p1.png",
      imageId: "OP15-058_p1",
    },
  ],
  effect:
    "Under the rules of this game, your DON!! deck consists of 6 cards.\n[Activate: Main] [Once Per Turn] If it is your second turn or later, add up to 1 DON!! card from your DON!! deck and set it as active, and add up to 4 additional DON!! cards and rest them. Then, give up to 4 rested DON!! cards to 1 of your Characters.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        actions: [
          {
            action: "addDon",
            count: {
              amount: 1,
              upTo: true,
            },
            state: "active",
          },
          {
            action: "addDon",
            count: {
              amount: 4,
              upTo: true,
            },
            state: "rested",
          },
          {
            action: "giveDon",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
            },
            count: {
              amount: 4,
              upTo: true,
            },
            donState: "rested",
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op15eb04Enel058I18n,
};
