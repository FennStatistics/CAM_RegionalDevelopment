# PROMPT 4 von 5: Teil 4 — Vite-CAM t2 (`4_CAM_t2`)

> In den Coding-Agenten einfügen (alles ab hier):

---

Du arbeitest in `Uni_Leipzig_CAM/`. Passe **nur** **`4_CAM_t2/`** an. Delta-UI in Teil 5 nicht bauen.

## Lies zuerst

1. `Uni_Leipzig_CAM/AGENTS.md` (`store.cam`, ID-Regel)
2. `Uni_Leipzig_CAM/_briefing/02_Studienablauf_und_Screens.md` (Teil 4)
3. `Uni_Leipzig_CAM/_briefing/03_Delta_CAM.md`
4. Code in `4_CAM_t2/` und parallel den Save-/Default-Stand in `2_CAM_t1/` (nach Prompt 2) als Referenz für Session-Schlüssel
5. `4_CAM_t2/src/js/backend/Elements.js` (`importElement`), `nodeCAM.js` (`setNodeImport`), `config/defaultCAM.js`
6. Anti-Vorbild: `template/CAMEL_second/config/defaultCAM.js` — dort werden IDs **nicht** gesetzt; bei Leipzig **müssen** sie gesetzt werden

## Aufgabe

1. **`package.json`:** `"name"` von `cam-t1` auf **`cam-t2`** ändern.

2. **CAM1 laden:** Beim Start (JATOS): Nodes/Connectors aus `jatos.studySessionData` (CAM nach Teil 2) in `store.cam` laden und **originale UUIDs** wiederherstellen. Inaktive Elemente wie im Briefing/Template-Sinn handhaben (nur aktive zeichnen, IDs der aktiven erhalten).

3. **Fünf Fix-Konzepte oben links** zusätzlich einfügen (eigene **neue** UUIDs ok, da neu):

   | Text | Flags |
   |---|---|
   | Windenergie | `isDraggable=true`, `isDeletable=true`, `isTextChangeable=false` |
   | Wasserstoff | ebenso |
   | Netzausbau | ebenso |
   | Akzeptanz | ebenso |
   | Arbeitsplätze | ebenso |

   Positionen klar oben links staffeln, ohne den Zentralbegriff zu überdecken.

4. **Zentralbegriff** aus CAM1 bleibt gesperrt (nicht textänderbar / nicht löschbar), sofern er aus CAM1 kommt.

5. **Speichern:** `CAM_t2` (aktuelles `store.cam` inkl. IDs) schreiben; **`CAM_t1` in der Session behalten**. Summaries für t2 optional. Dann `jatos.startNextComponent()`.

6. **`teilnehmer_code`:** aus `jatos.studySessionData` erhalten und beim Session-Schreiben **mitführen** (nie löschen/neu erzeugen). Ideal auch in den Komponenten-Resultaten. Die ID aus Teil 1 muss durch **alle** Studienteile weitergereicht werden.

7. Config/Sprache an Leipzig anpassen; Soft-Robot-Reste entfernen.

## Dev-Check

```javascript
const { store } = await import("/src/js/app/store.js");
// Nach Load: IDs der aus CAM1 übernommenen Nodes müssen denen in Session CAM_t1 entsprechen
store.cam.nodes.map(n => n.id);
```

Nur mit `npm run dev`. Immer `store.cam` lesen.

## Nicht tun

- IDs der übernommenen CAM1-Elemente neu generieren.
- Legacy-`CAMEL_second` 1:1 kopieren.
- Teil 5 / Delta-UI hier bauen.
- `2_CAM_t1` nur lesen, nicht „zur Sicherheit“ umbauen (außer zwingend gemeinsamer Session-Key — dann kurz im Bericht nennen).

## Akzeptanzkriterien

- [ ] Mit Mock-/Session-CAM1: Nodes erscheinen mit denselben IDs wie in t1.
- [ ] Fünf Fix-Konzepte oben links; Text im Dialog nicht änderbar; löschen/verschieben/verknüpfen möglich.
- [ ] Save behält `CAM_t1` und schreibt `CAM_t2`.
- [ ] `package.json` name = `cam-t2`.
- [ ] Bericht: Dateien, ID-Testbeschreibung, `TODO(Leipzig)`.
