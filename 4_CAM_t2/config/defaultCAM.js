/* default CAM which will be redrawn if CAM is deleted
function shuffle(queslist) {
    let array_emp = [];
    for (var i = 0; i < queslist.length; i++) {
      array_emp.push(i);
    }
  
    let j, x;
    for (i = array_emp.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array_emp[i];
      array_emp[i] = array_emp[j];
      array_emp[j] = x;
    }
    return array_emp;
  }

const ConceptsCAM = ["A1", "A2"];
const index_ConceptsCAM = shuffle(ConceptsCAM);
console.log("index_ConceptsCAM:", index_ConceptsCAM);
 */

import { NodeCAM } from "../src/js/backend/nodeCAM.js";
import { store } from "../src/js/app/store.js";
import { getJatos } from "../src/js/services/jatosAdapter.js";

/** Five Leipzig fix concepts (new UUIDs ok); text locked, move/delete/link allowed. */
const FIX_CONCEPTS = [
    { text: "Windenergie", position: { x: 100, y: 80 } },
    { text: "Wasserstoff", position: { x: 100, y: 160 } },
    { text: "Netzausbau", position: { x: 100, y: 240 } },
    { text: "Akzeptanz", position: { x: 100, y: 320 } },
    { text: "Arbeitsplätze", position: { x: 100, y: 400 } },
];

function addFixConcepts() {
    FIX_CONCEPTS.forEach((concept) => {
        // isDraggable=true, isDeletable=true, isTextChangeable=false
        store.cam.addElement(
            new NodeCAM(0, concept.text, concept.position, true, true, false),
        );
    });
}

/**
 * Load CAM1 from jatos.studySessionData.CAM_t1 with original UUIDs
 * (importElement / setNodeImport — never re-roll IDs like legacy CAMEL_second).
 */
function loadCamT1FromSession() {
    const jatos = getJatos();
    const session =
        typeof jatos.studySessionData === "object" && jatos.studySessionData
            ? jatos.studySessionData
            : {};

    if (
        typeof session.teilnehmer_code === "string" &&
        session.teilnehmer_code.length > 0
    ) {
        store.cam.creator = session.teilnehmer_code;
    }

    const camT1 = session.CAM_t1;
    if (!camT1 || !Array.isArray(camT1.nodes)) {
        // TODO(Leipzig): in JATOS-Kette muss CAM_t1 aus Teil 2 vorhanden sein
        console.warn(
            "[defaultCAM] No CAM_t1 in studySessionData — drawing fix concepts only",
        );
        return false;
    }

    const activeNodes = camT1.nodes.filter((n) => n.isActive !== false);
    const activeConnectors = Array.isArray(camT1.connectors)
        ? camT1.connectors.filter((c) => c.isActive !== false)
        : [];

    activeNodes.forEach((element) => {
        const nodeEl = Object.assign({}, element, { kind: "Node" });
        store.cam.importElement(nodeEl);
    });

    activeConnectors.forEach((element) => {
        const connEl = Object.assign({}, element, { kind: "Connector" });
        store.cam.importElement(connEl);
    });

    // establishConnection drops isBidirectional — restore from serialisat
    for (let i = 0; i < store.cam.connectors.length; i++) {
        const source = activeConnectors[i];
        if (!source) continue;
        if (source.agreement !== undefined) {
            store.cam.connectors[i].agreement = source.agreement;
        }
        if (source.isBidirectional !== undefined) {
            store.cam.connectors[i].isBidirectional = source.isBidirectional;
        }
        if (source.value !== undefined && source.value !== null) {
            store.cam.connectors[i].value = source.value;
        }
        if (source.isDeletable !== undefined) {
            store.cam.connectors[i].isDeletable = source.isDeletable;
        }
    }

    console.log(
        "[defaultCAM] Loaded CAM_t1:",
        activeNodes.length,
        "nodes,",
        activeConnectors.length,
        "connectors (IDs preserved)",
    );
    return true;
}

function defaultCAM() {
  if (!store.flags.usingSupabase) {
    /* MAKE CHANGES: start*/
    loadCamT1FromSession();
    addFixConcepts();
    /* MAKE CHANGES: end*/
  } else {
    // add nodes from fetched data
    store.env.camMother.nodes.forEach((element) => {
      element.kind = "Node";
      element.comment = "";
      element.eventLog = [];
      element.isActive = true;
      element.isConnectorSelected = false;
      element.isSelected = false;
      store.cam.importElement(element);
    });
    // add connectors from fetched data
    store.env.camMother.connectors.forEach((element) => {
      element.kind = "Connector";
      element.eventLog = "";
      store.cam.importElement(element);
    });
  }

  store.cam.draw();
}

export { defaultCAM };
