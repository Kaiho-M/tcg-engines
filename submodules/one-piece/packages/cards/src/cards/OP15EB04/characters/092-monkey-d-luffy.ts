import type { CharacterCard } from "@tcg/op-types";
import { op15eb04MonkeyDLuffy092I18n } from "./092-monkey-d-luffy.i18n.ts";

export const op15eb04MonkeyDLuffy092: CharacterCard = {
  id: "OP15-092",
  canonicalId: "OP15-092",
  slug: "monkey-d-luffy/op15-092",
  name: "Monkey.D.Luffy",
  printings: [
    {
      id: "OP15-092",
      artId: "OP15-092",
      setCode: "OP15EB04",
      collectorNumber: "092",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-092_wfsrbT6.jpg",
    },
    {
      id: "OP15-092_p1",
      artId: "OP15-092_p1",
      setCode: "OP15EB04",
      collectorNumber: "092",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-092_p1_wvjuF0D.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "R",
  setId: "OP15EB04",
  cost: 7,
  power: 7000,
  counter: 1000,
  traits: ["Straw Hat Crew"],
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP15-092_p1_wvjuF0D.jpg",
      imageId: "OP15-092_p1",
    },
  ],
  effect:
    "Apply each of the following effects based on the number of cards in your trash:\n• If there are 10 or more cards, this Character's base power becomes 9000 and it gains +10 cost.\n• If you have 20 or more cards, during your opponent's turn, your Leader's base power becomes 7000.\n• If you have 30 or more cards, this Character gains +1000 power.",
  i18n: op15eb04MonkeyDLuffy092I18n,
};
