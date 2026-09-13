import type { CharacterCard } from "@tcg/op-types";
import { st36EustassCaptainKid005I18n } from "./005-eustass-captain-kid.i18n.ts";

export const st36EustassCaptainKid005: CharacterCard = {
  id: "ST36-005",
  canonicalId: "ST36-005",
  slug: "eustass-captain-kid/st36-005",
  name: 'Eustass"Captain"Kid',
  printings: [
    {
      id: "ST36-005",
      artId: "ST36-005",
      setCode: "ST36",
      collectorNumber: "005",
      rarity: "SR",
      imageUrl: "https://en.onepiece-cardgame.com/images/cardlist/card/ST36-005.png",
    },
  ],
  cardType: "character",
  color: ["yellow"],
  rarity: "SR",
  setId: "ST36",
  cost: 6,
  power: 7000,
  traits: ["Supernovas", "Kid Pirates"],
  attribute: "special",
  effect:
    '[On Your Opponent\'s Attack] [Once Per Turn] You may turn 1 card from the top or bottom of your Life cards face-down: Change the target of the attack to your [Eustass"Captain"Kid] with 5000 base power or more.\n[Activate: Main] [Once Per Turn] You may turn 1 card from the top or bottom of your Life cards face-up: Give up to 1 rested DON!! card to your Leader.',
  i18n: st36EustassCaptainKid005I18n,
};
