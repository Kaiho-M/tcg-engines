import { describe, expect, test } from "vite-plus/test";

import { OnePieceTestEngine } from "../../../index.ts";

describe("OP16-118 Portgas.D.Ace", () => {
  test("the counter of 8000-power Characters in hand becomes +2000", () => {
    const engine = OnePieceTestEngine.create(
      // Ace on the field; Vista (8000 power) in hand has no printed counter.
      { character: ["OP16-118"], hand: ["OP16-011"], activeDon: 5 },
      { character: ["OP01-018"], activeDon: 5 },
    );
    const lifeBefore = engine.getView("south").players.south.lifeCount;

    // Hajrudin (6000) attacks the Leader (5000). With Vista's counter now
    // +2000: 5000 + 2000 = 7000 > 6000, saved.
    engine.endTurn("south");
    engine.asNorth().attack("OP01-018", engine.asSouth().leader());
    engine.asSouth().chooseCounter("OP16-011");
    expect(engine.getView("south").players.south.lifeCount).toBe(lifeBefore);
  });

  test("'becomes +2000' does not add to a printed +2000 counter", () => {
    const engine = OnePieceTestEngine.create(
      // Curiel (8000 power) already has a +2000 counter; two Aces still leave it at 2000.
      { character: ["OP16-118", "OP16-118"], hand: ["OP16-004"], activeDon: 5 },
      { character: ["OP16-065"], activeDon: 5 },
    );
    const lifeBefore = engine.getView("south").players.south.lifeCount;

    // Sakazuki (8000) attacks the Leader (5000): 5000 + 2000 < 8000, not saved.
    engine.endTurn("south");
    engine.asNorth().attack("OP16-065", engine.asSouth().leader());
    engine.asSouth().chooseCounter("OP16-004");
    expect(engine.getView("south").players.south.lifeCount).toBe(lifeBefore - 1);
  });

  test("without Ace on the field Vista has no counter to use", () => {
    const engine = OnePieceTestEngine.create(
      { hand: ["OP16-011"], activeDon: 5 },
      { character: ["OP01-018"], activeDon: 5 },
    );
    const lifeBefore = engine.getView("south").players.south.lifeCount;

    engine.endTurn("south");
    engine.asNorth().attack("OP01-018", engine.asSouth().leader());
    // Vista's counter is 0, so it is offered but disabled in the Counter step.
    const counterPrompt = engine.getView("south").prompts[0];
    expect(counterPrompt?.options.map((option) => option.enabled)).toEqual([false]);
    expect(() => engine.asSouth().chooseCounter("OP16-011")).toThrow();
    expect(engine.getView("south").players.south.lifeCount).toBe(lifeBefore);
  });

  test("[On Play] looks at 5, may take a Whitebeard Pirates card, and orders the rest", () => {
    const engine = OnePieceTestEngine.create(
      {
        hand: ["OP16-118"],
        deck: ["OP13-013", "OP16-003", "OP13-013", "OP13-013", "OP13-013", "OP13-013"],
        activeDon: 5,
      },
      {},
    );

    engine.playCard("OP16-118");
    const search = engine.pendingDecision("effectSearchSelection", "south").steps[0];
    if (search?.kind !== "selectEntity") throw new Error("Expected the search choice.");
    const legal = search.candidates.filter((candidate) => candidate.legal);
    expect(legal.map((candidate) => candidate.publicInfo?.cardId)).toEqual(["OP16-003"]);
    engine.resolveDecision("effectSearchSelection", { selectedIds: [legal[0]!.ref.id!] }, "south");

    const order = engine.pendingDecision("effectSearchRemainderOrder", "south").steps[0];
    if (order?.kind !== "orderItems") throw new Error("Expected the remainder order.");
    engine.resolveDecision(
      "effectSearchRemainderOrder",
      { selectedIds: order.candidates.map((candidate) => candidate.ref.id) },
      "south",
    );

    const south = engine.getView("south").players.south;
    expect(south.hand.map((card) => card.cardId)).toContain("OP16-003");
    expect(engine.getView("south").prompts).toHaveLength(0);
  });
});
