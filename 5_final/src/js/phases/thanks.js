/*
################### Ende / Danke ###################
Verabschiedung; finaler Submit + endStudyAndRedirect.
*/

const thanksText = pageTemplate({
  title: "Vielen Dank",
  body: `
      <p>Herzlichen Dank noch einmal, dass Sie sich die Zeit genommen und sich auf diese Methode eingelassen haben. Das ist für uns sehr wertvoll und macht unsere Arbeit erst möglich.</p>
      <p>Ihre Einschätzungen helfen uns, gemeinsame Vorstellungen, Konflikte und Anknüpfungspunkte im Kontext des Clean Energy Valley sichtbar zu machen.</p>
      <div id="lokal-ende-hinweis" class="hinweis-lokal" hidden>
        <strong>Lokaler Test:</strong> Nach dem Klick werden Sie zu END_REDIRECT_URL weitergeleitet
        (in JATOS über <code>jatos.endStudyAndRedirect</code>).
        TODO(Leipzig): Arbeitsgruppen-URL.
      </div>
    `,
  formId: "form-thanks",
  button: "Studie beenden &rarr;",
});

const Thanks_htmlForm = new lab.html.Form({
  title: "Thanks",
  content: thanksText,
  messageHandlers: {
    run: () => {
      syncSessionToDatastore();
      if (!isJatosAvailable()) {
        const el = document.getElementById("lokal-ende-hinweis");
        if (el) el.hidden = false;
      }
    },
    commit: () => {
      // zweiter Klick würde sonst nativ submitten (Reload)
      const btn = document.getElementById("continue");
      if (btn) btn.disabled = true;
      syncSessionToDatastore();
      advanceProgress();
      setProgress(100);
      finishFinalAndRedirect();
    },
  },
});
