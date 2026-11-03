/*
################### Teilnehmer-Code (nur Administration) ###################
Zufällige ID aus Kleinbuchstaben und Ziffern (8 Zeichen) — sichtbar für die Leitung,
damit Online-Durchlauf und Interview zuordenbar sind.
*/

const adminIdText = pageTemplate({
  title: "Teilnehmer-Code",
  body: `
      <p class="admin-hinweis"><strong>Nur für die Administration</strong> — bitte notieren Sie den Code, bevor Sie fortfahren. Teilnehmende benötigen ihn nicht selbst.</p>
      <div class="code-display" id="teilnehmer-code-anzeige" aria-live="polite">${escapeHtml(teilnehmerCode)}</div>
      <p class="text-muted">Der Code wird mit den Studiendaten gespeichert und an die folgenden Teile weitergegeben.</p>
    `,
  formId: "form-admin-id",
  button: "Weiter &rarr;",
});

const AdminId_htmlForm = new lab.html.Form({
  title: "AdminId",
  content: adminIdText,
  messageHandlers: {
    commit: () => {
      study.options.datastore.set("teilnehmer_code", teilnehmerCode);
      // kein advanceProgress — Admin-Seite zählt nicht zum Teilnehmer-Fortschritt
    },
  },
});
