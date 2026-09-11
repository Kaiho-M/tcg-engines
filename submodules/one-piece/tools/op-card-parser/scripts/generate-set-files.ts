/**
 * Generate card definition files for a single optcgapi set.
 *
 *   vp run generate:set -- --set OP15-EB04
 *   vp run generate:set -- --set OP-16 --input ./OP-16.json
 *   vp run generate:set -- --set OP-16 --type character
 *
 * Unlike the older `generate-*-files.ts` scripts this writes to
 * `packages/cards/src/cards/<SET>/{leaders,characters,events,stages}/`, handles
 * every card type in one pass (one API request per run), and never overwrites a
 * definition that already exists anywhere in the catalog. Cards whose `id` is
 * already checked in are reported and skipped, so re-running after hand edits is
 * safe. `--input` reads a saved `sets/<id>/` response instead of hitting the API.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { OptcgApiScraper } from "../src/scrapers/optcg-api.ts";
import { normalize } from "../src/normalizer.ts";
import { buildCardEffects } from "../src/effect-parser/index.ts";
import type {
  ArtVariant,
  ArtVariantType,
  CardEffects,
  CharacterCard,
  EventCard,
  LeaderCard,
  OPCard,
  StageCard,
} from "@tcg/op-types";
import type { RawOPCard } from "../src/types/scraper.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, "../../../packages/cards/src/cards");
const CARD_SUBDIRS = ["leaders", "characters", "events", "stages"] as const;

type GeneratedCard = LeaderCard | CharacterCard | EventCard | StageCard;
type CardSubdir = (typeof CARD_SUBDIRS)[number];

const SUBDIR_OF: Record<GeneratedCard["cardType"], CardSubdir> = {
  leader: "leaders",
  character: "characters",
  event: "events",
  stage: "stages",
};

const TYPE_NAME_OF: Record<GeneratedCard["cardType"], string> = {
  leader: "LeaderCard",
  character: "CharacterCard",
  event: "EventCard",
  stage: "StageCard",
};

// --- CLI ---

interface CliOptions {
  set: string;
  input?: string;
  types: Set<GeneratedCard["cardType"]>;
}

function usage(): never {
  console.error(
    "Usage: vp run generate:set -- --set <API_SET_ID> [--input <saved-response.json>] [--type leader|character|event|stage]...",
  );
  console.error("Example: vp run generate:set -- --set OP15-EB04");
  process.exit(2);
}

function parseArgs(args: string[]): CliOptions {
  let set: string | undefined;
  let input: string | undefined;
  const types = new Set<GeneratedCard["cardType"]>();

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument === "--") continue;
    const value = args[index + 1];
    if (argument === "--set" && value && !value.startsWith("--")) {
      set = value;
      index += 1;
      continue;
    }
    if (argument === "--input" && value && !value.startsWith("--")) {
      input = value;
      index += 1;
      continue;
    }
    if (argument === "--type" && value && value in SUBDIR_OF) {
      types.add(value as GeneratedCard["cardType"]);
      index += 1;
      continue;
    }
    usage();
  }

  if (!set) usage();
  if (types.size === 0) {
    for (const type of Object.keys(SUBDIR_OF) as GeneratedCard["cardType"][]) types.add(type);
  }
  return { set, input, types };
}

// --- Variant detection (same table as generate-character-files.ts) ---

const VARIANT_PATTERNS: [RegExp, ArtVariantType][] = [
  [/\(parallel\)/i, "parallel"],
  [/\(alternate art\)/i, "alternate-art"],
  [/\(alt art\)/i, "alternate-art"],
  [/\(manga rare\)/i, "manga-rare"],
  [/\(manga\)/i, "manga-rare"],
  [/\(wanted poster\)/i, "alternate-art"],
  [/\(jolly roger foil\)/i, "other"],
  [/\(pirate foil\)/i, "other"],
  [/\(textured foil\)/i, "other"],
  [/\(reprint\)/i, "promo"],
  [/\(sp\)/i, "spr"],
  [/\bspr\b/i, "spr"],
];

function detectVariantType(name: string): ArtVariantType | null {
  for (const [pattern, type] of VARIANT_PATTERNS) {
    if (pattern.test(name)) return type;
  }
  return null;
}

function isVariant(raw: RawOPCard): boolean {
  return detectVariantType(raw.card_name) !== null;
}

// --- Name / identifier helpers ---

function cardNumber(id: string): string {
  return id.split("-")[1] ?? id;
}

/**
 * Strip disambiguation suffixes the API appends to names:
 * "(001)", "(OP15-058)", "(Parallel)", "(Alternate Art)", "(SPR)", etc.
 */
function cleanName(name: string): string {
  return name
    .replace(/\s*\(\d+\)/g, "") // "(001)", "(061)"
    .replace(/\s*\((?:OP|EB|ST|PRB|P)\d*-\d+\)/g, "") // "(OP15-058)", "(P-105)"
    .replace(/\s*\(parallel\)/gi, "")
    .replace(/\s*\(alternate art\)/gi, "")
    .replace(/\s*\(alt art\)/gi, "")
    .replace(/\s*\(manga rare\)/gi, "")
    .replace(/\s*\(manga\)/gi, "")
    .replace(/\s*\(wanted poster\)/gi, "")
    .replace(/\s*\(jolly roger foil\)/gi, "")
    .replace(/\s*\(pirate foil\)/gi, "")
    .replace(/\s*\(textured foil\)/gi, "")
    .replace(/\s*\(reprint\)/gi, "")
    .replace(/\s*\(sp\)/gi, "")
    .replace(/\s*\bspr\b/gi, "") // strips "SPR" from inside "(SPR)", leaving "()"
    .replace(/\s*\(\)/g, "") // clean up any empty parens left over
    .trim();
}

function slugify(name: string): string {
  return cleanName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toConstName(name: string, id: string, setId: string): string {
  // "OP01" → "op01", "EB02" → "eb02"
  const setPrefix = setId.toLowerCase();
  const num = cardNumber(id);
  const camel = cleanName(name)
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  return `${setPrefix}${camel}${num}`;
}

// --- Existing catalog (ids and slugs already checked in) ---

interface ExistingCatalog {
  ids: Set<string>;
  slugs: Set<string>;
}

function scanExistingCatalog(): ExistingCatalog {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const visit = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(path);
        continue;
      }
      if (!entry.name.endsWith(".ts") || entry.name.endsWith(".i18n.ts")) continue;
      const source = readFileSync(path, "utf8");
      const id = /^  id: "([^"]+)",$/m.exec(source)?.[1];
      const slug = /^  slug: "([^"]+)",$/m.exec(source)?.[1];
      if (id) ids.add(id);
      if (slug) slugs.add(slug);
    }
  };
  if (existsSync(CARDS_DIR)) visit(CARDS_DIR);
  return { ids, slugs };
}

/**
 * Name-based detail slug: the bare name when no other card uses it, otherwise
 * `<name>/<id>` (see "uses name-based card detail slugs" in packages/cards tests).
 */
function detailSlug(
  name: string,
  id: string,
  taken: Set<string>,
  sharedNames: Set<string>,
): string {
  const base = slugify(name);
  const suffixed = `${base}/${id.toLowerCase()}`;
  if (sharedNames.has(base) || taken.has(base)) return suffixed;
  for (const slug of taken) {
    if (slug.startsWith(`${base}/`)) return suffixed;
  }
  return base;
}

// --- File rendering ---

function renderArtVariant(v: ArtVariant): string {
  const lines = [`    {`, `      type: ${JSON.stringify(v.type)},`];
  if (v.imageUrl !== undefined) lines.push(`      imageUrl: ${JSON.stringify(v.imageUrl)},`);
  if (v.imageId !== undefined) lines.push(`      imageId: ${JSON.stringify(v.imageId)},`);
  lines.push(`    }`);
  return lines.join("\n");
}

function renderPrinting(p: GeneratedCard["printings"][number]): string {
  return [
    `    {`,
    `      id: ${JSON.stringify(p.id)},`,
    `      artId: ${JSON.stringify(p.artId)},`,
    `      setCode: ${JSON.stringify(p.setCode)},`,
    `      collectorNumber: ${JSON.stringify(p.collectorNumber)},`,
    `      rarity: ${JSON.stringify(p.rarity)},`,
    `      imageUrl: ${JSON.stringify(p.imageUrl)},`,
    `    }`,
  ].join("\n");
}

function renderI18n(card: GeneratedCard, constName: string): string {
  const { name, effect, imageUrl } = card.i18n.en;
  const lines = [
    `import type { OPCardI18n } from "@tcg/op-types";`,
    ``,
    `export const ${constName}I18n: OPCardI18n = {`,
    `  en: {`,
    `    name: ${JSON.stringify(name)},`,
  ];
  if (effect !== undefined) lines.push(`    effect: ${JSON.stringify(effect)},`);
  if (imageUrl !== undefined) lines.push(`    imageUrl: ${JSON.stringify(imageUrl)},`);
  lines.push(`  },`, `};`, ``);
  return lines.join("\n");
}

function toTs(obj: unknown): string {
  return JSON.stringify(obj, null, 2).replace(/"(\w+)":/g, "$1:");
}

function renderEffects(effects: CardEffects): string {
  const json = toTs(effects);
  const lines = json.split("\n").map((l) => "  " + l);
  lines[0] = "  effects: {";
  lines[lines.length - 1] = "  },";
  return lines.join("\n");
}

function renderCard(card: GeneratedCard, constName: string, slug: string, num: string): string {
  const typeName = TYPE_NAME_OF[card.cardType];
  const lines = [
    `import type { ${typeName} } from "@tcg/op-types";`,
    `import { ${constName}I18n } from "./${num}-${slug}.i18n.ts";`,
    ``,
    `export const ${constName}: ${typeName} = {`,
    `  id: ${JSON.stringify(card.id)},`,
    `  canonicalId: ${JSON.stringify(card.canonicalId)},`,
    `  slug: ${JSON.stringify(card.slug)},`,
    `  name: ${JSON.stringify(card.name)},`,
    `  printings: [\n${card.printings.map(renderPrinting).join(",\n")},\n  ],`,
    `  cardType: ${JSON.stringify(card.cardType)},`,
    `  color: ${JSON.stringify(card.color)},`,
    `  rarity: ${JSON.stringify(card.rarity)},`,
    `  setId: ${JSON.stringify(card.setId)},`,
  ];

  if (card.cardType !== "leader") lines.push(`  cost: ${card.cost},`);
  if (card.cardType === "leader" || card.cardType === "character") {
    if (card.power !== undefined) lines.push(`  power: ${card.power},`);
  }
  if (card.cardType === "leader") lines.push(`  life: ${card.life},`);
  if (card.cardType === "leader" || card.cardType === "character") {
    if (card.counter !== undefined) lines.push(`  counter: ${card.counter},`);
  }
  if (card.cardType !== "leader" && card.trigger !== undefined) {
    lines.push(`  trigger: ${JSON.stringify(card.trigger)},`);
  }
  if (card.traits !== undefined && card.traits.length > 0)
    lines.push(`  traits: ${JSON.stringify(card.traits)},`);
  if (card.attribute !== undefined) lines.push(`  attribute: ${JSON.stringify(card.attribute)},`);

  if (card.artVariants !== undefined && card.artVariants.length > 0) {
    lines.push(`  artVariants: [\n${card.artVariants.map(renderArtVariant).join(",\n")},\n  ],`);
  }

  const effectText = card.i18n.en.effect;
  if (effectText !== undefined) lines.push(`  effect: ${JSON.stringify(effectText)},`);
  if (card.effects) {
    lines.push(renderEffects(card.effects));
  }

  lines.push(`  i18n: ${constName}I18n,`, `};`, ``);

  return lines.join("\n");
}

// --- Building a card from the raw entries that share one card_set_id ---

function buildCard(
  baseRaw: RawOPCard,
  variantRaws: RawOPCard[],
  slug: string,
): GeneratedCard | undefined {
  let card: OPCard;
  try {
    card = normalize(baseRaw);
  } catch (err) {
    console.log(`  ! ${baseRaw.card_set_id}: ${err instanceof Error ? err.message : String(err)}`);
    return undefined;
  }
  if (card.cardType === "don") return undefined;

  const name = cleanName(card.name);
  card.name = name;
  card.slug = slug;
  card.i18n = { ...card.i18n, en: { ...card.i18n.en, name } };

  // Parse effects from effect text (plus the [Trigger] clause the normalizer split off)
  const printedEffect = card.i18n.en.effect;
  const trigger = card.cardType === "leader" ? undefined : card.trigger;
  const effectText = [
    printedEffect,
    trigger && !/\[Trigger\]/i.test(printedEffect ?? "") ? `[Trigger] ${trigger}` : undefined,
  ]
    .filter((text): text is string => Boolean(text))
    .join("\n");
  if (effectText) {
    const effects = buildCardEffects(effectText);
    if (effects) card.effects = effects;
  }

  // The base printing mirrors the card id even when only an alternate art was scraped.
  const basePrinting = card.printings[0]!;
  const printings = [
    {
      ...basePrinting,
      artId: baseRaw.card_image_id ?? card.id,
      imageUrl: baseRaw.card_image ?? "",
    },
  ];
  const artVariants: ArtVariant[] = [];
  for (const [index, raw] of variantRaws.entries()) {
    const imageId = raw.card_image_id ?? `${card.id}_p${index + 1}`;
    artVariants.push({
      type: detectVariantType(raw.card_name) ?? "other",
      ...(raw.card_image && { imageUrl: raw.card_image }),
      imageId,
    });
    if (raw.card_image) {
      printings.push({
        ...basePrinting,
        id: imageId,
        artId: imageId,
        imageUrl: raw.card_image,
      });
    }
  }
  card.printings = printings;
  if (artVariants.length > 0) card.artVariants = artVariants;

  return card;
}

// --- Index maintenance ---

function exportLine(constName: string, fileStem: string): string {
  return `export { ${constName} } from "./${fileStem}.ts";`;
}

function appendExports(indexFile: string, lines: string[]): void {
  const existing = existsSync(indexFile)
    ? readFileSync(indexFile, "utf8").split("\n").filter(Boolean)
    : [];
  const merged = [...existing, ...lines.filter((line) => !existing.includes(line))];
  writeFileSync(indexFile, merged.join("\n") + "\n");
}

function rewriteRootIndex(): void {
  const rootLines: string[] = [];
  const setIds = readdirSync(CARDS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  for (const setId of setIds) {
    if (existsSync(join(CARDS_DIR, setId, "index.ts"))) {
      rootLines.push(`export * from "./${setId}/index.ts";`);
      continue;
    }
    for (const subdir of CARD_SUBDIRS) {
      if (existsSync(join(CARDS_DIR, setId, subdir, "index.ts"))) {
        rootLines.push(`export * from "./${setId}/${subdir}/index.ts";`);
      }
    }
  }
  writeFileSync(join(CARDS_DIR, "index.ts"), rootLines.join("\n") + "\n");
}

// --- Main ---

const options = parseArgs(process.argv.slice(2));

let rawCards: RawOPCard[];
if (options.input) {
  rawCards = JSON.parse(readFileSync(options.input, "utf8")) as RawOPCard[];
  console.log(`Read ${rawCards.length} entries for ${options.set} from ${options.input}`);
} else {
  const scraper = new OptcgApiScraper();
  rawCards = await scraper.scrapeCards(options.set);
  console.log(`Fetched ${rawCards.length} entries for ${options.set}`);
}

const existing = scanExistingCatalog();

// Group by card_set_id: the first non-variant entry is the base, the rest are art variants.
const grouped = new Map<string, { bases: RawOPCard[]; variants: RawOPCard[] }>();
for (const raw of rawCards) {
  const group = grouped.get(raw.card_set_id) ?? { bases: [], variants: [] };
  grouped.set(raw.card_set_id, group);
  (isVariant(raw) ? group.variants : group.bases).push(raw);
}

// Names shared by several cards in this batch get the `<name>/<id>` slug form.
const nameCounts = new Map<string, number>();
for (const { bases, variants } of grouped.values()) {
  const raw = bases[0] ?? variants[0];
  if (!raw) continue;
  const base = slugify(raw.card_name);
  nameCounts.set(base, (nameCounts.get(base) ?? 0) + 1);
}
const sharedNames = new Set([...nameCounts].filter(([, n]) => n > 1).map(([name]) => name));

const skipped: string[] = [];
const written = new Map<CardSubdir, string[]>();
let setDirName: string | undefined;
const takenSlugs = new Set(existing.slugs);

for (const cardId of [...grouped.keys()].sort()) {
  const { bases, variants } = grouped.get(cardId)!;
  const baseRaw = bases[0] ?? variants[0];
  if (!baseRaw) continue;
  if (existing.ids.has(cardId)) {
    skipped.push(cardId);
    continue;
  }
  const cardTypeRaw = baseRaw.card_type.trim().toLowerCase();
  if (!(cardTypeRaw in SUBDIR_OF) || !options.types.has(cardTypeRaw as GeneratedCard["cardType"]))
    continue;

  const slug = detailSlug(baseRaw.card_name, cardId, takenSlugs, sharedNames);
  const variantRaws = bases.length > 0 ? [...bases.slice(1), ...variants] : variants.slice(1);
  const card = buildCard(baseRaw, variantRaws, slug);
  if (!card) continue;
  takenSlugs.add(slug);

  setDirName ??= card.setId;
  const subdir = SUBDIR_OF[card.cardType];
  const setDir = join(CARDS_DIR, card.setId, subdir);
  mkdirSync(setDir, { recursive: true });

  const num = cardNumber(card.id);
  const fileSlug = slugify(card.name);
  const constName = toConstName(card.name, card.id, card.setId);
  const fileStem = `${num}-${fileSlug}`;

  writeFileSync(join(setDir, `${fileStem}.i18n.ts`), renderI18n(card, constName));
  writeFileSync(join(setDir, `${fileStem}.ts`), renderCard(card, constName, fileSlug, num));
  const lines = written.get(subdir) ?? [];
  lines.push(exportLine(constName, fileStem));
  written.set(subdir, lines);
  existing.ids.add(card.id);
}

if (skipped.length > 0) {
  console.log(`Skipped ${skipped.length} ids already in the catalog: ${skipped.join(", ")}`);
}

let totalFiles = 0;
for (const [subdir, lines] of written) {
  appendExports(join(CARDS_DIR, setDirName!, subdir, "index.ts"), lines);
  console.log(`  ${setDirName}/${subdir}: ${lines.length} new`);
  totalFiles += lines.length;
}

if (totalFiles === 0) {
  console.log("Nothing to write.");
} else {
  rewriteRootIndex();
  console.log(`\n✓ ${totalFiles} card files written to packages/cards/src/cards/${setDirName}/`);
  execSync(`vp fmt "packages/cards/src/cards/${setDirName}" packages/cards/src/cards/index.ts`, {
    stdio: "inherit",
    cwd: join(__dirname, "../../.."),
  });
}
