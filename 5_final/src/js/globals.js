// Globale Flags und Helfer für Teil 5 — Delta-Feedback, Interview, Ende (lab.js)
const localTesting = false; // auf JATOS: false belassen
const Required_Testing = true;

const BTN_NEXT = "Weiter &rarr;";

// DeltaFeedback, Interview, Thanks
const numElements = 3;
var numElementsCounter = 0;

/**
 * Ziel-URL nach Studienende (Arbeitsgruppen).
 * TODO(Leipzig): END_REDIRECT_URL — echte Arbeitsgruppen-URL einsetzen.
 * Platzhalter "#" nur lokal / bis Freigabe; kein externes Tracking.
 */
const END_REDIRECT_URL = "#";

/** Gegen Doppelaufruf von endStudyAndRedirect. */
var studyEnded = false;

/** Session-Keys, die Teil 5 niemals setzen oder löschen darf. */
const PROTECTED_SESSION_KEYS = [
  "CAM_t1",
  "CAM_t2",
  "meanValence_t1",
  "meanValence_t2",
  "nNodes_t1",
  "nNodes_t2",
  "nConnectors_t1",
  "nConnectors_t2",
];

/**
 * Kleine Mock-Session für Live Server ohne JATOS (Delta-Kennzahlen sichtbar).
 * IDs stabil, damit constant / deleted / new nachvollziehbar sind.
 */
const LOCAL_MOCK_SESSION = (function buildLocalMockSession() {
  const idCentral = "11111111-1111-4111-8111-111111111111";
  const idKeep = "22222222-2222-4222-8222-222222222222";
  const idDeleted = "33333333-3333-4333-8333-333333333333";
  const idNew = "44444444-4444-4444-8444-444444444444";
  const idConnKeep = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const idConnNew = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

  const cam1 = {
    idCAM: "cam-t1-mock",
    creator: "mockcode1",
    nodes: [
      {
        id: idCentral,
        value: 1,
        text: "klimaneutrale Regionalentwicklung",
        comment: "",
        isActive: true,
      },
      {
        id: idKeep,
        value: -1,
        text: "Kosten",
        comment: "",
        isActive: true,
      },
      {
        id: idDeleted,
        value: -2,
        text: "Unsicherheit",
        comment: "",
        isActive: true,
      },
    ],
    connectors: [
      {
        id: idConnKeep,
        source: idCentral,
        target: idKeep,
        agreement: true,
        isActive: true,
        intensity: 3,
      },
    ],
  };

  const cam2 = {
    idCAM: "cam-t2-mock",
    creator: "mockcode1",
    nodes: [
      {
        id: idCentral,
        value: 2,
        text: "klimaneutrale Regionalentwicklung",
        comment: "",
        isActive: true,
      },
      {
        id: idKeep,
        value: 0,
        text: "Kosten",
        comment: "angepasst",
        isActive: true,
      },
      {
        id: idDeleted,
        value: -2,
        text: "Unsicherheit",
        comment: "",
        isActive: false,
      },
      {
        id: idNew,
        value: 2,
        text: "Windenergie",
        comment: "",
        isActive: true,
      },
    ],
    connectors: [
      {
        id: idConnKeep,
        source: idCentral,
        target: idKeep,
        agreement: true,
        isActive: true,
        intensity: 3,
      },
      {
        id: idConnNew,
        source: idCentral,
        target: idNew,
        agreement: true,
        isActive: true,
        intensity: 4,
      },
    ],
  };

  return {
    teilnehmer_code: "mockcode1",
    einwilligung: true,
    datenschutz_version: "entwurf-2026-03-01",
    CAM_t1: cam1,
    CAM_t2: cam2,
    meanValence_t1: (-2 / 3),
    meanValence_t2: (4 / 3),
    nNodes_t1: 3,
    nNodes_t2: 3,
    nConnectors_t1: 1,
    nConnectors_t2: 2,
  };
})();

function setProgress(percent) {
  const bar = document.querySelector(".progress-bar");
  if (bar) bar.style.width = percent + "%";
  const track = document.querySelector(".progress");
  if (track) track.setAttribute("aria-valuenow", Math.round(percent));
}

function advanceProgress() {
  numElementsCounter++;
  setProgress((numElementsCounter / numElements) * 100);
}

function isJatosAvailable() {
  return (
    !localTesting &&
    typeof jatos !== "undefined" &&
    typeof jatos.onLoad === "function"
  );
}

/**
 * Sicheres Lesen von jatos.studySessionData.
 * Ohne JATOS: lokale Mock-Session für Delta-Demo unter Live Server.
 */
function getStudySessionData() {
  if (!isJatosAvailable()) {
    return LOCAL_MOCK_SESSION;
  }
  try {
    const data = jatos.studySessionData;
    return typeof data === "object" && data ? data : {};
  } catch (err) {
    console.warn("studySessionData lesen fehlgeschlagen:", err);
    return {};
  }
}

/**
 * Teilnehmer-Code nur aus der Session (Teil 1) — nie neu erzeugen.
 * TODO(Leipzig): in der JATOS-Kette muss teilnehmer_code aus Teil 1 vorhanden sein
 */
function readTeilnehmerCode() {
  const code = getStudySessionData().teilnehmer_code;
  if (typeof code === "string" && code.length > 0) return code;
  console.warn(
    "TODO(Leipzig): teilnehmer_code fehlt in studySessionData — in der Kette aus Teil 1 erwarten.",
  );
  return null;
}

/** Einwilligung aus Session (Teil 1) oder Datastore. */
function hasConsent() {
  if (study.options.datastore.get("einwilligung") === true) return true;
  return getStudySessionData().einwilligung === true;
}

/**
 * Session-Felder (teilnehmer_code, einwilligung, …) in den lab.js-Datastore legen,
 * damit Results dieser Komponente die ID mitführen.
 */
function syncSessionToDatastore() {
  const session = getStudySessionData();
  const code = readTeilnehmerCode();
  if (code) {
    study.options.datastore.set("teilnehmer_code", code);
  }
  if (session.einwilligung === true) {
    study.options.datastore.set("einwilligung", true);
  }
  if (typeof session.datenschutz_version === "string") {
    study.options.datastore.set(
      "datenschutz_version",
      session.datenschutz_version,
    );
  }
}

/** Vollständigen Resultat-JSON an JATOS senden — nur mit Einwilligung (aus Teil 1). */
function saveToJatos() {
  if (!isJatosAvailable()) return Promise.resolve(false);
  if (!hasConsent()) return Promise.resolve(false);
  try {
    const resultJson = study.options.datastore.exportJson();
    return jatos
      .submitResultData(resultJson)
      .then(() => true)
      .catch((err) => {
        console.warn("submitResultData failed:", err);
        return false;
      });
  } catch (err) {
    console.warn("submitResultData failed:", err);
    return Promise.resolve(false);
  }
}

/**
 * Studienende Teil 5: speichern → endStudyAndRedirect.
 * Lokal: console.warn + sichtbarer Hinweis, kein Crash.
 * Doppel-Ende wird über studyEnded verhindert.
 */
function finishFinalAndRedirect() {
  if (studyEnded) {
    console.warn("Studie bereits beendet — zweites Ende übersprungen.");
    return Promise.resolve(false);
  }

  syncSessionToDatastore();

  if (!isJatosAvailable()) {
    console.warn(
      "JATOS nicht verfügbar: endStudyAndRedirect würde hier auf END_REDIRECT_URL leiten.",
      END_REDIRECT_URL,
    );
    const el = document.getElementById("lokal-ende-hinweis");
    if (el) el.hidden = false;
    studyEnded = true;
    return Promise.resolve(false);
  }

  if (!hasConsent()) {
    console.warn("Keine Einwilligung — endStudyAndRedirect übersprungen.");
    return Promise.resolve(false);
  }

  return saveToJatos().then(() => {
    if (studyEnded) return false;
    studyEnded = true;
    try {
      // Session nicht leeren; nur lesen. teilnehmer_code bleibt in Results.
      jatos.endStudyAndRedirect(END_REDIRECT_URL);
    } catch (err) {
      console.warn("endStudyAndRedirect failed:", err);
      studyEnded = false;
      return false;
    }
    return true;
  });
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function radioGroup(name, label, options) {
  const required = Required_Testing ? "required" : "";
  const items = options
    .map(
      ([value, text]) =>
        `<label class="option"><input type="radio" name="${name}" value="${value}" ${required}> ${text}</label>`,
    )
    .join("");
  return `<fieldset><legend>${label}</legend>${items}</fieldset>`;
}

function pageTemplate({ title, body, formId, formContent = "", button }) {
  return `
  <header><h2>${title}</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl">
      ${body}
      <form id="${formId}" autocomplete="off">${formContent}</form>
    </div>
  </main>
  <footer class="content-vertical-center content-horizontal-right">
    <button id="continue" type="submit" form="${formId}">${button}</button>
  </footer>
  `;
}
