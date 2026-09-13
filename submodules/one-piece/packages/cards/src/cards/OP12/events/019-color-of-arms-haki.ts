import type { EventCard } from "@tcg/op-types";
import { op12ColorOfArmsHaki019I18n } from "./019-color-of-arms-haki.i18n.ts";

export const op12ColorOfArmsHaki019: EventCard = {
  id: "OP12-019",
  canonicalId: "OP12-019",
  slug: "color-of-arms-haki",
  name: "Color of Arms Haki",
  printings: [
    {
      id: "OP12-019",
      artId: "OP12-019",
      setCode: "OP12",
      collectorNumber: "019",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP12-019.png",
    },
  ],
  cardType: "event",
  color: ["red"],
  rarity: "C",
  setId: "OP12",
  cost: 0,
  traits: ["Former Roger Pirates"],
  effect:
    "[Main] You may give 1 active DON!! card to 1 of your [Silvers Rayleigh]: Up to 1 of your Leader or Character cards gains +1000 power during this turn.\n[Counter] Up to 1 of your Characters or [Silvers Rayleigh] gains +2000 power during this battle.",
  i18n: op12ColorOfArmsHaki019I18n,
};
