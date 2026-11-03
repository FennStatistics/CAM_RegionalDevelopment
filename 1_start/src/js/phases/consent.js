/*
################### Informierte Einwilligung ###################
Speichert: consent (Formular), einwilligung (boolean), datenschutz_version.
Vor Einwilligung wird nichts an JATOS gesendet.
*/

const consentText = pageTemplate({
  title: "Informierte Einwilligung",
  // TODO(Leipzig): finaler Einwilligungstext und datenschutz_version freigeben
  body: `
      <p><em>Arbeitsentwurf — rechtliche Freigabe ausstehend (TODO(Leipzig)).</em></p>
      <ul>
        <li>Die Studie zur klimaneutralen Regionalentwicklung (Clean Energy Valley / Dithmarschen) wird von <strong>Meike Fienitz</strong> und <strong>Janna Hilker</strong> (ZALF) gemeinsam mit Partnerinnen der Humboldt-Universität zu Berlin und der Universität Leipzig im Projekt <strong>KoReGio</strong> durchgeführt.</li>
        <li>Verantwortlich für die Online-Komponente dieser Studie ist vorläufig die <strong>Universität Leipzig</strong> (Entwurf).
          <span class="text-muted">TODO(Leipzig): Verantwortliche Stelle / Datenschutz-Verantwortlichkeit final klären (Uni Leipzig vs. Projektpartner).</span></li>
        <li>Ihre Antworten und Cognitive-Affective Maps werden für die Auswertung gespeichert. Die Online-Komponente vermeidet unnötige Personenmerkmale.</li>
        <li>Es gibt <strong>kein Tracking</strong> und keine Analyse-Cookies von Drittanbietern. Alle Inhalte werden lokal ausgeliefert.</li>
        <li>Die Teilnahme ist <strong>freiwillig</strong>. Sie können jederzeit abbrechen. Ohne Einwilligung endet die Studie hier.</li>
      </ul>
      <p class="text-muted">Datenschutz-Version (Entwurf): <code>${DATENSCHUTZ_VERSION}</code></p>
    `,
  formId: "form-consent",
  formContent: radioGroup("consent", "Sind Sie einverstanden?", [
    ["1", "Ja, ich bin einverstanden und möchte teilnehmen."],
    ["0", "Nein, ich bin nicht einverstanden."],
  ]),
  button: BTN_NEXT,
});

const Consent_htmlForm = new lab.html.Form({
  title: "Consent",
  content: consentText,
  messageHandlers: {
    // function (keine Arrow-Funktion), damit this.data.consent verfügbar ist
    commit: function () {
      const einwilligung = String(this.data && this.data.consent) === "1";
      study.options.datastore.set("einwilligung", einwilligung);
      study.options.datastore.set("datenschutz_version", DATENSCHUTZ_VERSION);
      advanceProgress();
      if (einwilligung) {
        saveToJatos();
      }
    },
  },
});
