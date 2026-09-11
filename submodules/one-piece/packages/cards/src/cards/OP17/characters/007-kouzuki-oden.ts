import type { CharacterCard } from "@tcg/op-types";
import { op17KouzukiOden007I18n } from "./007-kouzuki-oden.i18n.ts";

export const op17KouzukiOden007: CharacterCard = {
  id: "OP17-007",
  canonicalId: "OP17-007",
  slug: "kouzuki-oden/op17-007",
  name: "Kouzuki Oden",
  printings: [
    {
      id: "OP17-007",
      artId: "OP17-007",
      setCode: "OP17",
      collectorNumber: "007",
      rarity: "R",
      imageUrl: "https://www.optcgapi.com/media/static/Card_Images/OP17-007_ymTHgKd.jpg",
    },
  ],
  cardType: "character",
  color: ["red"],
  rarity: "R",
  setId: "OP17",
  cost: 7,
  power: 8000,
  traits: ["Land of Wano Kouzuki Clan Whitebeard Pirates"],
  attribute: "slash",
  effect:
    '[On Play] If your Leader is [Edward.Newgate] or has the {Land of Wano} type, play up to 1 {Land of Wano} type Character card with a type including "Whitebeard Pirates" with 6000 power or less from your hand.',
  i18n: op17KouzukiOden007I18n,
};
