const study = new lab.flow.Sequence({
  metadata: {
    title: "Clean Energy Valley – CAM-Studie (Teil 3: Zwischen Teil)",
    description:
      "Dank nach CAM1 und Überleitung zur zweiten CAM; Session (CAM_t1, teilnehmer_code) wird durchgereicht.",
    contributors: "Universität Leipzig / study programmed by Julius Fenn",
  },
  plugins: [
    // kein Metadata-Plugin (Datensparsamkeit)
  ],
  content: [
    DankeCam1_htmlForm,
    UeberleitungCam2_htmlForm,
  ],
});

if (isJatosAvailable()) {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
