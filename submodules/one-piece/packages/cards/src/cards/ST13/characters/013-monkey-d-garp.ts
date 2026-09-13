import type { CharacterCard } from "@tcg/op-types";
import { st13MonkeyDGarp013I18n } from "./013-monkey-d-garp.i18n.ts";

export const st13MonkeyDGarp013: CharacterCard = {
  id: "ST13-013",
  canonicalId: "ST13-013",
  slug: "monkey-d-garp/st13-013",
  name: "Monkey.D.Garp",
  printings: [
    {
      id: "ST13-013",
      artId: "ST13-013",
      setCode: "ST13",
      collectorNumber: "013",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-013.png",
    },
    {
      id: "ST13-013_p1",
      artId: "ST13-013_p1",
      setCode: "ST13",
      collectorNumber: "013",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-013_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "ST13",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Navy"],
  attribute: "strike",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-013_p1.png",
      imageId: "ST13-013_p1",
    },
  ],
  effect:
    "[On Play] Look at 5 cards from the top of your deck; reveal up to 1 [Sabo], [Portgas.D.Ace], or [Monkey.D.Luffy] with a cost of 5 or less and add it to your hand. Then, place the rest at the bottom of your deck in any order.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "search",
            lookCount: 5,
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
                filter: "cost",
                comparison: "lte",
                value: 5,
              },
              {
                filter: "name",
                value: "Sabo",
              },
            ],
            revealDestination: "hand",
            remainderPosition: "bottom",
          },
        ],
      },
    ],
  },
  i18n: st13MonkeyDGarp013I18n,
};
