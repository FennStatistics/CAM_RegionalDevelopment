/* number of components / elements to set slider */
const numElements = 13; // 8+5
var numElementsCounter = 5;



const break500 = new lab.html.Screen({
  content: `
  `,
  timeout: 500
})


/* 
################### update soft robot ###################
*/
const explanationSR1_htmlForm = new lab.html.Form({
  title: "explanationSR1",
  content: textObj.explanationSR1,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        5000 // 10000 (10 seconds)
      );


      // change text
      if (jatos.studySessionData.choosen_Robot === "Rettungsroboter") { // !!! jatos.studySessionData.choosen_Robot
        $("#placeholderText1").html(`
        Derzeit zeigt sich ein Trend hin zur Verwendung sogenannter <b>softer Roboter</b> bei Such- und Rettungsmissionen. Soft-Roboter sind eine neuartige Roboterklasse, die häufig von den Eigenschaften lebender Organismen, 
        wie Tieren, inspiriert sind. Im Gegensatz zu anderen Robotern, die in der Regel aus harten Materialien wie Metall oder Hartplastik bestehen, enthalten Soft-Roboter normalerweise keine elektronischen 
        Teile und bestehen aus flexiblen, weichen Materialien wie Silikon. Sie nehmen oft natürliche Formen an und können sich biegen, drehen und dehnen, ähnlich wie lebende Organismen, beispielsweise Schlangen oder Kraken.
                    `);
        $("#placeholderText2").html(`
        Ein Beispiel für einen soften Rettungsroboter ist der 20 Meter lange RoBoa der ETH Zürich. Dieser Roboter ist eine Hybridkonstruktion, die einen weichen Körper mit einer kameragestützten Kopfmontage kombiniert. 
        Durch sein schlangenähnliches Design kann er sich durch enge Räume bewegen und instabile Ruinen navigieren. RoBoa kann Opfer erkennen und Wasser sowie flüssige Nahrung durch ein Pumpsystem liefern. 
        Obwohl er mit künstlicher Intelligenz für autonome Navigation ausgestattet werden könnte, wird er aktuell noch ferngesteuert.
                    `);
      } else {
        $("#placeholderText1").html(`
        Derzeit zeigt sich ein Trend hin zur Verwendung sogenannter <b>softer Roboter</b> für soziale Assistenzaufgaben. 
        Soft-Roboter sind eine neuartige Roboterklasse, die häufig von den Eigenschaften lebender Organismen, wie Tieren, inspiriert sind. 
        Im Gegensatz zu anderen Robotern, die in der Regel aus harten Materialien wie Metall oder Hartplastik bestehen, enthalten Soft-Roboter normalerweise keine elektronischen Teile und bestehen aus flexiblen, weichen Materialien wie Silikon. 
        Sie nehmen oft natürliche Formen an und können sich biegen, drehen und dehnen, ähnlich wie lebende Organismen, beispielsweise Schlangen oder Kraken.
                    `);
        $("#placeholderText2").html(`
        Ein Beispiel für einen soften sozialen Assistenzroboter ist Paro. Dieser Roboter wird sowohl in Pflegeheimen als auch in therapeutischen Kontexten eingesetzt. 
        Paro sieht aus wie eine kleine Robbe mit weichem, weißem Kunstfell und hat die Fähigkeit, menschliche Emotionen wahrzunehmen, auf sie zu reagieren und auch auszudrücken. 
        Er reagiert beispielsweise auf Streicheleinheiten, indem er seinen Schwanz bewegt und seine Augen öffnet/schließt.
                    `);
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // alert(numElementsCounter)
    }
  },
});


const explanationSR2_htmlForm = new lab.html.Form({
  title: "explanationSR2",
  content: textObj.explanationSR2,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        10000 // 10000 (10 seconds)
      );

      // change text
      if (jatos.studySessionData.choosen_Robot === "Rettungsroboter") { // !!! jatos.studySessionData.choosen_Robot
        $("#placeholderText1").html(`
                    Mögliche <b>Vorteile</b> von <u>soften</u> Rettungsrobotern könnten sein:
                    <br>
                    <ul>
                    <li>Zugang zu Bereichen, die für menschliche Rettungskräfte unerreichbar oder zu gefährlich sind</li>
                    <li>Lieferung lebenswichtiger Versorgungsgüter (Wasser, Nahrung, Medizin) bis Opfer sicher geborgen sind</li>
                    <li>Verminderung des Verletzungsrisikos für Opfer aufgrund ihrer Flexibilität und Anpassungsfähigkeit</li>
                  </ul>
                    `);
        $("#placeholderText2").html(`
        Mögliche <b>Nachteile</b> von <u>soften</u> Rettungsrobotern könnten sein:
                    <br>
                    <ul>
                    <li>Die weiche und anpassungsfähige Natur von soften Robotern könnte potenziell dazu führen, dass der Roboter in gefährlichen Umgebungen beschädigt wird</li>
                    <li>Algorithmen, die die soften Rettungsroboter leiten, könnten voreingenommen sein und zu ungerechten oder diskriminierenden Ergebnissen führen, insbesondere in Bezug darauf, wo Rettungsbemühungen konzentriert werden sollen und wen man zuerst suchen und bergen sollte</li>
                    <li>Durch ihre Flexibilität könnten softe Rettungsroboter möglicherweise weniger präzise in bestimmten Aufgaben agieren, die eine hohe Genauigkeit erfordern</li>
                  </ul>
                  <br>
                  <br>
                  Nachdem Sie die Informationen über <b>softe Rettungsroboter</b> gelesen haben, möchten wir Sie im Folgenden bitten, Ihre Mind-Map anzupassen. Sie können neue Vorteile und Nachteile hinzufügen oder bereits gezeichnete Konzepte löschen. 
                    `);
      } else {
        $("#placeholderText1").html(`
                    Mögliche <b>Vorteile</b> von <u>soften</u> sozialen Assistenzrobotern könnten sein:
                    <br>
                    <ul>
                    <li>Geringeres Verletzungsrisiko bei physischen Interaktionen aufgrund ihrer Weichheit</li>
                    <li>Förderung sozialer Interaktion im therapeutischen Setting, beispielsweise als Begleiter für Menschen mit Autismus, um die Emotionserkennung und zwischenmenschlichen Kommunikationsfähigkeiten zu verbessern</li>
                    <li>Natürliche und intuitive Interaktion mit Menschen, da die weiche Struktur und Flexibilität von soften sozialen Assistenzrobotern menschenähnliche Bewegungen und Reaktionen ermöglichen kann</li>
                  </ul>
                    `);
        $("#placeholderText2").html(`
        Mögliche <b>Nachteile</b> von <u>soften</u> sozialen Assistenzrobotern könnten sein:
                    <br>
                    <ul>
                    <li>Emotionale Abhängigkeit aufgrund der lebensähnlichen Eigenschaften von soften Robotern, was potenziell zu einer Einschränkung der Beteiligung an menschlichen Interaktionen führen könnte</li>
                    <li>Mensch-Roboter-Interaktionen könnten menschliche Interaktionen beeinflussen, da der Umgang mit Robotern unsere Erwartungen, Verhaltensweisen und Wahrnehmungen in sozialen Umgebungen formen können</li>
                    <li>Die Fähigkeit von soften sozialen Assistenzrobotern, emotionale Reaktionen hervorzurufen, könnte problematisch sein, wenn dies darauf abzielt, das Verhalten oder die Entscheidungen der Nutzer*innen zu beeinflussen</li>
                  </ul>
                  <br>
                  <br>
                  Nachdem Sie die Informationen über <b>softe soziale Assistenzroboter</b> gelesen haben, möchten wir Sie im Folgenden bitten, Ihre Mind-Map anzupassen. Sie können neue Vorteile und Nachteile hinzufügen oder bereits gezeichnete Konzepte löschen. 
                    `);
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // alert(numElementsCounter)
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time: ", resultJson);
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        jatos.startNextComponent();
      }
    },
  },
});


// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "S2 risk and benefits of soft robots",
    description: "S2 study",
    repository: "",
    contributors: "Julius Fenn, Louisa Estadieu",
  },
  plugins: [
    //new lab.plugins.Metadata(),
    //new lab.plugins.Debug(), // comment out finally
    //new lab.plugins.Download()
  ],
  content: [
    break500,
    CAMfeedbackGeneral_htmlForm,
    explanationSR1_htmlForm,
    explanationSR2_htmlForm
  ],
})

// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}