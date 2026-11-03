# Studienübersicht

## Kurzfassung

Die Studie untersucht am Beispiel des **Clean Energy Valley in Dithmarschen**, welche Konflikt-, Kooperations- und Gemeinsamkeitspotenziale in einer frühen Phase der regionalen Energiewende bestehen. Dazu werden etwa **15–20 Stakeholder** aus Politik, Verwaltung, Wirtschaft und Zivilgesellschaft in semi-strukturierten Interviews befragt und erstellen jeweils **Cognitive-Affective Maps (CAMs)** ihrer Sicht auf die **klimaneutrale Regionalentwicklung**.

Die CAMs werden anschließend **quantitativ** (Netzwerk- und Valenzanalysen) sowie **qualitativ** ausgewertet, um gemeinsame Denkmuster, Konfliktlinien, Framing-Unterschiede und zentrale Themen sichtbar zu machen. Gleichzeitig soll geprüft werden, inwieweit CAM als Methode geeignet ist, auch **latente Konflikte** und **potenzielle Gemeinsamkeiten** zwischen Akteuren aufzudecken.

## Forschungsziele

1. **Common Ground** — Gemeinsames Verständnis und geteilte Konzepte zwischen Stakeholder-Gruppen.
2. **Konflikte und Konfliktpotenziale** — zentrale Triggerpunkte, Valenz-Gegensätze, fehlende oder hemmende Verbindungen.
3. **Methodenprüfung** — Eignung von CAM (inkl. Delta-CAM zwischen zwei Zeichenphasen) für frühe Phasen regionaler Transformationsprozesse.

## Design der Online-Studie (fünf Teile)

| Teil | Medium | Inhalt |
|---|---|---|
| 1 | lab.js | Willkommen, Ablauf, Was sind CAMs?, informierte Einwilligung, Überleitung |
| 2 | Vite-CAM | Freie CAM um den Zentralbegriff `klimaneutrale Regionalentwicklung` |
| 3 | lab.js | Zwischenfragen / Platzhalter; CAM1 in der JATOS-Session behalten |
| 4 | Vite-CAM | Dieselbe CAM (identische IDs) + 5 vorgegebene Konzepte |
| 5 | lab.js | Adaptives Delta-Feedback, Interview-Platzhalter, Verabschiedung, Redirect zu Arbeitsgruppen |

Die zweite CAM-Phase folgt dem **Delta-CAM-Ansatz** (Revision der ersten Map; Klassifikation constant / deleted / new u. a.) — siehe [`03_Delta_CAM.md`](03_Delta_CAM.md) und Fenn et al. 2026 (`template/frobt-13-1741946.xml`).

## Zielgruppe und Setting

- Experten / Stakeholder, nicht Lay-Crowdsourcing.
- Professionelle UI, ruhige Typografie, klare Hierarchie; Logos/CI: `TODO(Leipzig)` falls Uni-/Projektmarken nachgeliefert werden.
- Durchgang typischerweise begleitet oder in Interview-Setting; Teil 5 enthält einen Platzhalter für das qualitative Interview.

## Auswertung (Orientierung, nicht Teil der Frontend-Prompts 1–5)

- **Innerhalb einer Person:** Delta zwischen CAM1 und CAM2 (IDs, Valenz, Kanten, Text, Kommentar).
- **Zwischen Personen:** Netzwerk-/Valenzvergleiche, Framing, gemeinsame vs. konfliktäre Konzepte.
- Export über JATOS-Resultate der fünf Komponenten; Session-Handoff siehe [`03_Delta_CAM.md`](03_Delta_CAM.md).
