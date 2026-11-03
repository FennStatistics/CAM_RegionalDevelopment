# AGENTS.md — Uni Leipzig CAM

Anweisungen für Coding-Agenten in dieser Studie. Menschen-Überblick: [`_briefing/01_Studienuebersicht.md`](_briefing/01_Studienuebersicht.md). Einstieg: [`_briefing/00_LIES_MICH_ZUERST.md`](_briefing/00_LIES_MICH_ZUERST.md).

## Auftrag

Fünfteilige Online-Studie zur **klimaneutralen Regionalentwicklung** am Beispiel Clean Energy Valley / Dithmarschen (Schleswig-Holstein). Ziel: Common Ground, Konflikte und Triggerpunkte sichtbar machen. Etwa **15–20 Stakeholder** aus Politik, Verwaltung, Wirtschaft und Zivilgesellschaft; Oberfläche Deutsch, **Sie-Form**, professionelles Design.

Tech-Split:

| Teil | Ordner | Tech |
|---|---|---|
| 1 | `1_start/` | lab.js + JATOS |
| 2 | `2_CAM_t1/` | Vite-CAM (aktuell) |
| 3 | `3_between/` | lab.js + JATOS |
| 4 | `4_CAM_t2/` | Vite-CAM (aktuell) |
| 5 | `5_final/` | lab.js + JATOS |

JATOS-Kette (verbindlich):

```
1_start → 2_CAM_t1 → 3_between → 4_CAM_t2 → 5_final → Redirect Arbeitsgruppen
```

## Quelle der Wahrheit

1. Dieses `AGENTS.md`
2. [`_briefing/`](_briefing/) (00–04)
3. Aktueller Prompt in [`prompts/`](prompts/)
4. Vorhandener Code im jeweiligen Teil-Ordner

Inhalte (Zentralbegriff, 5 Zusatzkonzepte, Delta-Regeln) **1:1** aus dem Briefing. Unklar → nachfragen oder `TODO(Leipzig): …`.

## Prompt-Disziplin

Prompts **einzeln**, nacheinander. Nur den **aktuellen** Prompt umsetzen; spätere Teile nicht vorwegnehmen.

| # | Prompt | Ergebnis |
|---|---|---|
| 1 | `prompts/PROMPT_1_Start_labjs.md` | `1_start/`: Willkommen, Ablauf, CAM-Erklärung, Einwilligung, Überleitung |
| 2 | `prompts/PROMPT_2_CAM_t1.md` | `2_CAM_t1/`: CAM mit Zentralbegriff, Session inkl. UUIDs |
| 3 | `prompts/PROMPT_3_Between_labjs.md` | `3_between/`: Zwischenfragen-Platzhalter, CAM1 durchreichen |
| 4 | `prompts/PROMPT_4_CAM_t2.md` | `4_CAM_t2/`: CAM1 per ID + 5 Fix-Konzepte |
| 5 | `prompts/PROMPT_5_Final_labjs.md` | `5_final/`: Delta-Feedback, Interview-Platzhalter, Ende, Redirect |

Am Prompt-Ende berichten: Dateien, Tests, Testanleitung, offene Punkte, `TODO(Leipzig)`.

## Ordnerrollen

- **`1_start/`, `3_between/`, `5_final/`** — lab.js-Komponenten (statisch, kein Bundler). Minimal halten, Platzhalter ok wo Briefing das vorsieht.
- **`2_CAM_t1/`, `4_CAM_t2/`** — aktuelle Vite-CAM-Apps (`package.json`: `npm run dev`, `npm run build`, `npm run build:jatos`). Tooling-Details in den lokalen `AGENTS.md` dort; **dieses Root-`AGENTS.md` hat Vorrang** für Studienregeln.
- **`template/`** — **veraltet** (Soft-Robot-Studie, Freiburg, Prolific, Legacy-CAMEL). Nur Referenz für die Idee einer JATOS-Multi-Component-Kette. **Nicht** als Codebasis kopieren. Delta-CAM-Artikel: `template/frobt-13-1741946.xml`.
- **`_briefing/`**, **`prompts/`** — Spezifikation und Agent-Aufträge; keine Studiencode-Dateien.

OnlineStudies-Root-`AGENTS.md` (Kita/Herder) gilt **nicht** für diese Studie, außer allgemeine lab.js-/JATOS-Muster als Orientierung.

## Vite-CAM: `store.cam` (kein globales `CAM`)

In den aktuellen CAM-Apps gibt es **kein** `window.CAM`. Zustand:

```javascript
import { store } from "./src/js/app/store.js";
// store.cam.nodes       — Konzepte inkl. id (UUID)
// store.cam.connectors  — Verbindungen
```

Dev-Konsole (**nur** `npm run dev`, nicht `dist/` / JATOS):

```javascript
const { store } = await import("/src/js/app/store.js");
window.store = store;
store.cam.nodes;
store.cam.connectors;
```

- Immer `store.cam` lesen — nicht einmalig `window.CAM_get = store.cam` cachen (`setCam()` ersetzt das Objekt).
- Schreibweise `store.cam` (klein), nicht `store.CAM`.
- Vor Editor-Load: `store.cam === null` → warten.
- Legacy-Template-Code mit `CAM.nodes` nur als Handoff-Idee; auf `store.cam` + ESM umschreiben.

## Delta-CAM / IDs (hart)

- CAM1 → CAM2: **identische Node- und Connector-UUIDs** weiterreichen und wiederherstellen (`importElement` / `setNodeImport`).
- Das Legacy-`template/CAMEL_second` **verwirft** IDs absichtlich — dieses Verhalten **nicht** übernehmen.
- Klassifikation und Diff: siehe [`_briefing/03_Delta_CAM.md`](_briefing/03_Delta_CAM.md).

### CAM-Inhalt

- **CAM1:** nur Zentralbegriff `klimaneutrale Regionalentwicklung` (Mitte); `isDraggable=false`, `isDeletable=false`, `isTextChangeable=false`.
- **CAM2:** geladene CAM1 + oben links: `Windenergie`, `Wasserstoff`, `Netzausbau`, `Akzeptanz`, `Arbeitsplätze` — `isDraggable=true`, `isDeletable=true`, `isTextChangeable=false`.

## Harte Regeln

- Keine Soft-Robot-/Prolific-/Freiburg-Inhalte in den fünf Teilen.
- Keine externen CDNs, Analytics, Tracking; Assets lokal.
- Vor Einwilligung nichts an JATOS senden (soweit die Komponente Daten schreibt).
- lab.js: Version aus Repo-Vorlage / lokalem `lib/` — nicht raten; API am Code prüfen.
- Git nur auf explizite Nutzer-Anfrage. Keine echten Ergebnisdaten, keine `.env` committen.
- Redirect am Ende: `TODO(Leipzig): END_REDIRECT_URL` (Platzhalter `https://example.org`) bis die Arbeitsgruppen-URL feststeht.

## Lokal testen

- lab.js-Teile: Live Server auf der jeweiligen `index.html`; `jatos.js`-404 lokal harmlos.
- CAM-Teile: `npm install` → `npm run dev` im jeweiligen Ordner; JATOS-Build mit `npm run build:jatos`.
- Nach Änderungen betroffene Screens prüfen; fehlende Browser-Prüfung im Abschlussbericht sagen.
