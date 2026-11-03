# PROMPT 1 von 5: Teil 1 — lab.js Start (`1_start`)

> In den Coding-Agenten einfügen (alles ab hier):

---

Du arbeitest in `Uni_Leipzig_CAM/`. Baue **nur** die lab.js-Komponente in **`1_start/`**. Spätere Teile (CAM, Zwischenfragen, Delta, Ende) nicht implementieren.

## Lies zuerst (vollständig, bevor du etwas änderst)

1. `Uni_Leipzig_CAM/AGENTS.md`
2. `Uni_Leipzig_CAM/_briefing/00_LIES_MICH_ZUERST.md`
3. `Uni_Leipzig_CAM/_briefing/01_Studienuebersicht.md`
4. `Uni_Leipzig_CAM/_briefing/02_Studienablauf_und_Screens.md` (Abschnitt Teil 1)
5. `Uni_Leipzig_CAM/_briefing/04_Datenschutz_und_Hinweise.md`
6. Als Struktur-Orientierung (nicht Inhalte kopieren): eine bestehende lab.js-Studie im Repo, z. B. `interneUmfrage/` oder `selbstkonzeptKita/` — `index.html`, `study.js`, `globals.js`, Phasen-Muster. lab.js-API am vorhandenen `lib/lab.js` prüfen.
7. **Nicht** Soft-Robot-Inhalte oder Folien aus `Uni_Leipzig_CAM/template/pre_CAM` übernehmen.

## Aufgabe

Lege in `1_start/` ein lauffähiges lab.js-Minimalgerüst an (statisch, kein Bundler, kein CDN):

0. **Teilnehmer-Code (Admin)** — erste Seite nur für die Administration: zufällige ID `teilnehmer_code` (8 Zeichen, nur `a–z` und `0–9`) anzeigen und speichern. Hinweis „nur für Administration“.
1. **Willkommen** — Clean Energy Valley / klimaneutrale Regionalentwicklung, Stakeholder-Kontext, Sie-Form.
2. **Was passiert** — kurze Skizze der fünf Teile.
3. **Was sind CAMs?** — Konzepte, emotionale Valenz, Verbindungen in wenigen Sätzen.
4. **Informierte Einwilligung** — Pflichtauswahl; speichere `einwilligung`, `datenschutz_version`. Abbruch-Screen ohne Einwilligung (`jatos.endStudy(false, …)` wenn JATOS verfügbar). Vor Einwilligung nichts senden.
5. **Überleitung** zu Teil 2 — Button führt zu `jatos.startNextComponent()` (lokal: klarer Hinweis / no-op mit Konsolenwarnung). Beim Handoff `teilnehmer_code` (sowie `einwilligung`, `datenschutz_version`) in `jatos.studySessionData` schreiben — **diese ID muss durch alle fünf Studienteile weitergereicht werden** (nie löschen/überschreiben).

Anforderungen:

- Professionelles, ruhiges Design (eigene minimale CSS-Variablen ok; keine Herder-Kita-CI erzwingen, keine Freiburg-Logos).
- Screen-Texte neben den Komponenten (lab.js-Stil: `*_htmlForm` / `*_htmlScreen`).
- `jatos.onLoad` → Study starten; lokal ohne JATOS durchklickbar.
- Logos: Platzhalter oder weglassen + `TODO(Leipzig)`.

## Nicht tun

- Keine Dateien in `2_CAM_t1`, `3_between`, `4_CAM_t2`, `5_final`, `template` ändern (außer Lesen).
- Keine Soft-Robot-Texte, keine Paradaten-Plugins.
- Keinen CAM-Editor in Teil 1.

## Akzeptanzkriterien

- [ ] `1_start/index.html` per Live Server: Screens Willkommen → … → Überleitung ohne Konsolenfehler (außer harmlosem `jatos.js`-404).
- [ ] „Nicht einverstanden“ beendet den Durchlauf.
- [ ] Mit Einwilligung endet Teil 1 mit Aufruf von `startNextComponent` (oder dokumentiertem lokalem Fallback).
- [ ] Sie-Form, keine Template-Soft-Robot-Inhalte.
- [ ] Bericht: Dateien, Testanleitung, `TODO(Leipzig)`.
