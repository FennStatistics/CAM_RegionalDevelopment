# Briefing: Uni Leipzig CAM — Clean Energy Valley / Dithmarschen

**Auftraggeber / Kontext:** Uni Leipzig — klimaneutrale Regionalentwicklung Schleswig-Holstein  
**Ziel-Ordner:** `Uni_Leipzig_CAM/`  
**Tech:** lab.js + JATOS (Teile 1, 3, 5) · Vite-CAM (Teile 2, 4)  
**Sprache der Oberfläche:** Deutsch, durchgehend **Sie-Form**  
**Design:** professionell (Stakeholder aus Politik, Verwaltung, Wirtschaft, Zivilgesellschaft)

---

## So benutzt du dieses Briefing (für den Menschen)

1. Root-[`AGENTS.md`](../AGENTS.md) und diesen Ordner `_briefing/` lesen.
2. Coding-Agent im Repository bzw. in `Uni_Leipzig_CAM/` starten.
3. Die fünf Prompts in [`../prompts/`](../prompts/) **nacheinander** einfügen. Nach jedem Prompt im Browser prüfen und committen, erst dann den nächsten starten.

| Schritt | Datei | Ergebnis |
|---|---|---|
| 1 | `prompts/PROMPT_1_Start_labjs.md` | `1_start/`: Willkommen, Ablauf, CAM-Erklärung, Einwilligung, Überleitung |
| 2 | `prompts/PROMPT_2_CAM_t1.md` | `2_CAM_t1/`: CAM1 mit Zentralbegriff, Session inkl. UUIDs |
| 3 | `prompts/PROMPT_3_Between_labjs.md` | `3_between/`: Zwischenfragen-Platzhalter, CAM1 durchreichen |
| 4 | `prompts/PROMPT_4_CAM_t2.md` | `4_CAM_t2/`: CAM1 per ID + 5 Fix-Konzepte |
| 5 | `prompts/PROMPT_5_Final_labjs.md` | `5_final/`: Delta-Feedback, Interview-Platzhalter, Ende, Redirect |

---

## Regeln für das Coding-Modell (gelten für alle Prompts)

- **Zuerst lesen, dann bauen.** Vor jeder Änderung: Root-`AGENTS.md`, die hier genannten Briefing-Dateien und den vorhandenen Code im Zielordner.
- **Nur den aktuellen Prompt** umsetzen; spätere Teile nicht vorwegnehmen.
- **`template/` ist veraltet** (Soft Robots, Legacy-CAMEL, IDs werden verworfen). Nicht als Codebasis kopieren. Nur JATOS-Ketten-Idee und Artikel `template/frobt-13-1741946.xml` nutzen.
- **Vite-CAM:** Zustand in `store.cam`, kein globales `CAM`. IDs = UUIDs an Nodes/Connectors — für Delta-CAM **erhalten**.
- **Inhalte 1:1 aus dem Briefing.** Nichts erfinden. Unklar → nachfragen oder `TODO(Leipzig): …`.
- **Keine externen Ressourcen** (kein CDN, kein Tracking). Alles lokal.
- **lab.js-Teile minimal** (Platzhalter wo vorgesehen), professionelles Design, Sie-Form.
- **Git** nur auf explizite Nutzer-Anfrage.
- **Am Ende jedes Prompts:** geänderte Dateien, Tests, Testanleitung, offene Punkte, Liste `TODO(Leipzig)`.

---

## Verbindlicher Ablauf (5 Teile)

```
1_start → 2_CAM_t1 → 3_between → 4_CAM_t2 → 5_final → Arbeitsgruppen-Redirect
```

Details: [`02_Studienablauf_und_Screens.md`](02_Studienablauf_und_Screens.md).  
Delta-CAM: [`03_Delta_CAM.md`](03_Delta_CAM.md).  
Datenschutz: [`04_Datenschutz_und_Hinweise.md`](04_Datenschutz_und_Hinweise.md).
