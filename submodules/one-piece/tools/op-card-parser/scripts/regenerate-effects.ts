/**
 * Re-parse the stored printed text of existing card definitions and rewrite
 * their `effects:` block when the parser output changed.
 *
 *   vp run regenerate:effects -- --set OP17            # report only
 *   vp run regenerate:effects -- --set OP17 --write
 *   vp run regenerate:effects -- --id OP17-040 --id OP17-049 --write
 *
 * `generate-set-files.ts` never overwrites a definition, so parser fixes do
 * not reach cards that are already checked in. This script closes that gap
 * while leaving every other field (printed text, printings, i18n) untouched.
 * Without `--write` it lists the cards whose structured effects would change;
 * review that list before writing, since hand-corrected definitions are
 * replaced by the parser output as well.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { CardEffects, OPCard } from "@tcg/op-types";
import { buildCardEffects } from "../src/effect-parser/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(__dirname, "..");
const CARDS_DIR = join(PACKAGE_DIR, "../../packages/cards/src/cards");
const CARD_SUBDIRS = ["leaders", "characters", "events", "stages"];

interface CliOptions {
  set?: string;
  ids: Set<string>;
  write: boolean;
}

function usage(): never {
  console.error(
    "Usage: vp run regenerate:effects -- (--set <STORED_SET> | --id <CARD_ID>...) [--write]",
  );
  process.exit(2);
}

function parseArgs(args: string[]): CliOptions {
  let set: string | undefined;
  let write = false;
  const ids = new Set<string>();
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument === "--") continue;
    if (argument === "--write") {
      write = true;
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
  return { set, ids, write };
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

function fileCardId(file: string): string {
  return /^ {2,4}id: "([^"]+)",$/m.exec(readFileSync(file, "utf8"))?.[1] ?? "";
}

async function loadCard(file: string): Promise<OPCard | undefined> {
  const module = (await import(`${pathToFileURL(file).href}?regenerate=${Date.now()}`)) as Record<
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

function renderEffects(effects: CardEffects, indent: string): string {
  const json = JSON.stringify(effects, null, 2).replace(/"(\w+)":/g, "$1:");
  const lines = json.split("\n").map((line) => `${indent}${line}`);
  lines[0] = `${indent}effects: {`;
  lines[lines.length - 1] = `${indent}},`;
  return lines.join("\n");
}

function replaceEffects(file: string, effects: CardEffects | undefined): void {
  const source = readFileSync(file, "utf8");
  // The formatter indents the whole object one level deeper when the export
  // name is long, so take the indentation from the `i18n:` line.
  const indent = /^( +)i18n:/m.exec(source)?.[1] ?? "  ";
  const existingPattern = new RegExp(
    `\\n${indent}effects: \\{[\\s\\S]*?\\n${indent}\\},\\n(?=${indent}i18n:)`,
  );
  const existing = existingPattern.test(source);
  let next = source;
  if (effects && existing) {
    next = source.replace(existingPattern, `\n${renderEffects(effects, indent)}\n`);
  } else if (effects) {
    next = source.replace(
      new RegExp(`\\n(?=${indent}i18n:)`),
      `\n${renderEffects(effects, indent)}\n`,
    );
  } else if (existing) {
    next = source.replace(existingPattern, "\n");
  }
  if (next === source) throw new Error(`Could not update the effects block in ${file}.`);
  writeFileSync(file, next);
}

const options = parseArgs(process.argv.slice(2));
const storedSets = options.set
  ? [options.set]
  : readdirSync(CARDS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

let changed = 0;
let seen = 0;
for (const file of cardFiles(storedSets)) {
  if (options.ids.size > 0 && !options.ids.has(fileCardId(file))) continue;
  const card = await loadCard(file);
  if (!card) continue;
  seen += 1;
  const text = printedText(card);
  const generated = text ? buildCardEffects(text) : undefined;
  const current = card.effects;
  if (JSON.stringify(generated ?? null) === JSON.stringify(current ?? null)) continue;
  changed += 1;
  const label = `${card.id} ${card.name} (${relative(PACKAGE_DIR, file).replaceAll("\\", "/")})`;
  if (options.write) {
    replaceEffects(file, generated);
    console.log(`rewrote ${label}`);
  } else {
    console.log(`would change ${label}`);
  }
}

console.log(
  `${changed} of ${seen} cards ${options.write ? "rewritten" : "would change"}${options.write ? "" : " (pass --write to apply)"}`,
);
