/*
################### Willkommen ###################
*/

const welcomeText = pageTemplate({
  title: "Willkommen",
  body: `
      <p>Herzlichen Dank, dass Sie sich die Zeit für diese Studie nehmen. Das ist für uns sehr wertvoll und Sie tragen damit dazu bei, dass die verschiedenen Perspektiven in der Region berücksichtigt werden können.</p>
      <p>Diese Online-Studie wird von <strong>Meike Fienitz</strong> und <strong>Janna Hilker</strong> (Leibniz-Zentrum für Agrarlandschaftsforschung, ZALF) gemeinsam mit Kolleginnen der Humboldt-Universität zu Berlin und der Universität Leipzig im Projekt <strong>KoReGio</strong> durchgeführt. KoReGio beschäftigt sich mit verschiedenen Perspektiven auf Regionalentwicklung, insbesondere im Kontext von Energiewende und Klimaneutralität.</p>
      <p>Untersuchungsregion ist der <strong>Kreis Dithmarschen</strong> (Schleswig-Holstein) im Rahmen der Initiative <strong>Clean Energy Valley</strong>. Uns interessieren die Vielfalt der Perspektiven: Was ist aus Ihrer Sicht wichtig? Welche Chancen und Herausforderungen sehen Sie?</p>
      <p>Ihre Sichtweise fließt in eine wissenschaftliche Auswertung ein und unterstützt den Austausch in den Arbeitsgruppen.</p>
    `,
  formId: "form-welcome",
  button: "Weiter &rarr;",
});

const Welcome_htmlForm = new lab.html.Form({
  title: "Welcome",
  content: welcomeText,
  messageHandlers: {
    commit: () => {
      study.options.datastore.set("session_id", sessionId);
      advanceProgress();
    },
  },
});
