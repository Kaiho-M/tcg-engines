import type { CharacterCard } from "@tcg/op-types";
import { op15eb04TheRiskyBrothers093I18n } from "./093-the-risky-brothers.i18n.ts";

export const op15eb04TheRiskyBrothers093: CharacterCard = {
  id: "OP15-093",
  canonicalId: "OP15-093",
  slug: "the-risky-brothers",
  name: "The Risky Brothers",
  printings: [
    {
      id: "OP15-093",
      artId: "OP15-093",
      setCode: "OP15EB04",
      collectorNumber: "093",
      rarity: "C",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-093_XWHW3gZ.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "C",
  setId: "OP15EB04",
  cost: 1,
  power: 2000,
  counter: 1000,
  traits: ["Rolling Pirates"],
  attribute: "slash",
  effect:
    '[Activate: Main] You may trash this Character: If you have 15 or more cards in your trash, up to 1 of your [Monkey.D.Luffy] Characters gains [Rush: Character] and the "Slash" attribute during this turn.',
  i18n: op15eb04TheRiskyBrothers093I18n,
};
