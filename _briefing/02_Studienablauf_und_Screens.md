# Studienablauf und Screens

JATOS-Komponentenreihenfolge:

```
1_start → 2_CAM_t1 → 3_between → 4_CAM_t2 → 5_final
```

Am Ende von Teil 5: Redirect auf Arbeitsgruppen — URL = `TODO(Leipzig): END_REDIRECT_URL`.

Oberfläche: Deutsch, **Sie-Form**. lab.js-Texte bewusst **minimal** (Platzhalter wo unten vermerkt).

---

## Teil 1 — `1_start/` (lab.js)

| Screen | Zweck | Hinweis |
|---|---|---|
| Willkommen | Begrüßung, Kontext Clean Energy Valley / klimaneutrale Regionalentwicklung | Kurz, professionell |
| Was passiert | Ablauf in 5 Teilen skizzieren | CAM erwähnen, Dauer grob `TODO(Leipzig)` falls fest |
| Was sind CAMs? | Kurze Erklärung Cognitive-Affective Maps (Konzepte, Valenz, Verbindungen) | Keine Soft-Robot-Folien aus `template/` |
| Informierte Einwilligung | Pflichtauswahl einverstanden / nicht einverstanden | Version speichern; ohne Einwilligung: Abbruch-Screen |
| Überleitung | Übergang zu Teil 2 (erste CAM) | Danach `jatos.startNextComponent()` |

Vor Einwilligung nichts an JATOS senden.

---

## Teil 2 — `2_CAM_t1/` (Vite-CAM)

- Default-CAM: **nur** Zentralbegriff `klimaneutrale Regionalentwicklung` in der Mitte.
- Flags Zentralbegriff: `isDraggable=false`, `isDeletable=false`, `isTextChangeable=false`.
- Teilnehmende ergänzen eigene Konzepte, Valenzen, Verbindungen, Kommentare.
- Beim Speichern / Weiter: volles CAM-Objekt aus `store.cam` (Nodes + Connectors **inkl. UUID-`id`**) in `jatos.studySessionData` legen, dann nächste Komponente.

---

## Teil 3 — `3_between/` (lab.js)

| Screen | Zweck |
|---|---|
| Platzhalter Zwischenfragen | Titel + kurzer Hinweis „Fragebogen folgt“ / minimale Beispiel-UI |
| Weiter | `jatos.startNextComponent()` — Session-Daten der CAM1 **nicht** überschreiben oder löschen |

Kein eigener CAM-Editor. Keine Soft-Robot-Skalen aus `template/post_CAM`.

---

## Teil 4 — `4_CAM_t2/` (Vite-CAM)

- CAM1 aus `jatos.studySessionData` in `store.cam` laden und **dieselben Node-/Connector-IDs** wiederherstellen (`importElement` / `setNodeImport`).
- Zusätzlich oben links fünf vorgegebene Konzepte (nur bewegbar/verknüpfbar/löschbar, Text fix):

  1. `Windenergie`
  2. `Wasserstoff`
  3. `Netzausbau`
  4. `Akzeptanz`
  5. `Arbeitsplätze`

  Flags je Zusatzkonzept: `isDraggable=true`, `isDeletable=true`, `isTextChangeable=false`.

- Speichern: CAM2 + weiterhin CAM1 (für Delta) in Session / Result; dann weiter zu Teil 5.

---

## Teil 5 — `5_final/` (lab.js)

| Screen | Zweck |
|---|---|
| Adaptives Delta-Feedback | Live-Zusammenfassung CAM1 vs. CAM2 (z. B. mittlere Valenz negativer/positiver?, Δ aktive Konzepte, Δ Verbindungen; optional Hinweise zu gelöscht/neu) |
| Interview-Platzhalter | Hinweis auf qualitatives Interview (Inhalt folgt) |
| Ende / Danke | Verabschiedung |
| Redirect | `jatos.endStudyAndRedirect(…)` bzw. lokal Fallback — Ziel Arbeitsgruppen |

Delta-Logik: [`03_Delta_CAM.md`](03_Delta_CAM.md).
