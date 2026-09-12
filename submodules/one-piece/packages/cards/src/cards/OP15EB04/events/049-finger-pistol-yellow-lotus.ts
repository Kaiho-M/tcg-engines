import type { EventCard } from "@tcg/op-types";
import { op15eb04FingerPistolYellowLotus049I18n } from "./049-finger-pistol-yellow-lotus.i18n.ts";

export const op15eb04FingerPistolYellowLotus049: EventCard = {
  id: "EB04-049",
  canonicalId: "EB04-049",
  slug: "finger-pistol-yellow-lotus",
  name: "Finger Pistol Yellow Lotus",
  printings: [
    {
      id: "EB04-049",
      artId: "EB04-049",
      setCode: "OP15EB04",
      collectorNumber: "049",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/EB04-049.png",
    },
  ],
  cardType: "event",
  color: ["black"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 4,
  trigger: "[Trigger] Activate this card's [Main] effect.",
  traits: ["CP9"],
  effect:
    "[Main] You may trash 2 cards from the top of your deck: K.O. up to 1 of your opponent's Characters with a base cost of 5 or less.",
  effects: {
    effects: [
      {
        trigger: "main",
        conditions: [
          {
            condition: "zoneCount",
            player: "self",
            zone: "deck",
            comparison: "gte",
            value: 2,
          },
        ],
        actions: [
          {
            action: "trashFromDeck",
            player: "self",
            amount: 2,
          },
          {
            action: "ko",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 1,
                upTo: true,
              },
              filters: [
                {
                  filter: "baseCost",
                  comparison: "lte",
                  value: 5,
                },
              ],
            },
          },
        ],
        optional: true,
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "activateEffect",
            effectTrigger: "main",
          },
        ],
      },
      {
        trigger: "trigger",
        actions: [
          {
            action: "activateEffect",
            effectTrigger: "main",
          },
        ],
      },
    ],
  },
  i18n: op15eb04FingerPistolYellowLotus049I18n,
};
