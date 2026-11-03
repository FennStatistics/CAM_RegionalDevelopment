---
paths:
  - "2_CAM_t1/**"
  - "4_CAM_t2/**"
---

# Vite-CAM – Teile 2 und 4

Studienregeln aus der Root-`AGENTS.md` und `_briefing/03_Delta_CAM.md` haben Vorrang. Tooling-Details stehen in `<teil>/AGENTS.md` (Rolle des Teils, Struktur, Befehle, Konventionen). Die beiden Dateien bei Änderungen synchron halten.

## Zwei Kopien, eine Codebasis (Spiegelregel)

`2_CAM_t1/` und `4_CAM_t2/` sind bis auf wenige Stellen identisch. **Änderungen an gemeinsamem Code in beiden Teilen gleich machen.** Absichtliche Unterschiede gibt es nur hier:

| Datei | Unterschied |
|---|---|
| `config/defaultCAM.js` | t1: nur Zentralbegriff. t2: `CAM_t1` laden + fünf Fix-Konzepte |
| `config/configfile.js` | nur `CAMproject` (`CleanEnergyValley_CAM_t1`/`_t2`), sonst 1:1 |
| `index.html` | `<title>`, Text in `#dialogStart` |
| `src/js/backend/Elements.js` | t2: `importElement` übernimmt Connector-`id`, `isBidirectional`, `value`, `isActive` |
| `src/js/frontend/buttons/participant/saveButton.js` | Session-Keys `_t1` vs. `_t2`. t2 behält `CAM_t1` |
| `src/js/services/jatosStub.js` | t2: Mock-`CAM_t1` mit fester Zentralbegriff-UUID |
| `package.json` | `name` |

Kontrolle: `diff -rq 2_CAM_t1 4_CAM_t2 -x node_modules -x dist` darf nur diese Dateien (plus `AGENTS.md`) zeigen.

## Zustand und IDs

- Zustand nur über `store.cam` aus `src/js/app/store.js`. Kein `window.CAM`, nicht `store.CAM`. Keinen Alias cachen, denn `setCam()` ersetzt das Objekt. Solange `store.cam === null`, ist der Editor noch nicht geladen.
- Mutationen über die vorhandenen Methoden und Update-Funktionen (`importElement`, `updateUi`, `updateFlags` …), nicht ad hoc.
- **Delta-CAM:** CAM1 → CAM2 mit **identischen** Node- und Connector-UUIDs (`importElement` / `setNodeImport`). Fix-Konzepte und neue Konzepte bekommen neue UUIDs. Das ID-Verwerfen aus `template/CAMEL_second` nie übernehmen.

## Inhalt laut Briefing

- **CAM1:** nur `klimaneutrale Regionalentwicklung` (Mitte), `isDraggable=false`, `isDeletable=false`, `isTextChangeable=false`.
- **CAM2:** CAM1 + oben links `Windenergie`, `Wasserstoff`, `Netzausbau`, `Akzeptanz`, `Arbeitsplätze`, `isDraggable=true`, `isDeletable=true`, `isTextChangeable=false`.
- Config-Werte (`MinNumNodes`, `MaxNumWords`, `enableArrows` …) sind offen und stehen in `toDos.md`. Nur auf Vorgabe ändern, dann in beiden Teilen.
- Vor jedem Teilnehmer-Build gilt `ShowResearcherButtons: false`. Kein `?ShowResearcherButtons=true` in Studienlinks.
- `defaultFlags.usingSupabase` bleibt `false`: Der Legacy-Pfad lädt die Config von einer externen URL (`?link=`).

## Config, Texte, Stil

- Study-Einstellungen in `config/configfile.js` (zwischen den MAKE-CHANGES-Markern), Start-CAM in `config/defaultCAM.js`, UI-Texte in `config/languages/*` bzw. über `store.language`. Oberfläche Deutsch, Sie-Form.
- ESM mit expliziter `.js`-Endung, keine Aliase. Vendor (`$`, `toastr`, `cytoscape`, `uuidv4`, `Base64`) nur über `src/js/app/vendor.js`.
- 4 Spaces, doppelte Anführungszeichen, Semikolons, Trailing Commas. Nutzerhinweise mit `toastr`, technische Fehler mit `console.error` und Kontext.
- Dialog-IDs in `index.html` und `window.*`-Handler für `onclick` nicht umbenennen.

## Dev / Build

- `npm install` → `npm run dev`. Dev-Konsole (nur dort): `const { store } = await import("/src/js/app/store.js");`
- `npm run build:jatos` → `dist/` mit injiziertem `jatos.js`, plus Kopie als `../<teil>.html` mit Pfaden `./<teil>/dist/…` (JATOS löst gegen den Study-Root auf). Bildpfade in HTML-Strings zur Laufzeit immer als `${__CAM_ASSET_BASE__}img/…`, nie `./img/…`. `dist/` und `node_modules/` sind git-ignoriert. **Nie dort editieren**, sondern in `src/`/`config/` ändern und neu bauen.
