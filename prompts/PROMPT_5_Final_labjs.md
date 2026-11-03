# PROMPT 5 von 5: Teil 5 — lab.js Abschluss (`5_final`)

> In den Coding-Agenten einfügen (alles ab hier):

---

Du arbeitest in `Uni_Leipzig_CAM/`. Passe **nur** **`5_final/`** an. CAM-Apps nicht mehr ändern, außer du liest Session-Keys zum Diff.

**Ausgangslage:** In `5_final/` liegt bereits eine **Kopie des umgesetzten Studienteils `1_start/`** (CI, lab.js-Stack, `globals`, Phasen-Muster, JATOS-Helfer). **Nicht neu aufsetzen und nicht erneut aus `1_start` kopieren** — nur diese vorhandene Kopie anpassen (Screens/Sequence/`study.js`/`index.html` auf Teil-5-Inhalt umbauen; Unnötiges aus Teil 1 entfernen).

## Lies zuerst

1. `Uni_Leipzig_CAM/AGENTS.md`
2. `Uni_Leipzig_CAM/_briefing/00_LIES_MICH_ZUERST.md`
3. `Uni_Leipzig_CAM/_briefing/02_Studienablauf_und_Screens.md` (Teil 5)
4. `Uni_Leipzig_CAM/_briefing/03_Delta_CAM.md` (Diff-Regeln, Live-Feedback)
5. `Uni_Leipzig_CAM/_briefing/04_Datenschutz_und_Hinweise.md`
6. Den **bereits vorhandenen Code in `5_final/`** (Kopie von Teil 1) — das ist deine Basis; bei Bedarf `3_between/` nur lesen, falls dort schon angepasste Helfer existieren.
7. Referenz Diff-Idee: `template/frobt-13-1741946.xml` (constant / deleted / new) — nicht Soft-Robot-Inhalte.

## Aufgabe

Aus der Teil-1-Kopie den Abschluss-Teil machen. Teil-1-Screens (Admin-ID-Erzeugung, Willkommen, Einwilligung, …) entfernen bzw. nicht in der Sequence behalten — **`teilnehmer_code` nicht neu erzeugen**, nur aus der Session lesen.

1. **Adaptives Delta-Feedback** (lab.js-Screen):
   - Lies `CAM_t1` und `CAM_t2` aus `jatos.studySessionData` (Keys wie in Prompt 2/4).
   - Berechne mindestens:
     - Vergleich mittlerer Valenz (negativer / positiver / etwa gleich)
     - Δ Anzahl aktiver Konzepte
     - Δ Anzahl aktiver Verbindungen
   - Optional kurz: Anzahl `new` / `deleted` (Match über Node-`id`).
   - Fehlende Session-Daten: ruhige Fehlermeldung, Studie trotzdem fortsetzbar.
   - Diff-Logik idealerweise als kleine UMD-/reine JS-Hilfsfunktion testbar halten.

2. **Interview-Platzhalter** — Screen: qualitatives Interview folgt / wird geführt; Inhalt `TODO(Leipzig)`.

3. **Ende / Danke** — Verabschiedung, Sie-Form.

4. **Redirect Arbeitsgruppen:**
   - `jatos.endStudyAndRedirect(END_REDIRECT_URL)` nach finalem Submit, wenn JATOS da ist.
   - `END_REDIRECT_URL` als Konstante mit `TODO(Leipzig): END_REDIRECT_URL` (Platzhalter-URL dokumentieren, z. B. `#` oder Beispiel-Domain nur lokal).
   - Doppel-Ende vermeiden; Promise von Submit abwarten.

5. **`teilnehmer_code`:** aus `jatos.studySessionData` lesen und in den finalen Resultaten dieser Komponente speichern (Zuordnung Interview ↔ Online). Die ID aus Teil 1 wurde über die gesamte Kette weitergereicht — hier nicht verwerfen.

6. CI/Design der vorhandenen Kopie behalten (konsistent zu Teil 1/3).

## Nicht tun

- Keinen kompletten Neuaufbau / kein erneutes Kopieren von `1_start`.
- Keine echten Interviewfragen erfinden und als final verkaufen.
- Keine Analytics/CDN.
- CAM-Ordner nicht refactorn.
- Soft-Robot-Feedbacktexte aus `template/post_CAMsecond` nicht kopieren.

## Akzeptanzkriterien

- [ ] Mit Mock-Session (zwei CAM-JSONs) zeigt der Delta-Screen nachvollziehbare Kennzahlen.
- [ ] Ohne Session-Daten: kein Crash, klarer Hinweis.
- [ ] Interview- und Ende-Screens vorhanden.
- [ ] Redirect-Pfad im Code; URL als `TODO(Leipzig)` markiert.
- [ ] Bericht: Dateien, wie Delta getestet, offene Punkte, vollständige `TODO(Leipzig)`-Liste der Studie.
