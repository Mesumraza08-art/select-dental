const SMALL = new Set(["&", "and", "in", "of", "for", "the", "a", "to"]);

/** "Teeth whitening" to "Teeth Whitening" for page titles. Keeps acronyms such as TMJ. */
export function titleCase(s: string) {
  return s
    .split(" ")
    .map((w, i) => (i > 0 && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

const KEEP_CASE = new Set(["Invisalign", "TMJ", "CDCP"]);

/** Service name for use mid-sentence: "Teeth whitening" to "teeth whitening", but "TMJ" and "Invisalign" stay. */
export function inSentence(name: string) {
  const first = name.split(" ")[0];
  if (KEEP_CASE.has(first)) return name;
  return name.charAt(0).toLowerCase() + name.slice(1);
}
