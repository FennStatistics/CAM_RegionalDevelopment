const study = new lab.flow.Sequence({
  metadata: {
    title: "Clean Energy Valley – CAM-Studie (Teil 5: Abschluss)",
    description:
      "Delta-Feedback CAM1 vs. CAM2, Interview-Platzhalter und Studienende mit Redirect.",
    contributors: "Universität Leipzig / study programmed by Julius Fenn",
  },
  plugins: [
    // kein Metadata-Plugin (Datensparsamkeit)
  ],
  content: [
    DeltaFeedback_htmlForm,
    Interview_htmlForm,
    Thanks_htmlForm,
  ],
});

if (isJatosAvailable()) {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
