import type { CharacterCard } from "@tcg/op-types";
import { op16MonkeyDLuffy034I18n } from "./034-monkey-d-luffy.i18n.ts";

export const op16MonkeyDLuffy034: CharacterCard = {
  id: "OP16-034",
  canonicalId: "OP16-034",
  slug: "monkey-d-luffy/op16-034",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP16-034",
      artId: "OP16-034",
      setCode: "OP16",
      collectorNumber: "034",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-034_pi7IfhS.jpg",
    },
    {
      id: "OP16-034_p1",
      artId: "OP16-034_p1",
      setCode: "OP16",
      collectorNumber: "034",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-034_p1_rYPd1n8.jpg",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "R",
  setId: "OP16",
  cost: 1,
  power: 0,
  counter: 1000,
  traits: ["Straw Hat Crew Impel Down"],
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP16-034_p1_rYPd1n8.jpg",
      imageId: "OP16-034_p1",
    },
  ],
  effect:
    "[DON!! x1] [Your Turn] This Character gains +1000 power for each of your Characters with a different card name.\n\n[On Play] Look at 3 cards from the top of your deck; reveal up to 1 {Impel Down} type card and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 3,
            source: {
              player: "self",
              zone: "deck",
            },
            revealCount: {
              amount: 1,
              upTo: true,
            },
            revealFilters: [
              {
                filter: "trait",
                value: "Impel Down",
                match: "includes",
              },
            ],
            revealDestination: "hand",
            remainderPosition: "bottom",
          },
        ],
      },
    ],
  },
  i18n: op16MonkeyDLuffy034I18n,
};
