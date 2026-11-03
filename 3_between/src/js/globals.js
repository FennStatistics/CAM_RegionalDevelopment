// Globale Flags und Helfer für Teil 3 — Dank + Überleitung zu CAM2 (lab.js)
const localTesting = false; // auf JATOS: false belassen
const Required_Testing = true;

const BTN_NEXT = "Weiter &rarr;";

// DankeCam1, UeberleitungCam2
const numElements = 2;
var numElementsCounter = 0;

/** Session-Keys, die Teil 3 niemals setzen oder löschen darf. */
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

/** Sicheres Lesen von jatos.studySessionData (Objekt oder leer). */
function getStudySessionData() {
  if (!isJatosAvailable()) return {};
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
 * Multi-Component-Übergabe Teil 3 → Teil 4.
 * CAM_t1 / CAM_t2 und t1-/t2-Summaries bleiben unangetastet (nur lesen, nie schreiben/löschen).
 * teilnehmer_code wird aus der Session beibehalten (nicht neu erzeugen).
 * Lokal: Hinweis + console.warn, kein Crash.
 */
function finishBetweenAndContinue() {
  if (!isJatosAvailable()) {
    console.warn(
      "JATOS nicht verfügbar: startNextComponent würde hier die nächste Komponente (Teil 4) starten.",
    );
    return Promise.resolve(false);
  }
  if (!hasConsent()) {
    console.warn("Keine Einwilligung — startNextComponent übersprungen.");
    return Promise.resolve(false);
  }

  return saveToJatos().then(() => {
    try {
      const existing = getStudySessionData();
      // Nur additive Felder; geschützte CAM-Keys niemals in den Payload legen
      const sessionPayload = {};
      const code =
        study.options.datastore.get("teilnehmer_code") ||
        existing.teilnehmer_code;
      if (typeof code === "string" && code.length > 0) {
        sessionPayload.teilnehmer_code = code;
      }

      for (let i = 0; i < PROTECTED_SESSION_KEYS.length; i++) {
        if (
          Object.prototype.hasOwnProperty.call(
            sessionPayload,
            PROTECTED_SESSION_KEYS[i],
          )
        ) {
          delete sessionPayload[PROTECTED_SESSION_KEYS[i]];
        }
      }

      // existing zuerst: CAM_t1 & Co. bleiben erhalten; Payload überschreibt sie nicht
      jatos.setStudySessionData(Object.assign({}, existing, sessionPayload));
    } catch (err) {
      console.warn("setStudySessionData failed:", err);
    }
    try {
      jatos.startNextComponent();
    } catch (err) {
      console.warn("startNextComponent failed:", err);
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
