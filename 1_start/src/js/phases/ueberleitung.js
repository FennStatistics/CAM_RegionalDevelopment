/*
################### Überleitung zu Teil 2 (erste CAM) ###################
Multi-Component: speichern → studySessionData → startNextComponent()
*/

const ueberleitungText = pageTemplate({
  title: "Weiter zur ersten CAM",
  body: `
      <p>Als Nächstes erstellen Sie Ihre erste <strong>Cognitive-Affective Map</strong>. In der Mitte steht bereits <strong>klimaneutrale Regionalentwicklung</strong> – bezogen auf den <strong>Kreis Dithmarschen</strong>.</p>
      <p>Fügen Sie weitere Themen, Aspekte oder Projekte hinzu, die Sie damit verbinden. Per Doppelklick können Sie neue Felder anlegen; alles lässt sich ändern, verschieben oder löschen. Kommentieren Sie gerne, was Sie zeichnen und warum – das hilft, Ihre Map besser zu verstehen.</p>
      <p>Nehmen Sie sich Zeit und gehen Sie von Ihrer eigenen Einschätzung aus.</p>
      <div id="lokal-hinweis" class="hinweis-lokal" hidden>
        <strong>Lokaler Test:</strong> In JATOS würde jetzt der nächste Studienteil starten
        (<code>jatos.startNextComponent()</code>). Ohne JATOS endet Teil&nbsp;1 hier.
      </div>
    `,
  formId: "form-ueberleitung",
  button: "Zur ersten CAM &rarr;",
});

const Ueberleitung_htmlForm = new lab.html.Form({
  title: "Ueberleitung",
  tardy: true,
  skip: "${ study.state.consent != 1 }",
  content: ueberleitungText,
  messageHandlers: {
    run: () => {
      if (!isJatosAvailable()) {
        const el = document.getElementById("lokal-hinweis");
        if (el) el.hidden = false;
      }
    },
    commit: () => {
      advanceProgress();
      setProgress(100);
      finishComponentAndContinue();
    },
  },
});
