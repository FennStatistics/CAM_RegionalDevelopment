/**
 * Delta-CAM: Vergleich CAM1 vs. CAM2 (aktive Elemente, Match über id).
 * UMD — Browser (global computeCamDelta) und Node-Tests.
 * Keine lab.js-Abhängigkeit.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.computeCamDelta = factory().computeCamDelta;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function isActive(el) {
    return el && el.isActive === true;
  }

  function activeList(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.filter(isActive);
  }

  /** Ambivalent value 10 → 0 (wie CAM getMeanValenceNodes). */
  function valenceOf(node) {
    if (!node || typeof node.value !== "number") return 0;
    return node.value === 10 ? 0 : node.value;
  }

  function meanValence(nodes) {
    const list = activeList(nodes);
    if (list.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += valenceOf(list[i]);
    }
    return sum / list.length;
  }

  function idSet(list) {
    const set = {};
    for (let i = 0; i < list.length; i++) {
      const id = list[i] && list[i].id;
      if (typeof id === "string" && id.length > 0) set[id] = true;
    }
    return set;
  }

  function classifyById(list1, list2) {
    const a1 = activeList(list1);
    const a2 = activeList(list2);
    const set1 = idSet(a1);
    const set2 = idSet(a2);
    let nConstant = 0;
    let nDeleted = 0;
    let nNew = 0;

    for (let i = 0; i < a1.length; i++) {
      const id = a1[i].id;
      if (set2[id]) nConstant++;
      else nDeleted++;
    }
    for (let j = 0; j < a2.length; j++) {
      const id = a2[j].id;
      if (!set1[id]) nNew++;
    }
    return { nConstant: nConstant, nDeleted: nDeleted, nNew: nNew };
  }

  function isCamShape(cam) {
    return (
      cam &&
      typeof cam === "object" &&
      Array.isArray(cam.nodes) &&
      Array.isArray(cam.connectors)
    );
  }

  /**
   * @param {object} cam1 — serialisiertes CAM (nodes, connectors)
   * @param {object} cam2
   * @param {{ equalEps?: number }} [options]
   * @returns {{ ok: true, meanValence_t1, meanValence_t2, valenceTrend, nNodes_t1, nNodes_t2, deltaNodes, nConnectors_t1, nConnectors_t2, deltaConnectors, nConstant, nDeleted, nNew, nConstantConnectors, nDeletedConnectors, nNewConnectors } | { ok: false, error: string }}
   */
  function computeCamDelta(cam1, cam2, options) {
    const opts = options && typeof options === "object" ? options : {};
    const equalEps =
      typeof opts.equalEps === "number" && opts.equalEps >= 0
        ? opts.equalEps
        : 0.1;

    if (!isCamShape(cam1) || !isCamShape(cam2)) {
      return {
        ok: false,
        error:
          "CAM-Daten fehlen oder sind unvollständig (nodes/connectors erwartet).",
      };
    }

    const mean1 = meanValence(cam1.nodes);
    const mean2 = meanValence(cam2.nodes);
    const diff = mean2 - mean1;
    let valenceTrend = "etwa_gleich";
    if (Math.abs(diff) >= equalEps) {
      valenceTrend = diff > 0 ? "positiver" : "negativer";
    }

    const nNodes1 = activeList(cam1.nodes).length;
    const nNodes2 = activeList(cam2.nodes).length;
    const nConn1 = activeList(cam1.connectors).length;
    const nConn2 = activeList(cam2.connectors).length;

    const nodesClass = classifyById(cam1.nodes, cam2.nodes);
    const connClass = classifyById(cam1.connectors, cam2.connectors);

    return {
      ok: true,
      meanValence_t1: mean1,
      meanValence_t2: mean2,
      valenceTrend: valenceTrend,
      nNodes_t1: nNodes1,
      nNodes_t2: nNodes2,
      deltaNodes: nNodes2 - nNodes1,
      nConnectors_t1: nConn1,
      nConnectors_t2: nConn2,
      deltaConnectors: nConn2 - nConn1,
      nConstant: nodesClass.nConstant,
      nDeleted: nodesClass.nDeleted,
      nNew: nodesClass.nNew,
      nConstantConnectors: connClass.nConstant,
      nDeletedConnectors: connClass.nDeleted,
      nNewConnectors: connClass.nNew,
    };
  }

  return { computeCamDelta: computeCamDelta };
});
