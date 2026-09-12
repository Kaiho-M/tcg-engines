import type { RawOPCard, RawSet, Scraper } from "../types/scraper.ts";
import { RateLimiter } from "../utils/rate-limiter.ts";

/**
 * Bandai's official English card list (https://en.onepiece-cardgame.com/cardlist/).
 *
 * One HTML page per series holds every card of that series with its printed text.
 * Compared with optcgapi this source is authoritative and fixes several defects
 * (checked on OP-17, where 42 of 119 cards differed):
 *
 * - optcgapi drops the "−" from power/cost modifiers ("Characters 4000 power");
 * - some optcgapi texts are truncated or reworded, and a few have typos;
 * - optcgapi writes "[Rush Character]" where the card says "[Rush: Character]";
 * - optcgapi concatenates types ("Heart Pirates Supernovas The Seven Warlords of
 *   the Sea") while the official list separates them with "/";
 * - optcgapi has no ST-22 or later, no promos, and some rows are malformed
 *   (OP17-099 carries its type string in the power column).
 *
 * The page is plain server-rendered HTML, so it is parsed with regular
 * expressions rather than a DOM library (the package has no dependencies).
 */

const BASE_URL = "https://en.onepiece-cardgame.com/cardlist/";
const IMAGE_BASE = "https://en.onepiece-cardgame.com/images/cardlist/card/";
const DOMAIN = "en.onepiece-cardgame.com";

/** Series id in the `?series=` query, by the set code this repository uses. */
export const OFFICIAL_SERIES: Record<string, string> = {
  OP01: "569101",
  OP02: "569102",
  OP03: "569103",
  OP04: "569104",
  OP05: "569105",
  OP06: "569106",
  OP07: "569107",
  OP08: "569108",
  OP09: "569109",
  OP10: "569110",
  OP11: "569111",
  OP12: "569112",
  OP13: "569113",
  OP14EB04: "569114",
  OP15EB04: "569115",
  OP16: "569116",
  OP17: "569117",
  EB01: "569201",
  EB02: "569202",
  EB03: "569203",
  PRB01: "569301",
  PRB02: "569302",
  ST01: "569001",
  ST02: "569002",
  ST03: "569003",
  ST04: "569004",
  ST05: "569005",
  ST06: "569006",
  ST07: "569007",
  ST08: "569008",
  ST09: "569009",
  ST10: "569010",
  ST11: "569011",
  ST12: "569012",
  ST13: "569013",
  ST14: "569014",
  ST15: "569015",
  ST16: "569016",
  ST17: "569017",
  ST18: "569018",
  ST19: "569019",
  ST20: "569020",
  ST21: "569021",
  ST22: "569022",
  ST23: "569023",
  ST24: "569024",
  ST25: "569025",
  ST26: "569026",
  ST27: "569027",
  ST28: "569028",
  ST29: "569029",
  ST30: "569030",
  ST31: "569031",
  ST32: "569032",
  ST33: "569033",
  ST34: "569034",
  ST35: "569035",
  ST36: "569036",
  P: "569901",
  OTHER: "569801",
};

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** `<div class="cost"><h3>Cost</h3>5</div>` → `["Cost", "5"]`. */
function labelledField(block: string, className: string): [string, string] | null {
  const match = new RegExp(
    `<div class="${className}"><h3>([\\s\\S]*?)</h3>([\\s\\S]*?)</div>`,
  ).exec(block);
  return match ? [stripTags(match[1]!), stripTags(match[2]!)] : null;
}

/** The site prints "-" where a card has no value; Cost "-" means a printed 0. */
function dashToNull(value: string | undefined): string | null {
  return value === undefined || value === "" || value === "-" ? null : value;
}

export class OfficialCardlistScraper implements Scraper {
  readonly name = "official-cardlist";
  readonly source = BASE_URL;
  readonly #limiter: RateLimiter;

  constructor(limiter = new RateLimiter(0.5)) {
    this.#limiter = limiter;
  }

  /** The series dropdown is the same on every page, so any one page lists them all. */
  async scrapeSetList(): Promise<RawSet[]> {
    const html = await this.#fetchSeries(OFFICIAL_SERIES.OP17!);
    return [...html.matchAll(/<option value="(\d+)"[^>]*>([\s\S]*?)<\/option>/g)].map((match) => ({
      id: match[1]!,
      name: stripTags(match[2]!).replace(/\s+/g, " "),
    }));
  }

  /** `setId` is either a set code from {@link OFFICIAL_SERIES} or a raw series id. */
  async scrapeCards(setId: string): Promise<RawOPCard[]> {
    const series = OFFICIAL_SERIES[setId.toUpperCase()] ?? setId;
    return parseSeriesPage(await this.#fetchSeries(series));
  }

  async #fetchSeries(series: string): Promise<string> {
    await this.#limiter.throttle(DOMAIN);
    const res = await fetch(`${BASE_URL}?series=${series}`, {
      headers: { "user-agent": "op-card-parser (card definition generator)" },
    });
    if (!res.ok) throw new Error(`series ${series} failed: ${res.status}`);
    return res.text();
  }
}

/**
 * Parse one saved series page. Exported so a page fetched by other means (or kept
 * for reproducible regeneration) can be used without hitting the site again.
 */
export function parseSeriesPage(html: string): RawOPCard[] {
  const cards: RawOPCard[] = [];
  for (const [, rawId, block] of html.matchAll(
    /<dl class="modalCol" id="([^"]+)">([\s\S]*?)<\/dl>/g,
  )) {
    const id = rawId!;
    const info = /<div class="infoCol">([\s\S]*?)<\/div>/.exec(block!);
    const name = /<div class="cardName">([\s\S]*?)<\/div>/.exec(block!);
    if (!info || !name) continue;
    const spans = [...info[1]!.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((m) => stripTags(m[1]!));
    const [, rarity, category] = spans;
    if (!rarity || !category) continue;

    const costField = labelledField(block!, "cost");
    const isLeader = costField?.[0] === "Life";
    const power = dashToNull(labelledField(block!, "power")?.[1]);
    const counter = dashToNull(labelledField(block!, "counter")?.[1]);
    const attribute = /<div class="attribute">[\s\S]*?<i>([\s\S]*?)<\/i>/.exec(block!);
    const effect = /<div class="text"><h3>[\s\S]*?<\/h3>([\s\S]*?)<\/div>/.exec(block!);
    const trigger = /<div class="trigger"><h3>[\s\S]*?<\/h3>([\s\S]*?)<\/div>/.exec(block!);
    const setCode = /\[([A-Z0-9-]+)\]\s*$/.exec(labelledField(block!, "getInfo")?.[1] ?? "");

    const text = [
      dashToNull(effect ? stripTags(effect[1]!) : undefined),
      trigger ? `[Trigger] ${stripTags(trigger[1]!)}` : undefined,
    ]
      .filter((part): part is string => Boolean(part))
      .join("\n");

    // Alternate arts are separate entries whose id carries a suffix ("OP17-112_p1").
    const baseId = id.split("_")[0]!;
    cards.push({
      card_name: stripTags(name[1]!),
      set_name: labelledField(block!, "getInfo")?.[1] ?? "",
      card_text: text,
      set_id: setCode?.[1] ?? baseId.split("-")[0]!,
      rarity,
      card_set_id: baseId,
      card_color: labelledField(block!, "color")?.[1] ?? "",
      card_type: category,
      life: isLeader ? (costField?.[1] ?? null) : null,
      // A printed cost of 0 is shown as "-", unlike power and counter which are absent.
      card_cost: isLeader ? null : costField?.[1] === "-" ? "0" : (costField?.[1] ?? null),
      card_power: power,
      sub_types: labelledField(block!, "feature")?.[1] ?? null,
      counter_amount: counter === null ? null : Number.parseInt(counter, 10),
      attribute: attribute ? stripTags(attribute[1]!) || null : null,
      card_image_id: id,
      card_image: `${IMAGE_BASE}${id}.png`,
      inventory_price: 0,
      market_price: 0,
    });
  }
  return cards;
}
