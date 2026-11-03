const study = new lab.flow.Sequence({
  metadata: {
    title: "Clean Energy Valley – CAM-Studie (Teil 1: Start)",
    description:
      "Willkommen, Ablauf, CAM-Erklärung und informierte Einwilligung vor der ersten Cognitive-Affective Map.",
    contributors: "Universität Leipzig / study programmed by Julius Fenn",
  },
  plugins: [
    // kein Metadata-Plugin (Datensparsamkeit)
  ],
  content: [
    AdminId_htmlForm, // Code nur für Administration
    Welcome_htmlForm,
    Ablauf_htmlForm,
    Cams_htmlForm,
    Consent_htmlForm,
    ConsentNo_htmlScreen, // nur ohne Einwilligung; beendet die Studie
    Ueberleitung_htmlForm,
  ],
});

if (isJatosAvailable()) {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
