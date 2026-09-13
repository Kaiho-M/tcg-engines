import type { CharacterCard } from "@tcg/op-types";
import { st03Sentomaru007I18n } from "./007-sentomaru.i18n.ts";

export const st03Sentomaru007: CharacterCard = {
  id: "ST03-007",
  canonicalId: "ST03-007",
  slug: "sentomaru/st03-007",
  name: "Sentomaru",
  printings: [
    {
      id: "ST03-007",
      artId: "ST03-007",
      setCode: "ST03",
      collectorNumber: "007",
      rarity: "C",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST03-007.png",
    },
  ],
  cardType: "character",
  color: ["blue"],
  rarity: "C",
  setId: "ST03",
  cost: 3,
  power: 4000,
  counter: 1000,
  traits: ["Navy"],
  attribute: "slash",
  effect:
    "[DON!! x1] [Activate: Main] [Once Per Turn] ➁ (You may rest the specified number of DON!! cards in your cost area.): Play up to 1 [Pacifista] with a cost of 4 or less from your deck, then shuffle your deck.",
  effects: {
    effects: [
      {
        trigger: "activateMain",
        conditions: [
          {
            condition: "donAttached",
            amount: 1,
          },
        ],
        actions: [
          {
            action: "shuffleDeck",
            player: "self",
          },
        ],
        oncePerTurn: true,
      },
    ],
  },
  i18n: st03Sentomaru007I18n,
};
