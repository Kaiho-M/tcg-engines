import type { CharacterCard } from "@tcg/op-types";
import { op17EdwardNewgate040I18n } from "./040-edward-newgate.i18n.ts";

export const op17EdwardNewgate040: CharacterCard = {
  id: "OP17-040",
  canonicalId: "OP17-040",
  slug: "edward-newgate/op17-040",
  name: "Edward.Newgate",
  printings: [
    {
      id: "OP17-040",
      artId: "OP17-040",
      setCode: "OP17",
      collectorNumber: "040",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-040.png",
    },
    {
      id: "OP17-040_p1",
      artId: "OP17-040_p1",
      setCode: "OP17",
      collectorNumber: "040",
      rarity: "R",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-040_p1.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "R",
  setId: "OP17",
  cost: 6,
  power: 8000,
  traits: ["Rocks Pirates"],
  attribute: "special",
  artVariants: [
    {
      type: "other",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/OP17-040_p1.png",
      imageId: "OP17-040_p1",
    },
  ],
  effect:
    '[On Play] Draw 1 card.\n[Once Per Turn] When your Leader with a type including "Rocks Pirates" attacks or is attacked, you may trash 1 card from your hand to activate this effect. Your Leader gains +3000 power during this battle.',
  effects: {
    effects: [
      {
        trigger: "onPlay",
        actions: [
          {
            action: "draw",
            player: "self",
            amount: 1,
          },
        ],
      },
    ],
  },
  i18n: op17EdwardNewgate040I18n,
};
