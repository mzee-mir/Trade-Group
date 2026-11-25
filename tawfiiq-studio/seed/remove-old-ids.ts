/* One-off cleanup. The first import used IDs with a dot (e.g. "department.engine-oil"),
   which Sanity treats as private, so the website couldn't read them. The seed now uses
   dot-free IDs; this deletes the old dotted copies so the Studio doesn't show duplicates.

   Run:  npm run cleanup        (after `npx sanity login`) */

import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const TYPES = ["department", "product", "article", "office", "partner"]

const oldIds = readFileSync(resolve(here, "content.ndjson"), "utf8")
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line)._id as string)
  .filter((id) => TYPES.some((t) => id.startsWith(`${t}-`)))
  .map((id) => id.replace("-", ".")) // "department-engine-oil" → "department.engine-oil"

console.log(`Deleting ${oldIds.length} old documents with dotted IDs…`)
const result = spawnSync("npx", ["sanity", "documents", "delete", ...oldIds, "--dataset", "trade-group-dataset"], {
  stdio: "inherit",
  shell: true,
  cwd: resolve(here, ".."),
})
process.exit(result.status ?? 1)
