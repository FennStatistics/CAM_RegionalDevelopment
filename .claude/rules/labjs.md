---
paths:
  - "1_start/**"
  - "3_between/**"
  - "5_final/**"
---

# lab.js – Teile 1, 3, 5

Screens bewusst **minimal**. Platzhalter sind dort in Ordnung, wo das Briefing sie vorsieht (Zwischenfragen in Teil 3, Interview in Teil 5). UI Deutsch, **Sie-Form**, professioneller Ton.

## Version und Aufbau

- **lab.js 20.2.4** liegt je Teil in `<teil>/lib/`. Nicht aktualisieren, kein CDN. API am vorhandenen Code oder in `lib/lab.js` prüfen, nicht aus dem Gedächtnis.
- Kein Bundler, keine ES-Module (`import`/`export`). Alle Dateien teilen den globalen Scope.
- `index.html` lädt `lib/lab.js`, `jatos.js`, dann `src/js/globals.js`, ggf. `src/js/lib/*.js`, dann `src/js/phases/*.js` (alle `defer`) und **zuletzt `study.js`**. Neue Dateien in dieser Reihenfolge eintragen.
- `study.js`: eine `lab.flow.Sequence` mit `plugins: []`, also **kein** `lab.plugins.Metadata()`.
- Jeder Teil hat eine **eigene** `globals.js` (nicht geteilt). Helfer, die in mehreren Teilen nötig sind, in jedem Teil pflegen.

## Helfer (`globals.js`)

- Alle Teile: `isJatosAvailable()`, `hasConsent()`, `saveToJatos()`, `escapeHtml()`, `radioGroup()`, `pageTemplate()`, `setProgress()`, `advanceProgress()`.
- Teil 1: `generateTeilnehmerCode()`, `finishComponentAndContinue()`, `DATENSCHUTZ_VERSION`.
- Teil 3/5: `getStudySessionData()`, `readTeilnehmerCode()`, `syncSessionToDatastore()`. Teil 3: `finishBetweenAndContinue()`. Teil 5: `finishFinalAndRedirect()`, `END_REDIRECT_URL`.
- `numElements` in `globals.js` beim Hinzufügen oder Entfernen von Screens anpassen (Fortschrittsbalken).

## Komponentenmuster

- Eine Datei je Screen in `src/js/phases/`. Darin zuerst `const <name>Text = pageTemplate({...})`, direkt darunter `const <Name>_htmlForm = new lab.html.Form({ content: <name>Text, … })`, bzw. `*_htmlScreen` (`lab.html.Screen` + `responses`/`timeout`) oder `Sequence_<Name>`.
- Text und Komponente bleiben zusammen, kein zentraler `TEXTS`-Lookup. `title`, `content`, `skip`/`tardy`, `messageHandlers` sind direkt an der Komponente sichtbar.
- **Verboten:** Factories, die Forms zurückgeben (`createRadioQuestion(…)`). **Erlaubt:** dünne HTML-Helfer wie oben.
- Weiter-Button: `type="submit"` mit `form="<formId>"` (macht `pageTemplate`). Radios als echte `<input type="radio">` in `<label class="option">` in `<fieldset>`/`<legend>` (macht `radioGroup`).
- Verzweigung: `skip: "${ … }"` + `tardy: true` (Beispiel: `ConsentNo_htmlScreen`).
- Wiederholte Struktur: **eine** Form, die in `run` aus `this.parameters` befüllt wird, in einer inneren `lab.flow.Sequence`, umschlossen von `lab.flow.Loop` (`template`, `templateParameters`, `sample`, `indexParameter`). Keine N Kopien einer Form-Datei.
- Daten über `study.options.datastore.set(…)` bzw. `study.state.<feld>`, Export mit `datastore.exportJson()`.

## Delta-Feedback (Teil 5)

- `src/js/lib/deltaCam.js` (`computeCamDelta`) ist reine Logik ohne lab.js und auch per `require` nutzbar. Match über `id`, nur `isActive === true`.
- Änderungen dort mit `node 5_final/tests/deltaCam.test.js` prüfen und den Test erweitern.
- Lokal liefert `LOCAL_MOCK_SESSION` die CAMs. Der volle per-Element-Diff aus `_briefing/03_Delta_CAM.md` ist noch offen.

## Code-Stil

2 Spaces, doppelte Anführungszeichen, Semikolons, Trailing Commas, kurze deutsche Kommentare (wie im vorhandenen Code). CSS in `src/css/style.css` je Teil, die vorhandenen Klassen (`seite`, `karte`, `progress`, `option`, …) weiterverwenden.
