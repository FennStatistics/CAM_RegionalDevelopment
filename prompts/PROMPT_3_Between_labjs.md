# PROMPT 3 von 5: Teil 3 — lab.js Zwischenfragen (`3_between`)

> In den Coding-Agenten einfügen (alles ab hier):

---

Du arbeitest in `Uni_Leipzig_CAM/`. Passe **nur** **`3_between/`** an. CAM-Ordner und Teil 5 nicht anfassen.

**Ausgangslage:** In `3_between/` liegt bereits eine **Kopie des umgesetzten Studienteils `1_start/`** (CI, lab.js-Stack, `globals`, Phasen-Muster, JATOS-Helfer). **Nicht neu aufsetzen und nicht erneut aus `1_start` kopieren** — nur diese vorhandene Kopie anpassen (Screens/Sequence/`study.js`/`index.html` auf Teil-3-Inhalt umbauen; Unnötiges aus Teil 1 entfernen).

## Lies zuerst

1. `Uni_Leipzig_CAM/AGENTS.md`
2. `Uni_Leipzig_CAM/_briefing/00_LIES_MICH_ZUERST.md`
3. `Uni_Leipzig_CAM/_briefing/02_Studienablauf_und_Screens.md` (Teil 3)
4. `Uni_Leipzig_CAM/_briefing/03_Delta_CAM.md` (Session: `CAM_t1` nicht überschreiben)
5. Den **bereits vorhandenen Code in `3_between/`** (Kopie von Teil 1) — das ist deine Basis.
6. **Nicht** `template/post_CAM` (Soft-Robot-Skalen) kopieren.

## Aufgabe

Aus der Teil-1-Kopie eine minimale lab.js-Komponente für Zwischenfragen machen:

1. **Platzhalter Zwischenfragen** — ein Screen (oder sehr wenige) mit Titel und Hinweis, dass hier später der Fragebogen / Zwischenitems stehen. Optional ein einziges Beispiel-Item (Radio oder Kurztext), klar als Platzhalter gekennzeichnet. Teil-1-Screens (Admin-ID, Willkommen, CAM-Erklärung, Einwilligung, …) entfernen bzw. nicht in der Sequence behalten.
2. **Weiter** — `jatos.startNextComponent()` Richtung Teil 4 (Helfer aus der Kopie weiterverwenden/anpassen).
3. **Session-Schutz:** `jatos.studySessionData.CAM_t1` (bzw. den in Prompt 2 gewählten Schlüssel) **lesen dürfen, aber nicht löschen oder überschreiben**. Keine CAM-Neuberechnung.
4. **`teilnehmer_code`:** aus der Session lesen und beim Weiterreichen **beibehalten** (nicht löschen/überschreiben). Ideal in den lab.js-Resultaten dieser Komponente mitspeichern. Die ID stammt aus Teil 1 und muss durch **alle** Studienteile laufen — hier **keine neue ID erzeugen**.
5. CI/Design der Kopie behalten (Sie-Form, professionell).

## Nicht tun

- Keinen kompletten Neuaufbau / kein erneutes Kopieren von `1_start`.
- Keinen CAM-Editor.
- Keine Delta-Anzeige (Prompt 5).
- Keine Soft-Robot-Psychometrie-Skalen aus dem Template.
- Keine Änderungen an `2_CAM_t1` / `4_CAM_t2`.

## Akzeptanzkriterien

- [ ] `3_between/index.html` per Live Server durchklickbar.
- [ ] Weiter löst `startNextComponent` aus (oder dokumentierter lokaler Fallback).
- [ ] Im Code ist erkennbar, dass CAM-Session-Daten unangetastet bleiben.
- [ ] Bericht: Dateien, Tests, `TODO(Leipzig)` (echte Zwischenfragen folgen).
