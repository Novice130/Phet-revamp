import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, "..");
const simulationsPath = path.join(repoRoot, "src", "data", "simulations.json");
const parsed = JSON.parse(fs.readFileSync(simulationsPath, "utf8"));
const sims = Array.isArray(parsed) ? parsed : parsed.simulations;

if (!Array.isArray(sims)) {
  throw new Error(
    "Expected simulations.json to be an array or { simulations: [...] }."
  );
}

// Keep this script Node-only (do not import browser/Vite modules).
// This matcher mirrors src/utils/simulationContent.js.
const TOPIC_MATCHERS = [
  {
    key: "chemistry_reactions",
    match: (id) =>
      id.includes("balancing-chemical-equations") ||
      id.includes("reactants") ||
      id.includes("products") ||
      id.includes("reaction"),
  },
  {
    key: "acids_bases",
    match: (id) =>
      id.includes("acid-base") ||
      id.includes("acid") ||
      id.includes("base") ||
      id.includes("ph"),
  },
  {
    key: "solutions_concentration",
    match: (id) =>
      id.includes("concentration") ||
      id.includes("molarity") ||
      id.includes("beer") ||
      id.includes("beers-law"),
  },
  {
    key: "gases",
    match: (id) => id.includes("gas") || id.includes("gases"),
  },
  {
    key: "light_optics",
    match: (id) =>
      id.includes("light") ||
      id.includes("optics") ||
      id.includes("lens") ||
      id.includes("mirror") ||
      id.includes("refraction") ||
      id.includes("bending-light") ||
      id.includes("color"),
  },
  {
    key: "quantum_radiation",
    match: (id) =>
      id.includes("blackbody") ||
      id.includes("photoelectric") ||
      id.includes("quantum") ||
      id.includes("laser") ||
      id.includes("band-structure") ||
      id.includes("davisson") ||
      id.includes("rutherford") ||
      id.includes("radioactive") ||
      id.includes("decay") ||
      id.includes("beta") ||
      id.includes("nuclear") ||
      id.includes("fission") ||
      id.includes("nucleus"),
  },
  {
    key: "electric_fields_static",
    match: (id) =>
      id.includes("static-electricity") ||
      id.includes("balloons-and-static-electricity") ||
      id.includes("charges-and-fields") ||
      id.includes("coulombs-law") ||
      id.includes("travoltage") ||
      id.includes("charge") ||
      id.includes("electric-field") ||
      id.includes("electricity"),
  },
  {
    key: "electromagnetism",
    match: (id) =>
      id.includes("faraday") ||
      id.includes("generator") ||
      id.includes("electromagnetic") ||
      id.includes("magnet"),
  },
  {
    key: "electric_circuits",
    match: (id) =>
      id.includes("circuit") ||
      id.includes("ohm") ||
      id.includes("resistance") ||
      id.includes("capacitor") ||
      id.includes("battery") ||
      id.includes("conductivity"),
  },
  {
    key: "springs_hookes",
    match: (id) => id.includes("hookes-law") || id.includes("spring"),
  },
  {
    key: "torque_balance",
    match: (id) =>
      id.includes("balancing-act") ||
      id.includes("torque") ||
      id.includes("lever"),
  },
  {
    key: "gravity_orbits",
    match: (id) =>
      id.includes("gravity-and-orbits") ||
      id.includes("orbit") ||
      id.includes("gravitation") ||
      id.includes("kepler"),
  },
  { key: "diffusion", match: (id) => id.includes("diffusion") },
  {
    key: "statistics",
    match: (id) =>
      id.includes("center-and-variability") ||
      id.includes("variability") ||
      id.includes("statistics"),
  },
  {
    key: "fractions",
    match: (id) => id.includes("fraction") || id.includes("fractions"),
  },
  {
    key: "functions_graphing",
    match: (id) =>
      id.includes("function") ||
      id.includes("graph") ||
      id.includes("curve-fitting"),
  },
  {
    key: "climate_greenhouse",
    match: (id) =>
      id.includes("greenhouse-effect") ||
      id.includes("greenhouse") ||
      id.includes("climate") ||
      id.includes("glacier"),
  },
  { key: "friction", match: (id) => id.includes("friction") },
  {
    key: "waves_sound",
    match: (id) =>
      id.includes("wave") || id.includes("sound") || id.includes("pendulum"),
  },
  {
    key: "density_buoyancy",
    match: (id) =>
      id.includes("density") || id.includes("buoyancy") || id.includes("float"),
  },
  {
    key: "energy",
    match: (id) =>
      id.includes("energy") || id.includes("work") || id.includes("power"),
  },
  {
    key: "algebra_area_model",
    match: (id) => id.includes("area-model") || id.includes("algebra"),
  },
  {
    key: "area",
    match: (id) => id.includes("area") || id.includes("perimeter"),
  },
  {
    key: "forces_motion",
    match: (id) =>
      id.includes("force") ||
      id.includes("motion") ||
      id.includes("newton") ||
      id.includes("ramp") ||
      id.includes("projectile") ||
      id.includes("collision"),
  },
];

function parseArgs(argv) {
  const args = { _: [] };
  for (const raw of argv) {
    if (!raw.startsWith("--")) {
      args._.push(raw);
      continue;
    }

    const eqIndex = raw.indexOf("=");
    if (eqIndex === -1) {
      args[raw.slice(2)] = true;
      continue;
    }

    const key = raw.slice(2, eqIndex);
    const value = raw.slice(eqIndex + 1);
    args[key] = value;
  }
  return args;
}

function tokenizeSimId(simId) {
  return String(simId || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
}

function printHelp() {
  console.log(
    `\nTopic coverage report\n\nUsage:\n  node scripts/topicCoverage.mjs\n  node scripts/topicCoverage.mjs --topic=general_science --list\n  node scripts/topicCoverage.mjs --topic=general_science --list --clusters\n\nOptions:\n  --topic=<key>       Filter to a specific topic key\n  --list              Print the simulations in that topic (id + title)\n  --clusters           Print common tokens (from sim id) for that topic\n  --format=text|json   Output format for --list (default: text)\n  --help               Show this message\n`
  );
}

function inferTopicKey(simId) {
  const id = String(simId || "").toLowerCase();
  const found = TOPIC_MATCHERS.find((t) => t.match(id));
  return found ? found.key : "general_science";
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const simsWithTopic = sims.map((sim) => {
  const topicKey = inferTopicKey(sim.id);
  return { sim, topicKey };
});

if (args.list) {
  const topic = args.topic;
  if (!topic) {
    console.error("Missing --topic=<key> for --list");
    printHelp();
    process.exit(1);
  }

  const filtered = simsWithTopic.filter((x) => x.topicKey === topic);
  const items = filtered
    .map(({ sim }) => ({ id: sim.id, title: sim.title ?? null }))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  const format = String(args.format || "text").toLowerCase();
  if (format === "json") {
    console.log(JSON.stringify({ topic, total: items.length, items }, null, 2));
  } else {
    console.log(`Topic: ${topic}`);
    console.log(`Total: ${items.length}`);
    for (const item of items) {
      console.log(`- ${item.id}${item.title ? ` | ${item.title}` : ""}`);
    }
  }

  if (args.clusters) {
    const stop = new Set([
      "and",
      "the",
      "of",
      "in",
      "to",
      "a",
      "an",
      "with",
      "for",
      "on",
      "at",
      "by",
      "basics",
      "intro",
      "introduction",
      "lab",
      "game",
      "sim",
      "simulation",
      "html",
      "en",
      "latest",
    ]);

    const tokenCounts = new Map();
    for (const item of items) {
      for (const token of tokenizeSimId(item.id)) {
        if (token.length <= 2) continue;
        if (stop.has(token)) continue;
        tokenCounts.set(token, (tokenCounts.get(token) ?? 0) + 1);
      }
    }

    const top = [...tokenCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 30);

    console.log("\nTop tokens (from sim id):");
    for (const [token, count] of top) {
      console.log(`${token}: ${count}`);
    }
  }

  process.exit(0);
}

const counts = new Map();
for (const { sim, topicKey } of simsWithTopic) {
  const key = topicKey;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

const entries = [...counts.entries()].sort((a, b) => b[1] - a[1]);
console.log("Total", sims.length);
for (const [k, v] of entries) console.log(`${k}: ${v}`);
