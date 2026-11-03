---
paths:
  - "**/*.js"
  - "**/*.html"
---

# JATOS – Uni Leipzig CAM

Eine Study, fünf Komponenten: `1_start → 2_CAM_t1 → 3_between → 4_CAM_t2 → 5_final → Redirect Arbeitsgruppen`. Ist-Beschreibung: [studienablauf.md](../../studienablauf.md) §2 und §5. API: <https://www.jatos.org/jatos.js-Reference.html>.

## Verfügbarkeit und Start

- lab.js-Teile: `jatos.*` immer hinter `isJatosAvailable()`. `study.js` startet mit `jatos.onLoad(() => study.run())`, lokal direkt mit `study.run()`.
- Vite-CAM: JATOS nur über `src/js/services/jatosAdapter.js` (`getJatos()`), lokal über `jatosStub.js`. `jatos.js` wird erst durch `npm run build:jatos` in `dist/index.html` und die Root-Kopie `<teil>.html` injiziert.
- Lokal muss alles durchklickbar sein, ohne zu senden. Übergänge werden dann mit `console.warn` gemeldet statt ausgeführt.

## Kette

- Teil 1–4 enden mit `jatos.startNextComponent()`. Kein `endStudy`, einzige Ausnahme: Abbruch ohne Einwilligung in Teil 1 (`endStudy(false, …)`).
- Nur Teil 5 beendet: `finishFinalAndRedirect()` → `submitResultData` → `jatos.endStudyAndRedirect(END_REDIRECT_URL)`. `END_REDIRECT_URL` ist Platzhalter `"https://example.org"` = `TODO(Leipzig)`. Gegen doppeltes Beenden absichern (Flag + Button nach Klick deaktivieren). Ausnahme zur Lokal-Regel: Teil 5 leitet lokal per `window.location.assign(END_REDIRECT_URL)` weiter.

## Study Session (Handoff)

| Key | schreibt | liest |
|---|---|---|
| `teilnehmer_code` | 1 | alle |
| `einwilligung`, `datenschutz_version` | 1 | 2–5 |
| `CAM_t1` + `meanValence_t1`, `nNodes_t1`, `nConnectors_t1` | 2 | 3 (reicht durch), 4, 5 |
| `CAM_t2` + `meanValence_t2`, `nNodes_t2`, `nConnectors_t2` | 4 | 5 |

- Es gibt keine Keys `cam1`/`cam2`. Neue Keys in `studienablauf.md` dokumentieren.
- **Immer mergen**, nie die Session ersetzen:
  ```javascript
  const existing = jatos.studySessionData || {};
  jatos.setStudySessionData(Object.assign({}, existing, sessionPayload));
  ```
- `teilnehmer_code` nie neu erzeugen oder löschen. Fehlt er, Fallback `"noID"`.
- Teil 3 und Teil 4 lassen `CAM_t1` unangetastet.

## Results

- `jatos.submitResultData(json)` **ersetzt** das Result der Komponente, deshalb immer das vollständige Objekt senden. lab.js-Teile senden `datastore.exportJson()`, CAM-Teile das serialisierte CAM (`JSON.parse(JSON.stringify(store.cam))`).
- Erst speichern, dann `startNextComponent`/`endStudy`. Promise abwarten (`.then`/`.catch`).
- Alle `jatos.*` in `try/catch` bzw. `.catch` und mit `console.warn` loggen, ohne personenbezogene Daten.
- Bekannte Lücke (`toDos.md`): Submit-Fehler blockieren den Übergang in den lab.js-Teilen derzeit nicht. Nicht stillschweigend ändern, sondern nachfragen.

## Deployment

Details in [aufsetzenJatos.md](../../aufsetzenJatos.md). JATOS löst relative Pfade gegen den Study-Assets-Root auf, deshalb liegen die Komponenten-HTMLs im Root: `1_start.html`, `2_CAM_t1.html`, `3_between.html`, `4_CAM_t2.html`, `5_final.html`, jeweils mit Pfaden `./<teil>/…` (`jatos.js` ohne Präfix). Die CAM-HTMLs erzeugt `npm run build:jatos` (Präfix `./<teil>/dist/`, Laufzeit-Bilder über `__CAM_ASSET_BASE__`); nie von Hand bearbeiten. Export als `.jzip` aus JATOS, nicht von Hand zippen.
