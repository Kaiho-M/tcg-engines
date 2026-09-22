import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005 } from "@tcg/op-cards";
import { st29MonkeyDLuffy001 } from "../../../../cards/src/cards/leaders/st29-001-monkey-d-luffy.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST29-001 Monkey.D.Luffy", () => {
  test("[When Attacking] with 2 or less Life cards draws 1 and trashes 1 from hand", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: st29MonkeyDLuffy001, hand: [eb01Doma005], deck: 3, life: 2 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");
    const trash = engine.pendingDecision("effectTrashFromHandSelection", "south").steps[0];
    if (trash?.kind !== "selectEntity") throw new Error("Expected the hand-trash choice.");
    expect(trash.candidates).toHaveLength(2);
    engine.resolveDecision(
      "effectTrashFromHandSelection",
      { selectedIds: [trash.candidates[0]!.ref.id] },
      "south",
    );

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.deckCount).toBe(2);
    expect(view.players.south.trash).toHaveLength(1);
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });

  test("[When Attacking] with 3 or more Life cards does nothing", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: st29MonkeyDLuffy001, hand: [eb01Doma005], deck: 3, life: 3 },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");

    const view = engine.getView("south");
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.players.south.deckCount).toBe(3);
    expect(view.players.south.trash).toHaveLength(0);
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });
});
