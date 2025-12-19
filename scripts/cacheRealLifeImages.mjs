import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const outDir = path.join(repoRoot, "public", "assets", "real-life");
fs.mkdirSync(outDir, { recursive: true });

const simContentUrl = pathToFileURL(
  path.join(repoRoot, "src", "utils", "simulationContent.js")
);
const simContent = await import(simContentUrl.href);
const TOPIC_CONTENT = simContent.TOPIC_CONTENT;

if (!TOPIC_CONTENT || typeof TOPIC_CONTENT !== "object") {
  throw new Error(
    "TOPIC_CONTENT is not exported from src/utils/simulationContent.js"
  );
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "phet-revamp-image-cache/1.0 (local dev)",
      accept: "application/json",
    },
  });
  if (!res.ok) return null;
  return res.json();
}

async function resolveWikiTitle(query) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&origin=*" +
    `&search=${encodeURIComponent(query)}`;
  const data = await fetchJson(url);
  const title =
    Array.isArray(data) && Array.isArray(data[1]) ? data[1][0] : null;
  return title || null;
}

async function fetchWikiThumbnail(title, width = 1200) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=" +
    `${encodeURIComponent(String(width))}` +
    "&format=json&origin=*" +
    `&titles=${encodeURIComponent(title)}`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  return page?.thumbnail?.source || null;
}

async function resolveBestWikiThumb(example) {
  const candidates = [];
  if (example?.wikiQuery) candidates.push(example.wikiQuery);
  if (example?.title) candidates.push(example.title);
  if (Array.isArray(example?.imageKeywords)) {
    for (const k of example.imageKeywords) candidates.push(k);
  }

  for (const q of candidates) {
    const query = String(q || "").trim();
    if (!query) continue;

    const title = (await resolveWikiTitle(query)) || null;
    if (!title) continue;

    const thumbUrl = await fetchWikiThumbnail(title, 1200);
    if (!thumbUrl) continue;
    return { title, thumbUrl };
  }

  return null;
}

async function downloadToFile(url, filePath) {
  const res = await fetch(url, {
    headers: { "user-agent": "phet-revamp-image-cache/1.0 (local dev)" },
  });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buf);
  return true;
}

const manifest = {};

for (const [topicKey, topic] of Object.entries(TOPIC_CONTENT)) {
  const examples = Array.isArray(topic?.examples)
    ? topic.examples.slice(0, 2)
    : [];
  if (examples.length === 0) continue;

  const topicDir = path.join(outDir, topicKey);
  fs.mkdirSync(topicDir, { recursive: true });

  manifest[topicKey] = [];

  for (const ex of examples) {
    const resolved = await resolveBestWikiThumb(ex);
    const title = resolved?.title || ex.wikiQuery || ex.title;
    const thumbUrl = resolved?.thumbUrl || null;

    const baseName = slugify(`${ex.title}`) || "example";
    const ext = thumbUrl
      ? path.extname(new URL(thumbUrl).pathname) || ".jpg"
      : ".jpg";
    const fileName = `${baseName}${ext}`;
    const relAssetPath = `assets/real-life/${topicKey}/${fileName}`;
    const absPath = path.join(repoRoot, "public", relAssetPath);

    let ok = false;
    if (thumbUrl) {
      try {
        ok = await downloadToFile(thumbUrl, absPath);
      } catch {
        ok = false;
      }
    }

    if (!ok) {
      // Copy placeholder if we couldn't fetch a relevant thumb.
      const placeholderAbs = path.join(outDir, "placeholder.svg");
      const placeholderTarget = path.join(topicDir, `${baseName}.svg`);
      fs.copyFileSync(placeholderAbs, placeholderTarget);
    }

    manifest[topicKey].push({
      title: ex.title,
      overlayText: ex.overlayText,
      assetPath: ok
        ? relAssetPath.replace(/\\/g, "/")
        : `assets/real-life/${topicKey}/${baseName}.svg`,
      sourcePageUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(
        String(title).replace(/\s+/g, "_")
      )}`,
    });
  }
}

const manifestPath = path.join(repoRoot, "src", "data", "realLifeImages.json");
fs.writeFileSync(
  manifestPath,
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8"
);
console.log(`Wrote manifest: ${path.relative(repoRoot, manifestPath)}`);
console.log(`Images cached under: ${path.relative(repoRoot, outDir)}`);
