/*
################### Interview-Platzhalter ###################
Qualitatives Interview folgt — Inhalt TODO(Leipzig).
*/

const interviewText = pageTemplate({
  title: "Qualitatives Interview",
  body: `
      <p>Im Anschluss an den Online-Teil folgt ein qualitatives Gespräch mit der Studienleitung (u.&nbsp;a. Meike Fienitz und Janna Hilker).</p>
      <p>Dort können Sie Ihre Map erläutern und wir sprechen über Perspektiven, Konflikt- und Kooperationspotenziale im Kontext klimaneutraler Regionalentwicklung in Dithmarschen. Die genauen Leitfragen und der Termin werden Ihnen separat mitgeteilt.</p>
      <p class="text-muted">TODO(Leipzig): Termin-/Ablaufhinweise für Teilnehmende finalisieren (Leitfragen bleiben im Interview, nicht online).</p>
    `,
  formId: "form-interview",
  button: BTN_NEXT,
});

const Interview_htmlForm = new lab.html.Form({
  title: "Interview",
  content: interviewText,
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
