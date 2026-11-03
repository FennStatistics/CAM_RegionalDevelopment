/*
################### Was sind CAMs? ###################
*/

const camsText = pageTemplate({
  title: "Was sind Cognitive-Affective Maps?",
  body: `
      <p>Eine <strong>Cognitive-Affective Map (CAM)</strong> – auf Deutsch etwa eine kognitiv-affektive Karte – macht sichtbar, wie Sie ein Thema sehen und bewerten. Die Methode ähnelt dem Mindmapping und ist nicht kompliziert: Wir führen Sie Schritt für Schritt.</p>
      <p>In der Mitte steht das Thema <strong>klimaneutrale Regionalentwicklung</strong>. Drumherum fügen Sie <strong>Konzepte</strong> ein – Themen, Aspekte, Projekte oder Akteure, die Ihnen dazu relevant erscheinen. Das ist subjektiv: Es gibt kein „richtig“ oder „falsch“.</p>
      <ul>
        <li><strong>Bewertung (Valenz):</strong> Grün (positiv), rot (negativ), gelb (neutral) oder lila (ambivalent – beides zugleich). Für positiv und negativ gibt es jeweils drei Abstufungen (ein bisschen, ziemlich, sehr), dargestellt über die Stärke der Umrandung.</li>
        <li><strong>Verbindungen:</strong> Durchgezogene Linien bedeuten unterstützende / fördernde Zusammenhänge, gestrichelte Linien hemmende / störende. Mit Pfeilspitze wirkt die Verbindung nur in eine Richtung; ohne Pfeil in beide Richtungen.</li>
      </ul>
      <p>Im nächsten Teil erstellen Sie Ihre erste CAM. Alles lässt sich jederzeit ändern, verschieben oder löschen – so lange, bis Ihre Sicht gut dargestellt ist.</p>
    `,
  formId: "form-cams",
  button: BTN_NEXT,
});

const Cams_htmlForm = new lab.html.Form({
  title: "Cams",
  content: camsText,
  messageHandlers: {
    commit: () => {
      advanceProgress();
    },
  },
});
