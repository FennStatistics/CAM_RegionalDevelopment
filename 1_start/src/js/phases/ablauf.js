/*
################### Was passiert ###################
*/

const ablaufText = pageTemplate({
  title: "Was passiert in dieser Studie?",
  body: `
      <p>Die Online-Studie besteht aus <strong>fünf Teilen</strong>:</p>
      <ol>
        <li><strong>Einführung und Einwilligung</strong> (dieser Teil)</li>
        <li><strong>Erste Cognitive-Affective Map (CAM)</strong> – Sie erstellen eine Karte Ihrer Sicht auf die klimaneutrale Regionalentwicklung</li>
        <li><strong>Kurze Zwischenfragen</strong></li>
        <li><strong>Zweite CAM</strong> – Sie überarbeiten Ihre Karte und beziehen zusätzliche Konzepte ein</li>
        <li><strong>Rückmeldung und Abschluss</strong> – kurze Zusammenfassung der Veränderungen und Hinweise zum weiteren Verlauf</li>
      </ol>
      <div class="infobox">
        <p class="text-muted" style="margin:0"><strong>Hinweis zur Dauer:</strong> TODO(Leipzig): genaue Gesamtdauer bzw. Zeitangabe je Teil festlegen.</p>
      </div>
    `,
  formId: "form-ablauf",
  button: BTN_NEXT,
});

const Ablauf_htmlForm = new lab.html.Form({
  title: "Ablauf",
  content: ablaufText,
  messageHandlers: {
    commit: () => {
      advanceProgress();
    },
  },
});
