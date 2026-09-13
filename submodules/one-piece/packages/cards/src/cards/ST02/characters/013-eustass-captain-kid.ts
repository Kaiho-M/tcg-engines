import type { CharacterCard } from "@tcg/op-types";
import { st02EustassCaptainKid013I18n } from "./013-eustass-captain-kid.i18n.ts";

export const st02EustassCaptainKid013: CharacterCard = {
  id: "ST02-013",
  canonicalId: "ST02-013",
  slug: "eustass-captain-kid/st02-013",
  name: 'Eustass"Captain"Kid',
  printings: [
    {
      id: "ST02-013",
      artId: "ST02-013",
      setCode: "ST02",
      collectorNumber: "013",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST02-013.png",
    },
  ],
  cardType: "character",
  color: ["green"],
  rarity: "SR",
  setId: "ST02",
  cost: 7,
  power: 7000,
  traits: ["Supernovas", "Kid Pirates"],
  attribute: "special",
  effect:
    "[Blocker] (After your opponent declares an attack, you may rest this card to make it the new target of the attack.)\n[DON!! x1] [End of Your Turn] Set this Character as active.",
  effects: {
    keywords: ["blocker"],
    effects: [
      {
        trigger: "endOfYourTurn",
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "setActive",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
          },
        ],
      },
    ],
  },
  i18n: st02EustassCaptainKid013I18n,
};
