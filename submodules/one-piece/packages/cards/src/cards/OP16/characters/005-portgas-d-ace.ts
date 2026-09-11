import type { CharacterCard } from "@tcg/op-types";
import { op16PortgasDAce005I18n } from "./005-portgas-d-ace.i18n.ts";

export const op16PortgasDAce005: CharacterCard = {
  id: "ST15-005",
  canonicalId: "ST15-005",
  slug: "portgas-d-ace/st15-005",
  name: "Portgas.D.Ace",
  printings: [
    {
      id: "ST15-005",
      artId: "ST15-005_p5",
      setCode: "OP16",
      collectorNumber: "005",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/ST15-005_p5_aT6zwMj.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "OP16",
  cost: 5,
  power: 6000,
  counter: 1000,
  traits: ["Whitebeard Pirates"],
  attribute: "special",
  effect:
    "If your Leader's type includes \"Whitebeard Pirates\", this Character gains [Rush](This card can attack on the turn in which it is played.)[Once Per Turn] If this Character would be removed from the field by your opponent's effect, you may give this Character -2000 power during this turn instead.",
  effects: {
    replacementEffects: [
      {
        replacedEvent: "removeFromField",
        source: "opponentEffect",
        replacementAction: {
          action: "modifyPower",
          target: {
            player: "self",
            zones: ["character"],
            count: {
              amount: 1,
            },
            self: true,
          },
          value: -2000,
          duration: "thisTurn",
        },
      },
    ],
  },
  i18n: op16PortgasDAce005I18n,
};
