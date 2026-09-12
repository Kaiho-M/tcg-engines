import type { CharacterCard } from "@tcg/op-types";
import { p153PortgasDAce153I18n } from "./153-portgas-d-ace.i18n.ts";

// Japanese-only promo: not on the English card list. Stats and effect structure were taken from
// OPTCGSim's card definition (OnPlay, up to 2 enemy deployed Characters, BuffPower -3000);
// the English text below is a rendering of the JP card and was not scraped.
export const p153PortgasDAce153: CharacterCard = {
  id: "P-153",
  canonicalId: "P-153",
  slug: "portgas-d-ace/p-153",
  name: "Portgas.D.Ace",
  printings: [
    {
      id: "P-153",
      artId: "P-153",
      setCode: "P",
      collectorNumber: "153",
      rarity: "P",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/P-153.png",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "P",
  setId: "P",
  cost: 6,
  power: 8000,
  traits: ["Whitebeard Pirates"],
  attribute: "special",
  effect: "[On Play] Give up to 2 of your opponent's Characters −3000 power during this turn.",
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "modifyPower",
            target: {
              player: "opponent",
              zones: ["character"],
              count: {
                amount: 2,
                upTo: true,
              },
            },
            value: -3000,
            duration: "thisTurn",
          },
        ],
      },
    ],
  },
  i18n: p153PortgasDAce153I18n,
};
