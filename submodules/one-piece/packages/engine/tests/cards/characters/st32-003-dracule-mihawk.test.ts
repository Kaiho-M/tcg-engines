import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st32DraculeMihawk003 } from "../../../../cards/src/cards/characters/st32-003-dracule-mihawk.ts";
import { op06Tashigi050 } from "../../../../cards/src/cards/characters/op06-050-tashigi.ts";
import { op12Perona034 } from "../../../../cards/src/cards/characters/op12-034-perona.ts";
import { op14eb04DraculeMihawkOp14020020 } from "../../../../cards/src/cards/leaders/op14-020-dracule-mihawk-op14-020.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST32-003 Dracule Mihawk", () => {
  test("[On Play] under a (Slash) Leader plays a [Perona] or (Slash) Character with cost 5 or less from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op14eb04DraculeMihawkOp14020020,
        hand: [st32DraculeMihawk003, op12Perona034, op06Tashigi050, eb01MountainGod018],
        activeDon: 6,
      },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );
    const peronaId = engine.findCardInZone("south", "hand", op12Perona034);
    const tashigiId = engine.findCardInZone("south", "hand", op06Tashigi050);

    engine.playCard(st32DraculeMihawk003, "south");
    const play = engine.pendingDecision("effectPlaySelection", "south").steps[0];
    if (play?.kind !== "selectEntity") throw new Error("Expected Mihawk's play choice.");
    // Perona by name, Tashigi by her Slash attribute; Mountain God (Strike) is out.
    expect(play.candidates.map((candidate) => candidate.ref.id).sort()).toEqual(
      [peronaId, tashigiId].sort(),
    );
    engine.resolveDecision("effectPlaySelection", { selectedIds: [peronaId] }, "south");
    engine.acceptLeadingOptional("south");

    const view = engine.getView("south");
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(peronaId);
    expect(view.players.south.hand.map((card) => card.instanceId)).toContain(tashigiId);
  });

  test("[On Play] under a non-Slash Leader plays nothing", () => {
    const engine = OnePieceTestEngine.create(
      { hand: [st32DraculeMihawk003, op12Perona034], activeDon: 6 },
      {},
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st32DraculeMihawk003, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.filter(Boolean)).toHaveLength(1);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });

  test("[Your Turn] when it becomes rested by attacking, draws 1 and trashes 1 from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st32DraculeMihawk003, playedOnTurn: 0 }],
        hand: [eb01Doma005, eb01Doma005],
        deck: 3,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const mihawkId = engine.findCardInZone("south", "character", st32DraculeMihawk003);

    engine.declareAttack(mihawkId, engine.leader("north"), "south");
    const trash = engine.pendingDecision("effectTrashFromHandSelection", "south").steps[0];
    if (trash?.kind !== "selectEntity") throw new Error("Expected the hand-trash choice.");
    expect(trash.candidates).toHaveLength(3);
    engine.resolveDecision(
      "effectTrashFromHandSelection",
      { selectedIds: [trash.candidates[0]!.ref.id] },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(2);
    expect(view.players.south.deckCount).toBe(2);
    expect(view.players.south.trash).toHaveLength(1);
  });
});
