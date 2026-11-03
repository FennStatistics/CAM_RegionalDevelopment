# JATOS aufsetzen — Uni Leipzig CAM

Kurzanleitung für dich als Mensch.

## Warum Root-HTMLs?

JATOS liefert jede Komponente unter `/publix/<studyResult>/<component>/start` aus. Relative Pfade (`lib/…`, `assets/…`, `img/…`) werden deshalb gegen den **Study-Assets-Root** aufgelöst, nicht gegen den Ordner der HTML-Datei. `1_start/index.html` würde also `<root>/lib/lab.js` laden und einen 404 bekommen.

Deshalb liegt je Komponente eine HTML-Datei im Hauptordner, deren Pfade den Teil-Ordner enthalten:

| Komponente | HTML file path | Pfade darin |
|---|---|---|
| 1_start | `1_start.html` | `./1_start/…` (von Hand gepflegt) |
| 2_CAM_t1 | `2_CAM_t1.html` | `./2_CAM_t1/dist/…` (von `build:jatos` erzeugt) |
| 3_between | `3_between.html` | `./3_between/…` (von Hand gepflegt) |
| 4_CAM_t2 | `4_CAM_t2.html` | `./4_CAM_t2/dist/…` (von `build:jatos` erzeugt) |
| 5_final | `5_final.html` | `./5_final/…` (von Hand gepflegt) |

`jatos.js` bleibt überall ohne Präfix (`<script src="jatos.js">`). JATOS liefert es selbst aus.

Die `index.html` in `1_start/`, `3_between/`, `5_final/` bleiben für lokale Tests mit Live Server. Kommen neue Skripte dazu, beide HTML-Dateien anpassen.

## Vor dem Upload

1. In `2_CAM_t1/` und `4_CAM_t2/`: `npm install` (falls nötig), dann `npm run build:jatos`.
   - Das schreibt `dist/` und kopiert `dist/index.html` mit Präfix-Pfaden nach `../2_CAM_t1.html` bzw. `../4_CAM_t2.html` (siehe `vite.config.js`).
   - Laufzeit-Bildpfade im CAM (`reference.js`, `interactionNode.js`) nutzen `__CAM_ASSET_BASE__` und bekommen dasselbe Präfix.
2. Prüfen: `2_CAM_t1.html` und `4_CAM_t2.html` enthalten `<script src="jatos.js"></script>` und Pfade `./<teil>/dist/assets/…`. Fehlt das, war es kein JATOS-Build.
3. Die Root-CAM-HTMLs nie von Hand bearbeiten. Nach jeder CAM-Änderung neu bauen, weil sich die Hash-Dateinamen ändern.

Optional weglassen beim Upload: `node_modules/` und der CAM-Quellcode (`src/` der Vite-Apps).

## Study in JATOS anlegen

Eine Study mit **fünf Komponenten** in dieser Reihenfolge, HTML-Pfade wie in der Tabelle oben:

`1_start` → `2_CAM_t1` → `3_between` → `4_CAM_t2` → `5_final`

Study-Assets = Inhalt von `Uni_Leipzig_CAM/`.

## Nach dem Aufsetzen

1. Study lokal / auf dem Server als Run starten, die Kette durchklicken und die Konsole auf 404s prüfen.
2. Results und `studySessionData` prüfen (`teilnehmer_code`, `CAM_t1`, `CAM_t2`, Einwilligung).
3. Study in JATOS als **`.jzip` exportieren** (nicht von Hand zippen).
