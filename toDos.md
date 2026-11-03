# TODO(Leipzig) — Uni Leipzig CAM

Offene Punkte aus Briefing und Code. Stand: nach Prompt 5 (`5_final`).

## Inhalt / Rechtliches

- [ ] Finaler Einwilligungstext freigeben
- [ ] `datenschutz_version` festlegen (aktuell Entwurf: `entwurf-2026-03-01` in `1_start`)
- [ ] Ethik- / DSB-Freigabe
- [x] Pseudonym-/Code-Verfahren: Zufalls-ID (`teilnehmer_code`, 8 Zeichen, a–z + 0–9) auf Admin-Seite in `1_start`; in Result + Session
- [ ] Interview-Leitfaden (Inhalt für Teil-5-Platzhalter)

## Design / CI

- [ ] Logos Uni Leipzig / Projekt einbinden
- [ ] CI-Farben/Marken finalisieren (aktuell neutrales Petrol-Layout in `1_start`)

## Ablauf / Parameter

- [ ] Gesamtdauer bzw. Zeitangaben je Teil festlegen
- [ ] `END_REDIRECT_URL` (Arbeitsgruppen) — Ziel am Ende von Teil 5 (Platzhalter `https://example.org` in `5_final/src/js/globals.js`)

## Config CAM (`2_CAM_t1` + `4_CAM_t2` / `config/configfile.js`)

Aktuell (Prompt 2+4, gespiegelt): `MinNumNodes: 1`, `MaxNumWords: 3`, `MaxLengthChars: 40`, `enableArrows: false`, `enableAmbivalent: false`, `fullScreen: false`, `setReminder: false`, `ShowResearcherButtons: false`.

- [ ] `MinNumNodes` — Mindestanzahl Konzepte vor Speichern (jetzt 1 = nur Zentralbegriff reicht; falls Vorgabe z. B. 8+)
- [ ] `MaxLengthChars` — ggf. erhöhen, falls längere Stakeholder-Begriffe nötig (jetzt 40; Zentralbegriff passt)
- [ ] `MaxNumWords` — bei 3 belassen oder anpassen (Doku empfiehlt 1–3 für Aggregation)
- [ ] `enableArrows` / `BidirectionalDefault` / `OnlyStraightCon` — gerichtete Verbindungen gewünscht?
- [ ] `enableAmbivalent` — ambivalente Konzepte erlauben?
- [ ] `fullScreen` (+ Paradaten Defocus) — für Stakeholder-Setting gewünscht?
- [ ] `setReminder` — Erinnerungs-Popups nach X ms?
- [ ] Start-Dialog Zeitangabe (früher „15 Minuten“) — an echte Dauer koppeln, sobald fest
- [x] Config-Werte 1:1 in `4_CAM_t2` gespiegelt (außer Default-CAM / Fix-Konzepte / `CAMproject`)

## Noch zu bauen (Prompts 2–5)

- [x] Prompt 2: `2_CAM_t1/` — erste CAM mit Zentralbegriff
- [x] Prompt 3: `3_between/` — Dank nach CAM1 + Überleitung zu CAM2 (echte Zwischenfragen ggf. später)
- [x] Prompt 4: `4_CAM_t2/` — CAM2 inkl. ID-Erhalt + 5 Fix-Konzepte
- [x] Prompt 5: `5_final/` — Delta-Feedback, Interview-Platzhalter, Redirect
