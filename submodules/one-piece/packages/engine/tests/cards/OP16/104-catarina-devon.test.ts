import { describe, expect, test } from "vite-plus/test";
import { op16CatarinaDevon104 } from "../../../../cards/src/cards/OP16/characters/104-catarina-devon.ts";
import { op16MarshallDTeach080 } from "../../../../cards/src/cards/OP16/leaders/080-marshall-d-teach.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/OP17/leaders/039-rocks-d-xebec.ts";
import { st30Crocodile010 } from "../../../../cards/src/cards/ST30/characters/010-crocodile.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP16-104 Catarina Devon", () => {
  test("[When Attacking] copies the selected opposing Character's power for the turn", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16MarshallDTeach080,
        character: [{ card: op16CatarinaDevon104, playedOnTurn: 0 }],
      },
      {
        leaderCardId: op17RocksDXebec039,
        character: [{ card: st30Crocodile010, playedOnTurn: 0 }],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const devonId = engine.findCardInZone("south", "character", op16CatarinaDevon104);
    engine.declareAttack(devonId, engine.leader("north"), "south");

    const crocodileId = engine.findCardInZone("north", "character", st30Crocodile010);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [crocodileId] }, "south");

    const devon = engine
      .getView("south")
      .players.south.characters.find((card) => card?.cardId === op16CatarinaDevon104.id);
    expect(devon?.power).toBe(st30Crocodile010.power);
  });
});
