// Globale Flags und Helfer für Teil 1 (lab.js)
const localTesting = false; // auf JATOS: false belassen
const Required_Testing = true;

const BTN_NEXT = "Weiter &rarr;";

// TODO(Leipzig): finaler Einwilligungstext und datenschutz_version freigeben
const DATENSCHUTZ_VERSION = "entwurf-2026-03-01";

const sessionId =
  window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

/** Zufälliger Teilnehmer-Code: a–z und 0–9 (nur Administration). */
function generateTeilnehmerCode(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const len = length || 8;
  const bytes = new Uint8Array(len);
  if (window.crypto && typeof window.crypto.getRandomValues === "function") {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < len; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  let out = "";
  for (let i = 0; i < len; i++) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return out;
}

const teilnehmerCode = generateTeilnehmerCode(8);

// Welcome, Ablauf, CAMs, Consent, Überleitung (ConsentNo zählt nicht)
const numElements = 5;
var numElementsCounter = 0;

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

function hasConsent() {
  return study.options.datastore.get("einwilligung") === true;
}

/** Vollständigen Resultat-JSON an JATOS senden — nur mit Einwilligung. */
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
 * Multi-Component-Übergabe: Result speichern, Session setzen, nächste Komponente.
 * Lokal: Hinweis + console.warn, kein Crash.
 */
function finishComponentAndContinue() {
  if (!isJatosAvailable()) {
    console.warn(
      "JATOS nicht verfügbar: startNextComponent würde hier die nächste Komponente starten.",
    );
    return Promise.resolve(false);
  }
  if (!hasConsent()) {
    console.warn("Keine Einwilligung — startNextComponent übersprungen.");
    return Promise.resolve(false);
  }

  const sessionPayload = {
    einwilligung: true,
    datenschutz_version: study.options.datastore.get("datenschutz_version"),
    teilnehmer_code: study.options.datastore.get("teilnehmer_code"),
  };

  return saveToJatos()
    .then(() => {
      try {
        const existing =
          typeof jatos.studySessionData === "object" && jatos.studySessionData
            ? jatos.studySessionData
            : {};
        jatos.setStudySessionData(
          Object.assign({}, existing, sessionPayload),
        );
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
