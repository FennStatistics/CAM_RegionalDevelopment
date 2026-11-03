/*
################### Adaptives Delta-Feedback ###################
Vergleich CAM_t1 vs. CAM_t2 aus studySessionData (computeCamDelta).
*/

const deltaFeedbackText = pageTemplate({
  title: "Ihre Maps im Vergleich",
  body: `
      <p>Hier sehen Sie eine kurze Zusammenfassung, wie sich Ihre zweite Cognitive-Affective Map gegenüber der ersten verändert hat.</p>
      <div id="delta-fehler" class="hinweis-lokal" hidden>
        <p>Die Vergleichsdaten aus den vorherigen Teilen liegen hier nicht vor. Sie können die Studie trotzdem fortsetzen.</p>
      </div>
      <div id="delta-ergebnis" hidden>
        <ul class="delta-liste">
          <li><strong>Mittlere Valenz:</strong> <span id="delta-valence-trend"></span>
            <span class="text-muted">(<span id="delta-mean-t1"></span> → <span id="delta-mean-t2"></span>)</span>
          </li>
          <li><strong>Aktive Konzepte:</strong> Veränderung um <span id="delta-n-nodes"></span>
            <span class="text-muted">(<span id="delta-nodes-t1"></span> → <span id="delta-nodes-t2"></span>)</span>
          </li>
          <li><strong>Aktive Verbindungen:</strong> Veränderung um <span id="delta-n-connectors"></span>
            <span class="text-muted">(<span id="delta-conn-t1"></span> → <span id="delta-conn-t2"></span>)</span>
          </li>
          <li><strong>Konzepte:</strong>
            <span id="delta-n-new"></span> neu,
            <span id="delta-n-deleted"></span> nicht mehr aktiv,
            <span id="delta-n-constant"></span> unverändert (gleiche ID)
          </li>
        </ul>
      </div>
    `,
  formId: "form-delta-feedback",
  button: BTN_NEXT,
});

function formatSigned(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  if (n > 0) return "+" + n;
  return String(n);
}

function formatMean(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  return (Math.round(n * 100) / 100).toFixed(2);
}

function valenceTrendLabel(trend) {
  if (trend === "positiver") return "im Mittel positiver";
  if (trend === "negativer") return "im Mittel negativer";
  return "etwa gleich";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/** Letztes Delta-Ergebnis für commit (Datastore). */
var lastDeltaResult = null;

const DeltaFeedback_htmlForm = new lab.html.Form({
  title: "DeltaFeedback",
  content: deltaFeedbackText,
  messageHandlers: {
    run: () => {
      syncSessionToDatastore();
      lastDeltaResult = null;

      const session = getStudySessionData();
      const cam1 = session.CAM_t1;
      const cam2 = session.CAM_t2;
      const result =
        typeof computeCamDelta === "function"
          ? computeCamDelta(cam1, cam2)
          : { ok: false, error: "Delta-Funktion nicht geladen." };

      lastDeltaResult = result;

      const errEl = document.getElementById("delta-fehler");
      const okEl = document.getElementById("delta-ergebnis");

      if (!result || !result.ok) {
        if (errEl) errEl.hidden = false;
        if (okEl) okEl.hidden = true;
        return;
      }

      if (errEl) errEl.hidden = true;
      if (okEl) okEl.hidden = false;

      setText("delta-valence-trend", valenceTrendLabel(result.valenceTrend));
      setText("delta-mean-t1", formatMean(result.meanValence_t1));
      setText("delta-mean-t2", formatMean(result.meanValence_t2));
      setText("delta-n-nodes", formatSigned(result.deltaNodes));
      setText("delta-nodes-t1", String(result.nNodes_t1));
      setText("delta-nodes-t2", String(result.nNodes_t2));
      setText("delta-n-connectors", formatSigned(result.deltaConnectors));
      setText("delta-conn-t1", String(result.nConnectors_t1));
      setText("delta-conn-t2", String(result.nConnectors_t2));
      setText("delta-n-new", String(result.nNew));
      setText("delta-n-deleted", String(result.nDeleted));
      setText("delta-n-constant", String(result.nConstant));
    },
    commit: () => {
      syncSessionToDatastore();
      const ds = study.options.datastore;
      if (lastDeltaResult && lastDeltaResult.ok) {
        ds.set("delta_ok", true);
        ds.set("delta_valence_trend", lastDeltaResult.valenceTrend);
        ds.set("delta_mean_t1", lastDeltaResult.meanValence_t1);
        ds.set("delta_mean_t2", lastDeltaResult.meanValence_t2);
        ds.set("delta_n_nodes", lastDeltaResult.deltaNodes);
        ds.set("delta_n_connectors", lastDeltaResult.deltaConnectors);
        ds.set("delta_n_new", lastDeltaResult.nNew);
        ds.set("delta_n_deleted", lastDeltaResult.nDeleted);
        ds.set("delta_n_constant", lastDeltaResult.nConstant);
      } else {
        ds.set("delta_ok", false);
      }
      advanceProgress();
    },
  },
});
