import type { EventCard } from "@tcg/op-types";
import { op17MaserSaber117I18n } from "./117-maser-saber.i18n.ts";

export const op17MaserSaber117: EventCard = {
  id: "OP17-117",
  canonicalId: "OP17-117",
  slug: "maser-saber",
  name: "Maser Saber",
  printings: [
    {
      id: "OP17-117",
      artId: "OP17-117",
      setCode: "OP17",
      collectorNumber: "117",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-117.png",
    },
  ],
  cardType: "event",
  color: ["yellow"],
  rarity: "C",
  setId: "OP17",
  cost: 1,
  trigger:
    "[Trigger] Your opponent may trash 3 cards from their hand. If they do not, K.O. up to 1 of your opponent's Characters with a cost of 6 or less.",
  traits: ["The Four Emperors", "Big Mom Pirates"],
  effect: "[Counter] Up to 1 of your [Charlotte Linlin] gains +3000 power during this battle.",
  i18n: op17MaserSaber117I18n,
};
