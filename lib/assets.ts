/* Server-only helper (uses the file system): import it from server components only. */
import fs from "node:fs";
import path from "node:path";

/** Returns the public URL if the file exists in /public, otherwise null (so pages can show a placeholder). */
export function asset(url: string): string | null {
  return fs.existsSync(path.join(process.cwd(), "public", url)) ? url : null;
}
