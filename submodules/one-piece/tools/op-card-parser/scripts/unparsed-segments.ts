/**
 * List the printed-text segments the effect parser silently dropped or only
 * partially parsed, per card.
 *
 *   vp run unparsed -- --set OP15EB04
 *   vp run unparsed -- --id OP15-058 --id OP15-061
 *   vp run unparsed -- --set OP16 --json
 *
 * `buildCardEffects` skips a segment when no action parser matches it, so a
 * definition can look complete while missing an ability. This script re-parses
 * the stored English text of each card and prints the segments that produced
 * no actions (`dropped`) or left trailing text unparsed (`partial`), together
 * with cards that have printed text but no structured effects at all.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { OPCard } from "@tcg/op-types";
import { buildCardEffects, lastSegmentDiagnostics } from "../src/effect-parser/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(__dirname, "..");
const CARDS_DIR = join(PACKAGE_DIR, "../../packages/cards/src/cards");
const CARD_SUBDIRS = ["leaders", "characters", "events", "stages"];

interface CliOptions {
  set?: string;
  ids: Set<string>;
  json: boolean;
}

interface CardReport {
  id: string;
  name: string;
  file: string;
  hasText: boolean;
  hasEffects: boolean;
  dropped: string[];
  partial: { segment: string; unparsed: string }[];
}

function usage(): never {
  console.error("Usage: vp run unparsed -- (--set <STORED_SET> | --id <CARD_ID>...) [--json]");
  process.exit(2);
}

function parseArgs(args: string[]): CliOptions {
  let set: string | undefined;
  let json = false;
  const ids = new Set<string>();
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument === "--") continue;
    if (argument === "--json") {
      json = true;
      continue;
    }
    const value = args[index + 1];
    if (argument === "--set" && value && !value.startsWith("--")) {
      set = value.toUpperCase();
      index += 1;
      continue;
    }
    if (argument === "--id" && value && !value.startsWith("--")) {
      ids.add(value.toUpperCase());
      index += 1;
      continue;
    }
    usage();
  }
  if (!set && ids.size === 0) usage();
  return { set, ids, json };
}

function cardFiles(storedSets: string[]): string[] {
  const files: string[] = [];
  for (const storedSet of storedSets) {
    for (const subdir of CARD_SUBDIRS) {
      const directory = join(CARDS_DIR, storedSet, subdir);
      if (!existsSync(directory)) continue;
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (
          entry.isFile() &&
          entry.name.endsWith(".ts") &&
          !entry.name.endsWith(".i18n.ts") &&
          entry.name !== "index.ts"
        ) {
          files.push(join(directory, entry.name));
        }
      }
    }
  }
  return files.sort();
}

async function loadCard(file: string): Promise<OPCard | undefined> {
  const module = (await import(`${pathToFileURL(file).href}?unparsed=${Date.now()}`)) as Record<
    string,
    unknown
  >;
  return Object.values(module).find(
    (value): value is OPCard =>
      typeof value === "object" && value !== null && "cardType" in value && "id" in value,
  );
}

function printedText(card: OPCard): string {
  const storedEffectText = card.effect ?? card.i18n.en.effect;
  const trimmedEffectText = storedEffectText?.trim();
  const effectText =
    trimmedEffectText && !/^(?:NULL|-)$/i.test(trimmedEffectText) ? trimmedEffectText : undefined;
  const trigger = "trigger" in card ? card.trigger : undefined;
  const triggerText =
    trigger && !/(?:^|\n)\s*\[Trigger\]/i.test(effectText ?? "")
      ? `[Trigger] ${trigger}`
      : undefined;
  return [effectText, triggerText].filter((text): text is string => Boolean(text)).join("\n");
}

function report(card: OPCard, file: string): CardReport {
  const text = printedText(card);
  const generated = text ? buildCardEffects(text) : undefined;
  const diagnostics = text ? lastSegmentDiagnostics() : [];
  return {
    id: card.id,
    name: card.name,
    file: relative(PACKAGE_DIR, file).replaceAll("\\", "/"),
    hasText: Boolean(text),
    hasEffects: Boolean(generated),
    dropped: diagnostics.filter((d) => d.dropped).map((d) => d.rawActionText),
    partial: diagnostics
      .filter((d) => !d.dropped && d.unparsed.trim() !== "")
      .map((d) => ({ segment: d.rawActionText, unparsed: d.unparsed })),
  };
}

const options = parseArgs(process.argv.slice(2));
const storedSets = options.set
  ? [options.set]
  : readdirSync(CARDS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

const reports: CardReport[] = [];
for (const file of cardFiles(storedSets)) {
  if (options.ids.size > 0 && !options.ids.has(fileCardId(file))) continue;
  const card = await loadCard(file);
  if (!card) continue;
  if (options.ids.size > 0 && !options.ids.has(card.id)) continue;
  reports.push(report(card, file));
}

function fileCardId(file: string): string {
  const source = readFileSync(file, "utf8");
  return /^ {2,4}id: "([^"]+)",$/m.exec(source)?.[1] ?? "";
}

const incomplete = reports.filter(
  (r) => (r.hasText && !r.hasEffects) || r.dropped.length > 0 || r.partial.length > 0,
);

if (options.json) {
  console.log(JSON.stringify(incomplete, null, 2));
} else {
  for (const r of incomplete) {
    const flags = [
      r.hasText && !r.hasEffects ? "no-effects" : undefined,
      r.dropped.length > 0 ? `dropped=${r.dropped.length}` : undefined,
      r.partial.length > 0 ? `partial=${r.partial.length}` : undefined,
    ]
      .filter(Boolean)
      .join(" ");
    console.log(`${r.id} ${r.name} [${flags}] ${r.file}`);
    for (const segment of r.dropped) console.log(`  dropped: ${segment}`);
    for (const { segment, unparsed } of r.partial) {
      console.log(`  partial: ${segment}`);
      console.log(`           unparsed: ${unparsed}`);
    }
  }
  console.log(
    `\n${incomplete.length} of ${reports.length} cards have dropped or partially parsed segments`,
  );
}

if (options.ids.size > 0) {
  const missing = [...options.ids].filter((id) => !reports.some((r) => r.id === id));
  if (missing.length > 0) {
    console.error(`Not found in the catalog: ${missing.join(", ")}`);
    process.exitCode = 1;
  }
}
