import { describe, expect, test } from "vite-plus/test";
import type { CharacterCard } from "@tcg/op-types";
import { op16Arlong023 } from "../../../../cards/src/cards/characters/op16-023-arlong.ts";
import { op16Inazuma024 } from "../../../../cards/src/cards/characters/op16-024-inazuma.ts";
import { op16Jinbe027 } from "../../../../cards/src/cards/characters/op16-027-jinbe.ts";
import { op16Buggy031 } from "../../../../cards/src/cards/characters/op16-031-buggy.ts";
import { op16MonkeyDLuffy034 } from "../../../../cards/src/cards/characters/op16-034-monkey-d-luffy.ts";
import { op16LetSGoToTheNavyHeadquarters038 } from "../../../../cards/src/cards/events/op16-038-let-s-go-to-the-navy-headquarters.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getCardPower } from "../../../src/shared.ts";

describe("OP16-034 Monkey.D.Luffy", () => {
  test("[DON!! x1] [Your Turn] gains +1000 per distinct card name among its controller's Characters", () => {
    // Luffy, Arlong, Arlong, Jinbe: three distinct names, so +3000 on top of the DON!!.
    const engine = OnePieceTestEngine.create(
      {
        character: [
          { card: op16MonkeyDLuffy034, attachedDon: 1 },
          op16Arlong023,
          op16Arlong023,
          op16Jinbe027,
        ],
      },
      {},
      { firstPlayer: "south", activeSeat: "south" },
    );
    const luffyId = engine.findCardInZone("south", "character", op16MonkeyDLuffy034);
    // Printed power "-" projects as null, so read the battle power the engine computes.
    expect(getCardPower(engine.getState(), luffyId)).toBe(1000 + 3000);
  });
});

describe("OP16-038 Let's Go!! To the Navy Headquarters!!", () => {
  const playOnRestedBoard = (characters: CharacterCard[]) => {
    const engine = OnePieceTestEngine.create({
      hand: [op16LetSGoToTheNavyHeadquarters038],
      character: characters.map((card) => ({ card, rested: true })),
      activeDon: 7,
    });
    engine.playCard(op16LetSGoToTheNavyHeadquarters038);
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    return engine.getView("south").players.south;
  };

  test("[Main] readies the Leader and all Characters with five differently named {Impel Down} Characters", () => {
    const south = playOnRestedBoard([
      op16MonkeyDLuffy034,
      op16Arlong023,
      op16Jinbe027,
      op16Buggy031,
      op16Inazuma024,
    ]);
    expect(south.characters.every((card) => card?.rested === false)).toBe(true);
    expect(south).toMatchObject({ activeDon: 0, restedDon: 7 });
  });

  test("[Main] does nothing when two of the five share a card name", () => {
    const south = playOnRestedBoard([
      op16MonkeyDLuffy034,
      op16Arlong023,
      op16Jinbe027,
      op16Buggy031,
      op16Arlong023,
    ]);
    expect(south.characters.every((card) => card?.rested === true)).toBe(true);
  });
});
