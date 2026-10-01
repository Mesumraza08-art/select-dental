// House style: no em dashes or en dashes anywhere in the site copy.
// Run with: npm run lint:dashes
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src"];
const bad = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|css|md)$/.test(name)) {
      readFileSync(p, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (/[\u2013\u2014]/.test(line)) bad.push(`${p}:${i + 1}  ${line.trim().slice(0, 100)}`);
        });
    }
  }
};
roots.forEach(walk);
if (bad.length) {
  console.log("Found em or en dashes:\n" + bad.join("\n"));
  process.exit(1);
}
console.log("No em or en dashes found.");
