/**
 * Node-Tests für computeCamDelta — ohne Dependencies.
 * Ausführen: node 5_final/tests/deltaCam.test.js
 */
"use strict";

const path = require("path");
const { computeCamDelta } = require(path.join(
  __dirname,
  "..",
  "src",
  "js",
  "lib",
  "deltaCam.js",
));

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    passed++;
    console.log("  OK  " + msg);
  } else {
    failed++;
    console.error("  FAIL  " + msg);
  }
}

function almostEqual(a, b, eps) {
  return Math.abs(a - b) < (eps || 1e-9);
}

const idCentral = "11111111-1111-4111-8111-111111111111";
const idKeep = "22222222-2222-4222-8222-222222222222";
const idDeleted = "33333333-3333-4333-8333-333333333333";
const idNew = "44444444-4444-4444-8444-444444444444";
const idConnKeep = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const idConnNew = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

const cam1 = {
  nodes: [
    { id: idCentral, value: 1, text: "zentral", isActive: true },
    { id: idKeep, value: -1, text: "Kosten", isActive: true },
    { id: idDeleted, value: -2, text: "Unsicherheit", isActive: true },
  ],
  connectors: [
    {
      id: idConnKeep,
      source: idCentral,
      target: idKeep,
      isActive: true,
    },
  ],
};

const cam2 = {
  nodes: [
    { id: idCentral, value: 2, text: "zentral", isActive: true },
    { id: idKeep, value: 0, text: "Kosten", isActive: true },
    { id: idDeleted, value: -2, text: "Unsicherheit", isActive: false },
    { id: idNew, value: 2, text: "Windenergie", isActive: true },
  ],
  connectors: [
    {
      id: idConnKeep,
      source: idCentral,
      target: idKeep,
      isActive: true,
    },
    {
      id: idConnNew,
      source: idCentral,
      target: idNew,
      isActive: true,
    },
  ],
};

console.log("\n=== computeCamDelta — Happy path ===");
const d = computeCamDelta(cam1, cam2);
assert(d.ok === true, "ok === true");
// mean t1: (1 + -1 + -2) / 3 = -2/3
assert(almostEqual(d.meanValence_t1, -2 / 3), "meanValence_t1 ≈ -2/3");
// mean t2: (2 + 0 + 2) / 3 = 4/3
assert(almostEqual(d.meanValence_t2, 4 / 3), "meanValence_t2 ≈ 4/3");
assert(d.valenceTrend === "positiver", 'valenceTrend === "positiver"');
assert(d.nNodes_t1 === 3, "nNodes_t1 === 3");
assert(d.nNodes_t2 === 3, "nNodes_t2 === 3 (deleted inactive, new active)");
assert(d.deltaNodes === 0, "deltaNodes === 0");
assert(d.nConnectors_t1 === 1, "nConnectors_t1 === 1");
assert(d.nConnectors_t2 === 2, "nConnectors_t2 === 2");
assert(d.deltaConnectors === 1, "deltaConnectors === 1");
assert(d.nConstant === 2, "nConstant === 2 (central + keep)");
assert(d.nDeleted === 1, "nDeleted === 1");
assert(d.nNew === 1, "nNew === 1");
assert(d.nConstantConnectors === 1, "nConstantConnectors === 1");
assert(d.nNewConnectors === 1, "nNewConnectors === 1");

console.log("\n=== etwa_gleich (equalEps) ===");
const camEq1 = {
  nodes: [{ id: "a", value: 1, isActive: true }],
  connectors: [],
};
const camEq2 = {
  nodes: [{ id: "a", value: 1.05, isActive: true }],
  connectors: [],
};
const dEq = computeCamDelta(camEq1, camEq2, { equalEps: 0.1 });
assert(dEq.ok && dEq.valenceTrend === "etwa_gleich", "Δ 0.05 → etwa_gleich");
const dNeg = computeCamDelta(
  { nodes: [{ id: "a", value: 2, isActive: true }], connectors: [] },
  { nodes: [{ id: "a", value: 0, isActive: true }], connectors: [] },
);
assert(dNeg.valenceTrend === "negativer", "mean sinkt → negativer");

console.log("\n=== Ambivalent value 10 → 0 ===");
const dAmb = computeCamDelta(
  { nodes: [{ id: "a", value: 10, isActive: true }], connectors: [] },
  { nodes: [{ id: "a", value: 0, isActive: true }], connectors: [] },
);
assert(
  dAmb.ok && almostEqual(dAmb.meanValence_t1, 0),
  "ambivalent 10 als 0 in mean t1",
);
assert(dAmb.valenceTrend === "etwa_gleich", "10→0 vs 0 → etwa_gleich");

console.log("\n=== Fehlende / ungültige CAMs ===");
const bad1 = computeCamDelta(null, cam2);
assert(bad1.ok === false && typeof bad1.error === "string", "null cam1 → ok false");
const bad2 = computeCamDelta({ nodes: [] }, cam2);
assert(bad2.ok === false, "fehlende connectors → ok false");
const bad3 = computeCamDelta(cam1, undefined);
assert(bad3.ok === false, "undefined cam2 → ok false");

console.log("\n=== Ergebnis: " + passed + " ok, " + failed + " fehlgeschlagen ===\n");
process.exit(failed > 0 ? 1 : 0);
