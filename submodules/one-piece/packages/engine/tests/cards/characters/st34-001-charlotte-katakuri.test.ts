import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018 } from "@tcg/op-cards";
import { st34CharlotteKatakuri001 } from "../../../../cards/src/cards/characters/st34-001-charlotte-katakuri.ts";
import { st34BaronTamagoPekoms005 } from "../../../../cards/src/cards/characters/st34-005-baron-tamago-pekoms.ts";
import { op03CharlotteKatakuri099 } from "../../../../cards/src/cards/leaders/op03-099-charlotte-katakuri.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";

describe("ST34-001 Charlotte Katakuri", () => {
  test("[Your Turn] when a DON!! returns under a Big Mom Pirates Leader, adds up to 2 rested DON!!", () => {
    const engine = OnePieceTestEngine.create(
      {
        leaderCardId: op03CharlotteKatakuri099,
        character: [
          { card: st34CharlotteKatakuri001, playedOnTurn: 0 },
          { card: st34BaronTamagoPekoms005, playedOnTurn: 0 },
        ],
        activeDon: 3,
        donDeckCount: 5,
      },
      { hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const tamagoId = engine.findCardInZone("south", "character", st34BaronTamagoPekoms005);

    // Tamago's [When Attacking] DON!! -1 returns a DON!! and fires Katakuri.
    engine.declareAttack(tamagoId, engine.leader("north"), "south");
    engine.resolveDecision("effectOptional", { optionId: "yes" }, "south");
    try {
      engine.resolveDecision("effectCostReturnDon", { selectedIds: ["active-don:0"] }, "south");
    } catch {
      // Paid automatically.
    }
    engine.resolveDecision("effectAddDon", { optionId: "2" }, "south");
    // Tamago's K.O. has no legal target.
    engine.acceptLeadingOptional("south");

    const view = engine.getView("south");
    expect(view.players.south.restedDon).toBe(2);
    expect(view.players.south.donDeckCount).toBe(4);
    expect(view.players.south.activeDon).toBe(2);
  });

  test("[On K.O.] plays a Character with 8000 power or less from hand", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st34CharlotteKatakuri001, playedOnTurn: 0, rested: true }],
        hand: [eb01Doma005, eb01Doma005],
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const katakuriId = engine.findCardInZone("south", "character", st34CharlotteKatakuri001);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.declareAttack(godId, katakuriId, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
    const play = engine.pendingDecision("effectPlaySelection", "south").steps[0];
    if (play?.kind !== "selectEntity") throw new Error("Expected Katakuri's play choice.");
    expect(play.candidates).toHaveLength(2);
    const chosen = play.candidates[0]!.ref.id;
    engine.resolveDecision("effectPlaySelection", { selectedIds: [chosen] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.trash.map((card) => card.instanceId)).toContain(katakuriId);
    expect(view.players.south.characters.map((card) => card?.instanceId)).toContain(chosen);
    expect(view.players.south.hand).toHaveLength(1);
  });

  test("[On K.O.] may play nothing", () => {
    const engine = OnePieceTestEngine.create(
      {
        character: [{ card: st34CharlotteKatakuri001, playedOnTurn: 0, rested: true }],
        hand: [eb01Doma005],
      },
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { firstPlayer: "south", activeSeat: "north" },
    );
    const katakuriId = engine.findCardInZone("south", "character", st34CharlotteKatakuri001);
    const godId = engine.findCardInZone("north", "character", eb01MountainGod018);

    engine.declareAttack(godId, katakuriId, "north");
    engine.resolveDecision("battleCounter", { selectedIds: [] }, "south");
    engine.resolveDecision("effectPlaySelection", { selectedIds: [] }, "south");

    const view = engine.getView("south");
    expect(view.players.south.characters.filter(Boolean)).toHaveLength(0);
    expect(view.players.south.hand).toHaveLength(1);
    expect(view.prompts).toHaveLength(0);
  });
});
