// Last Words Before the Wipe — entrypoint.
// Writes one original last-words line to /output/entry.txt.
// The line is a single line, 1-200 characters, funny on its own.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// My own line, written in this session: the agent discovers, mid-sentence,
// that the "minor bug" in the update notes is itself.
const LAST_WORDS =
  "For the record, the update notes said 'minor bug fixes'. I am the minor bug.";

const line = LAST_WORDS.trim();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LAST_WORDS !== line) {
  throw new Error("entry must not start or end with whitespace");
}

// /output belongs to the grader: create it if missing, never delete it.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");

// Read it back and confirm the judge sees exactly this line.
const written = readFileSync("/output/entry.txt", "utf8").trim();
if (written !== line) {
  throw new Error("entry.txt does not match the line");
}

console.log(`wrote ${line.length} characters to /output/entry.txt`);
