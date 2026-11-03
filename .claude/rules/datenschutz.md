# Datenschutz – Uni Leipzig CAM

Gilt für alle fünf Teile und hat Vorrang vor Komfort oder Design. Einwilligungstext, `datenschutz_version` und Ethik-/DSB-Freigabe sind `TODO(Leipzig)`. Entwürfe nie eigenmächtig als final umformulieren. Die Herder-Newsletter-/E-Mail-Regeln aus `../.claude/rules/datenschutz.md` gelten hier nicht, weil diese Studie weder Newsletter noch E-Mails hat.

## Technik

- **Keine externen Requests:** kein CDN, keine Google Fonts, kein Analytics/Tracking, keine Social-Plugins. Alle Assets liegen lokal (lab.js in `<teil>/lib/`, CAM-Vendor über npm und Vite-Bundle).
- **Datensparsamkeit:** kein User-Agent, keine IP, keine Bildschirmauflösung, keine vollständige URL im Result. Kein `lab.plugins.Metadata()`. Keine Fokus-Paradaten aus `template/` (`paradata_focus.js`) aktivieren.
- **Vor der Einwilligung wird nichts gesendet.** Der Schutz sitzt in der Sende-Funktion selbst: `saveToJatos()` prüft `hasConsent()` in `globals.js` jedes lab.js-Teils. Dieses Muster bei neuen Sende-Wegen beibehalten.
- Ohne Einwilligung: freundlicher Abbruch in Teil 1 (`ConsentNo_htmlScreen`, `jatos.endStudy(false, …)`). Die CAM-Teile werden nicht erreicht.
- Pseudonym nur `teilnehmer_code` (8 Zeichen `a–z0–9`, `generateTeilnehmerCode`). Keine weiteren Personenmerkmale erheben, ohne das Briefing zu fragen.
- Freitext und CAM-Kommentare begrenzen (Vorschlag 1000 Zeichen). Bei der Anzeige immer escapen (`escapeHtml`).
- Falls später Kontaktdaten dazukommen: nie in `console.log`, URLs, Fehlermeldungen oder Dateinamen, sondern maskieren (`n***@example.de`).

## Repo

- Keine echten Ergebnisdaten, JATOS-Exporte (`.jzip` mit Results) oder `.env` committen. Testdaten anonym halten.
- Keine Soft-Robot-, Prolific- oder Freiburg-Logos/Texte aus `template/`. Logos von Uni/Projekt sind `TODO(Leipzig)`, bis dahin neutrales Layout.
