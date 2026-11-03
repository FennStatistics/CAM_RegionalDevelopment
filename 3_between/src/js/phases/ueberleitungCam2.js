/*
################### Überleitung zu Teil 4 (zweite CAM) ###################
Multi-Component: speichern → Session behalten (CAM_t1) → startNextComponent()
Keine Zwischenfragen.
*/

const ueberleitungCam2Text = pageTemplate({
  title: "Weiter zur zweiten CAM",
  body: `
      <p>Als Nächstes bearbeiten Sie Ihre Map erneut — ergänzt um vorgegebene Begriffe aus dem Clean Energy Valley (bezogen auf den Kreis Dithmarschen).</p>
      <p>Sie können bestehende Konzepte anpassen und weitere ergänzen. Kommentieren Sie gerne, was Sie ändern und warum.</p>
      <p>Nehmen Sie sich wieder Zeit und gehen Sie von Ihrer eigenen Einschätzung aus.</p>
      <div id="lokal-hinweis" class="hinweis-lokal" hidden>
        <strong>Lokaler Test:</strong> In JATOS würde jetzt der nächste Studienteil starten
        (<code>jatos.startNextComponent()</code> → Teil&nbsp;4). Ohne JATOS endet Teil&nbsp;3 hier.
        <span id="session-code-hinweis"></span>
      </div>
    `,
  formId: "form-ueberleitung-cam2",
  button: "Zur zweiten CAM &rarr;",
});

const UeberleitungCam2_htmlForm = new lab.html.Form({
  title: "UeberleitungCam2",
  content: ueberleitungCam2Text,
  messageHandlers: {
    run: () => {
      syncSessionToDatastore();
      if (!isJatosAvailable()) {
        const el = document.getElementById("lokal-hinweis");
        if (el) el.hidden = false;
        const codeEl = document.getElementById("session-code-hinweis");
        if (codeEl) {
          codeEl.textContent =
            " (Lokal ohne Session: teilnehmer_code / CAM_t1 kommen erst in der JATOS-Kette.)";
        }
      }
    },
    commit: () => {
      syncSessionToDatastore();
      advanceProgress();
      setProgress(100);
      finishBetweenAndContinue();
    },
  },
});
