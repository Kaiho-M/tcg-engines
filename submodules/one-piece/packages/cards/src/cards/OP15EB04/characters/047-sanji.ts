import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Sanji047I18n } from "./047-sanji.i18n.ts";

export const op15eb04Sanji047: CharacterCard = {
  id: "OP15-047",
  canonicalId: "OP15-047",
  slug: "sanji/op15-047",
  name: "Sanji",
  printings: [
    {
      id: "OP15-047",
      artId: "OP15-047",
      setCode: "OP15EB04",
      collectorNumber: "047",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-047_bjNeD0t.jpg",
    },
    {
      id: "OP15-047_p1",
      artId: "OP15-047_p1",
      setCode: "OP15EB04",
      collectorNumber: "047",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-047_p1_70z00wN.jpg",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Straw Hat Crew Dressrosa"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-047_p1_70z00wN.jpg",
      imageId: "OP15-047_p1",
    },
  ],
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] Up to 1 of your Characters gains [Unblockable] during this turn.\n(This card cannot be blocked.)",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
            },
            keyword: "unblockable",
            duration: "thisTurn",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Sanji047I18n,
};
