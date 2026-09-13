import type { CharacterCard } from "@tcg/op-types";
import { st13CurlyDadan006I18n } from "./006-curly-dadan.i18n.ts";

export const st13CurlyDadan006: CharacterCard = {
  id: "ST13-006",
  canonicalId: "ST13-006",
  slug: "curly-dadan/st13-006",
  name: "Curly.Dadan",
  printings: [
    {
      id: "ST13-006",
      artId: "ST13-006",
      setCode: "ST13",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-006.png",
    },
    {
      id: "ST13-006_p1",
      artId: "ST13-006_p1",
      setCode: "ST13",
      collectorNumber: "006",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-006_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST13",
  cost: 5,
  power: 4000,
  counter: 1000,
  traits: ["Mountain Bandits"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-006_p1.png",
      imageId: "ST13-006_p1",
    },
  ],
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[On Play] Play up to 1 each of [Sabo], [Portgas.D.Ace], and [Monkey.D.Luffy] with a cost of 2 from your hand.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "play",
            source: {
              player: "self",
              zone: "hand",
            },
            count: {
              amount: 1,
              upTo: true,
            },
            filters: [
              {
                filter: "cost",
                comparison: "eq",
                value: 2,
              },
            ],
          },
        ],
      },
    ],
  },
  i18n: st13CurlyDadan006I18n,
};
