# Delta-CAM

## Referenz

Fenn et al. (2026), *Frontiers in Robotics and AI* — XML im Repo: [`../template/frobt-13-1741946.xml`](../template/frobt-13-1741946.xml).

Kernidee der Referenzstudie: Teilnehmende zeichnen eine erste CAM (pre), revidieren sie nach einer zweiten Information (post). Konzepte werden automatisch klassifiziert als:

| Klasse | Bedeutung |
|---|---|
| **constant** | Konzept existiert in CAM1 und CAM2 (gleiche Identität) |
| **deleted** | in CAM1 aktiv, in CAM2 nicht mehr aktiv / entfernt |
| **new** | in CAM2 hinzugekommen, in CAM1 nicht vorhanden |

Zusätzlich können Valenz, Text, Kommentare und Verbindungen verändert werden — das ist für Leipzig **explizit** Teil der Diff-Logik.

## Leipzig-Anpassung (Clean Energy Valley)

Hier ist die „Intervention“ nicht Soft vs. Rigid Robot, sondern:

1. **CAM1:** freie Map um `klimaneutrale Regionalentwicklung`
2. **CAM2:** dieselbe Map + fünf vorgegebene Zusatzkonzepte (Windenergie, Wasserstoff, Netzausbau, Akzeptanz, Arbeitsplätze)

Vergleich trotzdem revision-basiert: Was bleibt, was fällt weg, was kommt hinzu, was ändert sich emotional oder strukturell?

## Voraussetzung: stabile IDs

Delta-Klassifikation braucht **identische UUIDs** zwischen CAM1 und CAM2 für weitergeführte Elemente.

- Aktuelle Software: `store.cam.nodes[i].id`, `store.cam.connectors[j].id` (Vite-CAM).
- Beim Laden in Teil 4: IDs **wiederherstellen** (`importElement` / `setNodeImport`), **nicht** neu erzeugen.
- Legacy-`template/CAMEL_second/config/defaultCAM.js` kommentiert die ID-Zuweisung aus — **dieses Verhalten ist falsch für Leipzig**.

### Dev-Check (nur `npm run dev`)

```javascript
const { store } = await import("/src/js/app/store.js");
window.store = store;
store.cam.nodes.map(n => ({ id: n.id, text: n.text, value: n.value, isActive: n.isActive }));
```

Nicht `store.CAM` und nicht einen einmaligen Alias `CAM_get` cachen (`setCam()` ersetzt das Objekt). In `dist/` / JATOS-Build ist der dynamische `/src/…`-Import nicht verfügbar.

## Session-Schema (Skizze)

Mindestens in `jatos.studySessionData` (Namen dürfen in der Implementierung leicht abweichen, dann Briefing nachziehen):

```text
CAM_t1          — serialisiertes CAM nach Teil 2 (nodes, connectors, inkl. id)
CAM_t2          — serialisiertes CAM nach Teil 4
meanValence_t1  — optional Summary nach Teil 2
meanValence_t2  — optional Summary nach Teil 4
nNodes_t1 / nNodes_t2
nConnectors_t1 / nConnectors_t2
einwilligung, datenschutz_version  — aus Teil 1, falls gesetzt
```

Teil 3 darf `CAM_t1` nicht überschreiben. Teil 4 schreibt `CAM_t2` und behält `CAM_t1`.

## Diff-Regeln (für Teil 5 und spätere Auswertung)

Vergleich aktiver Elemente (`isActive === true`), gematcht über `id`:

1. **Konzept-Status:** `constant` | `deleted` | `new` (wie Artikel).
2. **Valenz-Änderung:** bei `constant`, wenn `value` (bzw. Valenzfeld) sich unterscheidet.
3. **Text-Änderung:** bei `constant`, wenn `text` sich unterscheidet (bei Fix-Konzepten sollte Text unverändert bleiben).
4. **Kommentar-Änderung:** bei `constant`, wenn `comment` sich unterscheidet.
5. **Verbindungen:** analog über Connector-`id` bzw. Paar source/target-IDs + agreement/intensity; neu / gelöscht / geändert.
6. **Live-Feedback Teil 5 (minimal):** z. B.
   - mittlere Valenz CAM2 vs. CAM1 (negativer / positiver / gleich)
   - Δ Anzahl aktiver Konzepte
   - Δ Anzahl aktiver Verbindungen
   - optional kurze Zähler: neu / gelöscht

Reine UMD-/Hilfsfunktion ohne lab.js-Abhängigkeit ist für Tests wünschenswert (`TODO` in Prompt 5, wenn noch kein `src/js/lib/`-Muster im Ordner existiert).

## Abgrenzung Template

| | Legacy `template/` | Leipzig |
|---|---|---|
| Inhalt | Soft/Rigid Robots | klimaneutrale Regionalentwicklung |
| ID-Handoff | IDs verworfen | IDs erhalten |
| Speicherort | globales `CAM` | `store.cam` |
| Zweite Map | Reload + ggf. andere Config | Reload + 5 Fix-Konzepte oben links |
