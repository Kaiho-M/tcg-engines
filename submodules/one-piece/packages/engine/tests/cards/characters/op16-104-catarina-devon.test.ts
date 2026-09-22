import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { op16CatarinaDevon104 } from "../../../../cards/src/cards/characters/op16-104-catarina-devon.ts";
import { op16MarshallDTeach080 } from "../../../../cards/src/cards/leaders/op16-080-marshall-d-teach.ts";
import { op17RocksDXebec039 } from "../../../../cards/src/cards/leaders/op17-039-rocks-d-xebec.ts";

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
        character: [{ card: eb01Doma005, playedOnTurn: 0 }],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const devonId = engine.findCardInZone("south", "character", op16CatarinaDevon104);
    engine.declareAttack(devonId, engine.leader("north"), "south");

    const crocodileId = engine.findCardInZone("north", "character", eb01Doma005);
    engine.resolveDecision("effectTargetSelection", { selectedIds: [crocodileId] }, "south");

    const devon = engine
      .getView("south")
      .players.south.characters.find((card) => card?.cardId === op16CatarinaDevon104.id);
    expect(devon?.power).toBe(eb01Doma005.power);
  });

  test("[When Attacking] selecting no Character leaves its printed power", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16MarshallDTeach080,
        character: [{ card: op16CatarinaDevon104, playedOnTurn: 0 }],
      },
      {
        leaderCardId: op17RocksDXebec039,
        character: [{ card: eb01Doma005, playedOnTurn: 0 }],
      },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const devonId = engine.findCardInZone("south", "character", op16CatarinaDevon104);

    engine.declareAttack(devonId, engine.leader("north"), "south");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [] }, "south");

    const view = engine.getView("south");
    const devon = view.players.south.characters.find((card) => card?.instanceId === devonId);
    expect(devon?.power).toBe(op16CatarinaDevon104.power);
    expect(view.players.south.trash).toHaveLength(0);
    expect(view.players.north.characters.filter(Boolean)).toHaveLength(1);
    expect(view.players.north.leader?.power).toBe(op17RocksDXebec039.power);
  });
});
