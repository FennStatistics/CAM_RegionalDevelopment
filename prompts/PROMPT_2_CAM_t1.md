# PROMPT 2 von 5: Teil 2 — Vite-CAM t1 (`2_CAM_t1`)

> In den Coding-Agenten einfügen (alles ab hier):

---

Du arbeitest in `Uni_Leipzig_CAM/`. Passe **nur** **`2_CAM_t1/`** an. Keine lab.js-Teile und kein `4_CAM_t2` in diesem Prompt.

## Lies zuerst

1. `Uni_Leipzig_CAM/AGENTS.md` (Abschnitt Vite-CAM / `store.cam`)
2. `Uni_Leipzig_CAM/_briefing/00_LIES_MICH_ZUERST.md`
3. `Uni_Leipzig_CAM/_briefing/02_Studienablauf_und_Screens.md` (Teil 2)
4. `Uni_Leipzig_CAM/_briefing/03_Delta_CAM.md`
5. Vorhandenen Code: `2_CAM_t1/package.json`, `config/defaultCAM.js`, `config/configfile.js`, Save-/JATOS-Pfad (`src/js/frontend/buttons/participant/saveButton.js` o. ä.), `src/js/app/store.js`
6. Legacy-Handoff nur als Idee lesen: `template/CAMEL/.../saveButton.js` — auf `store.cam` umschreiben; **IDs behalten** (Gegenteil von `CAMEL_second/defaultCAM.js`)

## Aufgabe

1. **Default-CAM** in `config/defaultCAM.js`:
   - Nur ein Node: Text `klimaneutrale Regionalentwicklung`, Position Mitte.
   - `isDraggable=false`, `isDeletable=false`, `isTextChangeable=false`.
   - Keine weiteren Default-Nodes („positive“, Soft-Robot-Konzepte usw.).

2. **Config / Sprache:** Projektname und UI-Texte an die Leipzig-Studie anpassen (Deutsch). Soft-Robot-/Beispielreste entfernen.

3. **JATOS-Session beim Speichern / Weiter:**
   - Serialisiere das aktuelle `store.cam` (nodes + connectors) **inkl. aller `id`-UUIDs** nach `jatos.studySessionData` (z. B. `CAM_t1` oder kompatibler Schlüssel, im Code und Kurzkommentar dokumentieren).
   - Optionale Summaries (mittlere Valenz, Anzahl aktiver Nodes/Connectors) sind erlaubt.
   - **`teilnehmer_code` aus `jatos.studySessionData` erhalten und beim Schreiben der Session mitführen** (aus Teil 1; nie löschen oder neu erzeugen). Ideal auch in den Komponenten-Resultaten speichern. Die ID wird über **alle** Studienteile weitergereicht.
   - Danach `jatos.startNextComponent()`.
   - Lokal ohne JATOS: sinnvollen Fallback (toastr/console), kein Absturz.

4. **`package.json`:** Vite-Scripts nutzen (`npm run dev`, `build:jatos`). Name darf `cam-t1` bleiben.

## Dev-Hinweis (für dich und den Bericht)

Nur unter `npm run dev`:

```javascript
const { store } = await import("/src/js/app/store.js");
window.store = store;
store.cam.nodes; // ids prüfen
```

Kein globales `CAM`. Nicht `CAM_get` cachen.

## Nicht tun

- Keine fünf Zusatzkonzepte (das ist Prompt 4).
- `template/` nicht als Codebasis übernehmen.
- IDs beim Speichern nicht neu würfeln oder weglassen.
- Andere Ordner (`1_start`, `3_between`, `4_CAM_t2`, `5_final`) nicht ändern.

## Akzeptanzkriterien

- [ ] `npm run dev`: Editor startet mit genau einem Zentralbegriff `klimaneutrale Regionalentwicklung`, gesperrt wie spezifiziert.
- [ ] Nach dem Zeichnen weiterer Konzepte haben Nodes stabile UUIDs in `store.cam.nodes[i].id`.
- [ ] Save-Pfad schreibt CAM inkl. IDs in die Session (Code-Review / lokaler Stub nachvollziehbar).
- [ ] Keine Soft-Robot-Default-Inhalte mehr in der Default-CAM.
- [ ] Bericht: Dateien, wie getestet, `TODO(Leipzig)`.
