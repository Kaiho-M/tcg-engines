import { describe, expect, test } from "vite-plus/test";
import { eb01Doma005, eb01MountainGod018, eb01TonyTonyChopper006 } from "@tcg/op-cards";
import { st29KizaruComparedToTwoYearsAgoWeReAHundredTimesStrongerNow016 as st29Kizaru016 } from "../../../../cards/src/cards/events/st29-016-kizaru-compared-to-two-years-ago-we-re-a-hundred-times-stronger-now.ts";
import { st29MonkeyDLuffy001 } from "../../../../cards/src/cards/leaders/st29-001-monkey-d-luffy.ts";

import { OnePieceTestEngine } from "../../../src/index.ts";
import { getKeywords } from "../../../src/shared.ts";

describe("ST29-016 Kizaru!! Compared to Two Years Ago We're a Hundred Times Stronger Now!!", () => {
  test("[Main] gives a [Monkey.D.Luffy] Leader [Unblockable] so a Blocker cannot step in", () => {
    const engine = OnePieceTestEngine.create(
      { leaderCardId: st29MonkeyDLuffy001, hand: [st29Kizaru016], activeDon: 1, life: 3 },
      { character: [{ card: eb01TonyTonyChopper006, playedOnTurn: 0 }], hand: 1 },
      { firstPlayer: "north", activeSeat: "south" },
    );

    engine.playCard(st29Kizaru016, "south");
    expect(getKeywords(engine.getState(), engine.leader("south"))).toContain("unblockable");

    engine.declareAttack(engine.leader("south"), engine.leader("north"), "south");
    // No Blocker window: the battle goes straight to the Counter step.
    expect(engine.getView("north").prompts.some((prompt) => prompt.label.includes("block"))).toBe(
      false,
    );
    expect(engine.pendingDecision("battleCounter", "north")).toBeDefined();
  });

  test("[Counter] gives the Leader +3000 power during the battle", () => {
    const engine = OnePieceTestEngine.create(
      { character: [{ card: eb01MountainGod018, playedOnTurn: 0 }] },
      { hand: [st29Kizaru016, eb01Doma005], activeDon: 1, life: 2 },
      { firstPlayer: "north", activeSeat: "south" },
    );
    const godId = engine.findCardInZone("south", "character", eb01MountainGod018);
    const kizaruId = engine.findCardInZone("north", "hand", st29Kizaru016);

    engine.declareAttack(godId, engine.leader("north"), "south");
    engine.resolveDecision("battleCounter", { selectedIds: [kizaruId] }, "north");

    const view = engine.getView("north");
    // 5000 + 3000 = 8000 > 7000: the Leader is not hit.
    expect(view.players.north.lifeCount).toBe(2);
    expect(view.players.north.trash.map((card) => card.instanceId)).toContain(kizaruId);
    expect(view.players.north.activeDon).toBe(0);
  });
});
