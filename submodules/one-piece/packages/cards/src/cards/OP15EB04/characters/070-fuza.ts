import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Fuza070I18n } from "./070-fuza.i18n.ts";

export const op15eb04Fuza070: CharacterCard = {
  id: "OP15-070",
  canonicalId: "OP15-070",
  slug: "fuza/op15-070",
  name: "Fuza",
  printings: [
    {
      id: "OP15-070",
      artId: "OP15-070",
      setCode: "OP15EB04",
      collectorNumber: "070",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-070_qB1w3q6.jpg",
    },
  ],
  cardType: "character",
  color: ["purple"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Animal Sky Island"],
  attribute: "special",
  effect:
    "All of your [Shura] cards and this Character gain [Unblockable].\n(This card cannot be blocked.)\n[Opponent's Turn] All of your [Shura] cards' base power and this Character's base power become 6000.",
  effects: {
    permanentEffects: [
      {
        actions: [
          {
            action: "grantKeyword",
            target: {
              player: "self",
              zones: ["character"],
              count: {
                amount: 1,
              },
              self: true,
            },
            keyword: "unblockable",
            duration: "permanent",
          },
        ],
      },
    ],
  },
  i18n: op15eb04Fuza070I18n,
};
