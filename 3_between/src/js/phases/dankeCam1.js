/*
################### Danke nach erster CAM ###################
Kurz motivierend; keine Fragen. Session: CAM_t1 unangetastet.
*/

const dankeCam1Text = pageTemplate({
  title: "Herzlichen Dank",
  body: `
      <p>Vielen Dank, dass Sie Ihre erste Cognitive-Affective Map zu <strong>klimaneutrale Regionalentwicklung</strong> gezeichnet haben.</p>
      <p>Ihre Einschätzung hilft uns, Gemeinsamkeiten und Spannungsfelder in der Region sichtbar zu machen — als Nächstes geht es mit einer zweiten Map weiter.</p>
    `,
  formId: "form-danke-cam1",
  button: BTN_NEXT,
});

const DankeCam1_htmlForm = new lab.html.Form({
  title: "DankeCam1",
  content: dankeCam1Text,
  messageHandlers: {
    run: () => {
      syncSessionToDatastore();
    },
    commit: () => {
      syncSessionToDatastore();
      advanceProgress();
    },
  },
});
