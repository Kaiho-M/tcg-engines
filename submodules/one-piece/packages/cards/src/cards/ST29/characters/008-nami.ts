import type { CharacterCard } from "@tcg/op-types";
import { st29Nami008I18n } from "./008-nami.i18n.ts";

export const st29Nami008: CharacterCard = {
  id: "ST29-008",
  canonicalId: "ST29-008",
  slug: "nami/st29-008",
  name: "Nami",
  printings: [
    {
      id: "ST29-008",
      artId: "ST29-008",
      setCode: "ST29",
      collectorNumber: "008",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-008.png",
    },
    {
      id: "ST29-008_p1",
      artId: "ST29-008_p1",
      setCode: "ST29",
      collectorNumber: "008",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-008_p1.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "C",
  setId: "ST29",
  cost: 3,
  power: 1000,
  counter: 1000,
  trigger: "If your Leader is [Monkey.D.Luffy], play this card.",
  traits: ["Egghead", "Straw Hat Crew"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST29-008_p1.png",
      imageId: "ST29-008_p1",
    },
  ],
  effect:
    "If your {Egghead} type Character would be K.O.'d by your opponent's effect, you may turn 1 card from the top of your Life cards face-up instead.",
  effects: {
    effects: [
      {
        trigger: "trigger",
        conditions: [
          {
            condition: "leaderName",
            name: "Monkey.D.Luffy",
          },
        ],
        actions: [
          {
            action: "playThisCard",
          },
        ],
      },
    ],
    replacementEffects: [
      {
        replacedEvent: "ko",
        target: {
          player: "self",
          zones: ["character"],
          count: {
            amount: 1,
          },
          filters: [
            {
              filter: "trait",
              value: "Egghead",
              match: "includes",
            },
          ],
        },
        source: "opponentEffect",
        replacementAction: {
          action: "turnLifeFaceUp",
          player: "self",
          count: 1,
          position: "top",
        },
      },
    ],
  },
  i18n: st29Nami008I18n,
};
