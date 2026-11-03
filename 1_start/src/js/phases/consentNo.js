/*
################### Abbruch ohne Einwilligung ###################
*/

const consentNoText = `
  <header><h2>Teilnahme beendet</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl">
      <p>Vielen Dank für Ihr Interesse. Ohne Einwilligung setzen wir die Studie nicht fort.</p>
      <p>Sie können dieses Fenster jetzt schließen.</p>
    </div>
  </main>
  `;

const ConsentNo_htmlScreen = new lab.html.Screen({
  title: "ConsentNo",
  tardy: true,
  skip: "${ study.state.consent == 1 }",
  content: consentNoText,
  messageHandlers: {
    run: () => {
      setProgress(100);
      if (isJatosAvailable()) {
        try {
          jatos.endStudy(false, "keine Einwilligung");
        } catch (err) {
          console.warn("endStudy failed:", err);
        }
      }
    },
  },
});
