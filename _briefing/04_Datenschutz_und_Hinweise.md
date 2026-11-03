# Datenschutz und Hinweise

Rechtliche Finaltexte und Ethikfreigabe: `TODO(Leipzig)`. Die folgenden Punkte sind **Arbeitsregeln für die Implementierung**, keine fertige Datenschutzerklärung.

## Einwilligung und Speichern

- Teil 1: informierte Einwilligung mit Pflichtauswahl (einverstanden / nicht einverstanden).
- `einwilligung` und `datenschutz_version` speichern, sobald die Person zustimmt.
- **Vor Einwilligung nichts** an JATOS senden.
- Ohne Einwilligung: freundlicher Abbruch, Studie beenden (`jatos.endStudy(false, …)` o. ä.), keine CAM-Teile.

## Datensparsamkeit

- Kein User-Agent, keine IP, keine Bildschirmauflösung, keine volle URL als Ergebnisdaten.
- Kein Metadata-Plugin / keine Fokus-Paradaten aus dem Soft-Robot-Template übernehmen.
- Erlaubt: grobe Geräteklasse (optional), Whitelist-Query-Parameter falls später nötig.
- Freitext / CAM-Kommentare begrenzen (Vorschlag: 1000 Zeichen); Anzeige immer escapen.

## E-Mails und Identifikation

- Falls später Kontaktdaten erhoben werden: nie in `console.log`, URLs, Fehlermeldungen oder Dateinamen im Klartext; maskieren.
- Stakeholder-Studie: Identifikation oft über Interview-Kontext — Online-Komponente möglichst ohne unnötige Personenmerkmale. `TODO(Leipzig):` Pseudonym-/Code-Verfahren.

## Newsletter / Tracking

- Keine Analytics, keine Social-Plugins, keine CDNs.
- Kein Newsletter-Zwang; falls Opt-in später: separat, nie vorangekreuzt, Double-Opt-in-Hinweis.

## UX / Ansprache

- Deutsch, **Sie-Form**, professioneller Ton.
- Keine Soft-Robot-, Prolific- oder Freiburg-Logos/Texte aus `template/`.
- Logos Uni Leipzig / Projekt: `TODO(Leipzig)` — bis dahin neutrales, ruhiges Layout.

## Offene Punkte

- `TODO(Leipzig):` finaler Einwilligungstext und `datenschutz_version`
- `TODO(Leipzig): END_REDIRECT_URL` (Arbeitsgruppen)
- `TODO(Leipzig):` Interview-Leitfaden (Inhalt Teil-5-Platzhalter)
- `TODO(Leipzig):` genaue CAM-Mindestanzahl Konzepte / Zeitangaben
- `TODO(Leipzig):` Ethik / DSB-Freigabe
