# CLAUDE.md — Uni Leipzig CAM

Studienregeln (Auftrag, Tech-Split, Prompt-Disziplin, Delta-CAM, harte Regeln) stehen in der für Cursor/Codex gepflegten `AGENTS.md` und werden hier importiert:

@AGENTS.md

## Vorrang gegenüber dem Eltern-Repo

Claude lädt auch `../CLAUDE.md` und `../.claude/rules/` (Verlag Herder, Kita-Selbsttest). Für alles unter `Uni_Leipzig_CAM/` gehen **diese Datei und [.claude/rules/](.claude/rules/)** vor. Hier gilt **nicht**:

- Herder-CI, Herder-Logos, Epilogue-Pflicht
- **du-Form** → hier durchgehend **Sie-Form**
- Kita-Briefing, `selbstkonzeptKita.md`, Newsletter-/E-Mail-/`wa.me`-Regeln
- „Vorlage `interneUmfrage/`“ → Vorlage sind die vorhandenen Leipzig-Teile selbst; `template/` ist veraltet

Allgemeine lab.js-/JATOS-Muster aus dem Eltern-Repo bleiben als Orientierung gültig, soweit sie den Regeln hier nicht widersprechen.

## Regeldateien

Liegen in [.claude/rules/](.claude/rules/) und werden je nach bearbeiteten Dateien geladen:

| Datei | Geladen bei | Inhalt |
|---|---|---|
| [datenschutz.md](.claude/rules/datenschutz.md) | immer | Datensparsamkeit, Einwilligung, keine externen Requests |
| [jatos.md](.claude/rules/jatos.md) | `*.js`, `*.html` | Komponenten-Kette, Study Session, Results, Deployment |
| [labjs.md](.claude/rules/labjs.md) | `1_start/`, `3_between/`, `5_final/` | lab.js 20.2.4, Komponentenmuster, Helfer, Code-Stil |
| [vite-cam.md](.claude/rules/vite-cam.md) | `2_CAM_t1/`, `4_CAM_t2/` | `store.cam`, UUID-Erhalt, Spiegelregel t1/t2, Build |

## Weitere Doku

- [studienablauf.md](studienablauf.md) — Ist-Stand aller fünf Teile, Session-Schema, Result-Muster
- [toDos.md](toDos.md) — offene `TODO(Leipzig)`-Punkte
- [aufsetzenJatos.md](aufsetzenJatos.md) — JATOS-Study anlegen, HTML-Pfade je Komponente
- [_briefing/](_briefing/) (00–04) und [prompts/](prompts/) — Spezifikation und Agent-Aufträge

## Befehle

```powershell
# lab.js-Teile (1, 3, 5): VS Code Live Server auf <teil>/index.html (jatos.js-404 lokal harmlos)

# CAM-Teile (2, 4), jeweils im Teil-Ordner
npm install
npm run dev          # lokal, mit jatosStub
npm run build:jatos  # dist/ für JATOS (injiziert jatos.js)

# Node-Test Delta-Berechnung (ohne Abhängigkeiten)
node 5_final/tests/deltaCam.test.js
```

Keine Linter. Nach Änderungen die betroffenen Screens im Browser durchklicken und die Konsole prüfen. Wenn das nicht möglich war, im Abschlussbericht ehrlich sagen.

## Doku pflegen

- Ändern sich Studienregeln, `AGENTS.md`, `.cursor/rules/*.mdc` und `.claude/rules/*.md` gemeinsam anpassen.
- Ändern sich Ablauf, Session-Keys oder Results, `studienablauf.md` und `toDos.md` nachziehen.
