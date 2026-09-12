import type { CharacterCard } from "@tcg/op-types";
import { op15eb04RoronoaZoro007I18n } from "./007-roronoa-zoro.i18n.ts";

export const op15eb04RoronoaZoro007: CharacterCard = {
  id: "EB04-007",
  canonicalId: "EB04-007",
  slug: "roronoa-zoro/eb04-007",
  name: "Roronoa Zoro",
  printings: [
    {
      id: "EB04-007",
      artId: "EB04-007",
      setCode: "OP15EB04",
      collectorNumber: "007",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-007.png",
    },
    {
      id: "EB04-007_p1",
      artId: "EB04-007_p1",
      setCode: "OP15EB04",
      collectorNumber: "007",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-007_p1.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 7,
  power: 9000,
  traits: ["Egghead", "Straw Hat Crew"],
  attribute: "slash",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-007_p1.png",
      imageId: "EB04-007_p1",
    },
  ],
  effect:
    "[On Play] Your Leader gains +2000 power until the end of your opponent's next End Phase.\n[Activate: Main] [Once Per Turn] If your opponent has a Character with 8000 power or more, this Character gains [Rush: Character] during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "self",
              zones: ["leader"],
              count: {
                amount: 1,
              },
            },
            value: 2000,
            duration: "untilEndOfOpponentNextEndPhase",
          },
        ],
      },
      {
        trigger: "activateMain",
        conditions: [
          {
            condition: "hasCard",
            player: "opponent",
            zone: "character",
            filters: [
              {
                filter: "power",
                comparison: "gte",
                value: 8000,
              },
            ],
          },
        ],
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
            keyword: "rushCharacter",
            duration: "thisTurn",
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: op15eb04RoronoaZoro007I18n,
};
