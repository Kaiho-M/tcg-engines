import type { CharacterCard } from "@tcg/op-types";
import { op15eb04Koby044I18n } from "./044-koby.i18n.ts";

export const op15eb04Koby044: CharacterCard = {
  id: "EB04-044",
  canonicalId: "EB04-044",
  slug: "koby/eb04-044",
  name: "Koby",
  printings: [
    {
      id: "EB04-044",
      artId: "EB04-044",
      setCode: "OP15EB04",
      collectorNumber: "044",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-044_evnJnB8.jpg",
    },
    {
      id: "EB04-044_p1",
      artId: "EB04-044_p1",
      setCode: "OP15EB04",
      collectorNumber: "044",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-044_p1_VWzlrOD.jpg",
    },
    {
      id: "EB04-044_p2",
      artId: "EB04-044_p2",
      setCode: "OP15EB04",
      collectorNumber: "044",
      rarity: "SR",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-044_p2.jpg",
    },
  ],
  cardType: "character",
  color: ["black"],
  rarity: "SR",
  setId: "OP15EB04",
  cost: 6,
  power: 7000,
  counter: 1000,
  traits: ["Navy SWORD"],
  attribute: "strike",
  artVariants: [
    {
      type: "alternate-art",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-044_p1_VWzlrOD.jpg",
      imageId: "EB04-044_p1",
    },
    {
      type: "manga-rare",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/EB04-044_p2.jpg",
      imageId: "EB04-044_p2",
    },
  ],
  effect:
    '[Once Per Turn] If your Leader has the "Navy" type and this Character would be removed from the field, you can discard 1 card from your hand instead.\n[Your Turn] [Once Per Turn] When one of your opponent’s Characters is KO’d, draw 1 card.',
  i18n: op15eb04Koby044I18n,
};
