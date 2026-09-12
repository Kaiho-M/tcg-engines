import { describe, expect, test } from "vite-plus/test";
import { op02MeteorVolcano119 } from "@tcg/op-cards";
import { op16Marco014 } from "../../../../cards/src/cards/OP16/characters/014-marco.ts";
import { op16PortgasDAce001 } from "../../../../cards/src/cards/OP16/leaders/001-portgas-d-ace.ts";
import { op17WhiteyBay014 } from "../../../../cards/src/cards/OP17/characters/014-whitey-bay.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("OP16-014 Marco", () => {
  test("may be K.O.'d instead of another Character the opponent's effect would remove", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op16PortgasDAce001,
        character: [
          { card: op16Marco014, playedOnTurn: 0 },
          { card: op17WhiteyBay014, playedOnTurn: 0 },
        ],
        hand: 0,
      },
      { hand: [op02MeteorVolcano119], activeDon: 5 },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const marcoId = engine.findCardInZone("south", "character", op16Marco014);
    const targetId = engine.findCardInZone("south", "character", op17WhiteyBay014);

    engine.playCard(op02MeteorVolcano119, "north");
    engine.resolveDecision("effectTargetSelection", { selectedIds: [targetId] }, "north");
    engine.resolveDecision("effectKoReplacement", { optionId: "yes" }, "south");

    const south = engine.getState().players.south;
    expect(south.characterArea).toContain(targetId);
    expect(south.characterArea).not.toContain(marcoId);
    expect(south.trash).toContain(marcoId);
  });
});
