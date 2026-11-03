/* number of components / elements to set slider */
const numElements = 13; // 8+5
var numElementsCounter = 0; // 8
/* general global variables */
var URLparams_global;

var paracountclicks = 0;

/* 
################### randomly choose type of robot ###################
*/

function shuffleArray(array) {
  let array_emp = []
  for (var i = 0; i < array.length; i++) {
    array_emp.push(i)
  }

  let j, x;
  for (i = array_emp.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array_emp[i];
    array_emp[i] = array_emp[j];
    array_emp[j] = x;
  }
  return array_emp;
}



const typeRobot = ["Rettungsroboter", "sozialer Assistenzroboter"]; // ["rescue robots", "Socially assistive robots"];
const indexTypeRobot = shuffleArray(typeRobot);
var choosenRobot = typeRobot[indexTypeRobot[0]];

/*
var firstIndex = [];
for (i = 0; i < 10000; i++) {
  firstIndex.push(shuffleArray(typeRobot)[0]);
}
let sum = firstIndex.reduce((a, b) => a + b, 0);
let mean = sum / firstIndex.length;
console.log(mean);
*/

/* 
################### introduction phase ###################
*/
const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: textObj.greetings,
  messageHandlers: {
    run: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        if (
          study.state.meta.screen_height < 700 &&
          study.state.meta.screen_width < 1200
        ) {
          alert(
            "It seems that your screen size you are using is smaller than 1200x700 pixels (height x width):\n" +
            "> your screen width: " +
            study.state.meta.screen_width +
            " your screen height: " +
            study.state.meta.screen_height +
            "\nStudy is aborted!"
          );
          jatos.abortStudy("study aborted - screen to small");
        }
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // get URL params
      if (typeof jatos.jQuery === "function") {
        URLparams_global = jatos.urlQueryParameters;
        console.log("URLparams_global:", URLparams_global);

        // check if a robot is provided via URL parameter
        if (typeof URLparams_global.fixRobot !== "undefined") {
          choosenRobot = URLparams_global.fixRobot;
        }

        // check if a prolific ID is provided via URL parameter PROLIFIC study
        if (typeof URLparams_global.PROLIFIC_PID === "undefined") {
          alert(
            "Sorry, there may be a technical error! It was not possible to obtain all the necessary data from prolific. Please write to the study director that an error has occurred."
          );
          jatos.abortStudy("study aborted - no prolific ID");
        } else {
          // save prolific ID
          study.options.datastore.set(
            "PROLIFIC_PID",
            URLparams_global.PROLIFIC_PID
          );
          // save random choosen robot
          study.options.datastore.set(
            "choosen_Robot",
            choosenRobot
          );
        }
      }
    },
  },
});


const InformCon_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: textObj.informCon,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS first time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const InformConsentNO_htmlForm = new lab.html.Form({
  title: "InformedConsentNO",
  content: textObj.informConNo,
  tardy: true,
  skip: "${ study.state.dummy_informedconsent == 1}",
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      document.querySelector(".progress-bar").style.width = 100 + "%";
    },
  },
});


const ExclusionCriteria_htmlForm = new lab.html.Form({
  title: "ExclusionCriteria",
  content: textObj.exclusionCriteria,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});



// Attention Check (not used)
function continueornot() {
  if ($("fieldset :checkbox:checked").length > 0) {
    // ok
    return true;
  } else {
    alert("Please check at least one of these activities.");
    return false;
  }
}

const AttentionCheck_htmlForm = new lab.html.Form({
  title: "AttentionCheck",
  content: textObj.attentionCheck,
  messageHandlers: {
    commit: () => {
      var attCheck_array = [];
      $("fieldset :checkbox").each(function () {
        if (this.checked) {
          attCheck_array.push(this.id);
        }
      });
      attCheck_array;

      study.options.datastore.set("attCheck_array", attCheck_array);
      study.options.datastore.set(
        "attCheck_text",
        $("#attCheck_OtherText").val()
      );

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: textObj.setupStudy,
  messageHandlers: {
    run: () => {
      if(choosenRobot === "Rettungsroboter"){
      $("#placeholderRobot").text(choosenRobot);
      $("#placeholderRobot2").text(choosenRobot);
      }else{
        $("#placeholderRobot").text("sozialen Assistenzroboter");
        $("#placeholderRobot2").text("sozialen Assistenzroboter");
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

        if (typeof jatos.jQuery === "function") {
          // If JATOS is available, send data there
          var resultJson = study.options.datastore.exportJson();
          console.log("result data sent to JATOS second time");
          jatos
            .submitResultData(resultJson)
            .then(() => console.log("success"))
            .catch(() => console.log("error"));
        }
    },
  },
});




// 

/* 
explenations soft robot
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
      if (choosenRobot === "Rettungsroboter") {
        $("#placeholderText1").text("Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von Rettungsrobotern bei Such- und Rettungseinsätzen ein?");
        $("#placeholderText2").text("Rettungsroboter sind eine neue Art von Robotern, die entwickelt wurde, um Menschen in Katastrophensituationen (Erdbeben, eingestürzte Gebäude, kontaminierte Gebiete, etc.) zu suchen und zu retten. Rettungsroboter, wie Drohnen und Bodenroboter, können in gefährlichen und kontaminierten Bereichen operieren, die für menschliche Rettungskräfte anderweitig unzugänglich wären. Indem sie Aufgaben wie die visuelle Inspektion beschädigter Strukturen, die Suche nach Opfern, das Erstellen von Karten des betroffenen Gebiets, das Räumen von Trümmern, die Bereitstellung lebenswichtiger Versorgungsgüter und die autonome Unterstützung bei der Rettung von Opfern übernehmen, können diese Roboter die Effizienz und Wirksamkeit von Rettungseinsätzen verbessern.");
        $("#placeholderText3").text("Da Rettungsroboter noch in der Entwicklungsphase sind, ist es wichtig, ethische Aspekte (= Vorteile und Nachteile) von Rettungsrobotern zu berücksichtigen.");
      } else {
        $("#placeholderText1").text("Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von sozialen Assistenzrobotern in Therapie, Altenpflege, Bildung oder als soziale Begleiter ein?");
        $("#placeholderText2").text("Soziale Assistenzroboter werden zunehmend in sozialen Kontexten, wie Therapie, Altenpflege, Bildung oder als soziale Begleiter eingesetzt. Sie sind darauf ausgerichtet, menschlichen Benutzern durch soziale Interaktion Unterstützung zu bieten. Das Ziel von sozialen Assistenzrobotern besteht darin, enge und effektive Verbindungen sowie Interaktionen mit menschlichen Benutzern zu schaffen, um Rehabilitation und Lernen zu fördern sowie Gesellschaft für diejenigen zu bieten, die isoliert sind.");
        $("#placeholderText3").text("Da sich soziale Assistenzroboter noch in der Entwicklungsphase befinden, ist es wichtig, ethischen Aspekte (= Vorteile und Nachteile) von sozialen Assistenzrobotern zu berücksichtigen.");
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
            if (choosenRobot === "Rettungsroboter") {
              $("#placeholderText1").text("Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von Rettungsrobotern bei Such- und Rettungseinsätzen ein?");
              $("#placeholderText2").html(`
              Mögliche <b>Vorteile</b> von Rettungsrobotern könnten sein:
              <br>
              <ul>
  <li>Zugang zu Bereichen, die für menschliche Rettungskräfte unerreichbar oder zu gefährlich sind</li>
  <li>Zuverlässige Leistung, insbesondere für Aufgaben, die Präzision und Genauigkeit erfordern</li>
  <li>Autonome Rettungsfähigkeiten, die es Robotern ermöglichen, Opfer zu bergen und in Sicherheit zu bringen</li>
</ul>
              `);
              $("#placeholderText3").html(`
              Mögliche <b>Nachteile</b> von Rettungsrobotern könnten sein:
              <br>
              <ul>
              <li>Algorithmen, die die Rettungsroboter leiten, könnten voreingenommen sein und zu ungerechten oder diskriminierenden Ergebnissen führen, insbesondere in Bezug darauf, wo Rettungsbemühungen konzentriert werden sollen und wen man zuerst suchen und bergen sollte</li>
              <li>Das Maß an Autonomie von Rettungsrobotern in Such- und Rettungsaktionen könnte die Frage aufwerfen, ob die Fernsteuerung von Roboteroperationen in prekären Situationen der vollständigen Autonomie vorzuziehen ist</li>
              <li>Rettungsroboter könnten missbraucht werden, insbesondere im Krieg</li>
            </ul>
              `);
            } else {
              $("#placeholderText1").text("Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von sozialen Assistenzrobotern in Therapie, Altenpflege, Bildung oder als soziale Begleiter ein?");
              $("#placeholderText2").html(`
              Mögliche <b>Vorteile</b> von sozialen Assistenzrobotern könnten sein:
              <br>
              <ul>
              <li>Interaktion mit sozial isolierten oder wenig sozial vernetzten Personen, wie beispielsweise ältere Menschen</li>
              <li>Förderung sozialer Interaktion im therapeutischen Setting, beispielsweise als Begleiter für Menschen mit Autismus, um die Emotionserkennung und zwischenmenschlichen Kommunikationsfähigkeiten zu verbessern</li>
              <li>Unterstützung bei Bildungsaktivitäten und Lernen, insbesondere für Kinder mit besonderen Bedürfnissen oder Lernschwierigkeiten</li>
            </ul>
              `);
              $("#placeholderText3").html(`
              Mögliche <b>Nachteile</b> von sozialen Assistenzrobotern könnten sein:
              <br>
              <ul>
              <li>Benutzer*innen könnten eine Abhängigkeit von sozialen Assistenzrobotern entwickeln</li>
              <li>Die Verwendung von sozialen Assistenzrobotern könnte zu Arbeitslosigkeit führen, da Roboter möglicherweise Menschen am Arbeitsplatz ersetzen (zum Beispiel als Therapeut*innen)</li>
              <li>Mensch-Roboter-Interaktionen könnten menschliche Interaktionen beeinflussen, da der Umgang mit Robotern unsere Erwartungen, Verhaltensweisen und Wahrnehmungen in sozialen Umgebungen formen könnten</li>
            </ul>
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



const explanationSR3_htmlForm = new lab.html.Form({
  title: "explanationSR3",
  content: textObj.explanationSR3,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        10000 // 10000 (10 seconds)
      );
            // change text
            if (choosenRobot === "Rettungsroboter") {
              $("#placeholderText1").text("Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von Rettungsrobotern bei Such- und Rettungseinsätzen ein?");
              $("#placeholderText2").html(`
              Die Entwicklung von Rettungsrobotern befindet sich derzeit noch in den Anfängen. Sie können zur Entwicklung ethisch sicherer Roboter für Such- und Rettungsmissionen beitragen. 
              Dafür möchten wir Ihre Einstellungen und Gefühle zu Rettungsrobotern herausfinden. Zu diesem Zweck haben wir Ihnen die zentralen Konzepte "Rettungsroboter", "Vorteile" und "Nachteile" im Zentrum Ihrer Mind-Map vordefiniert. 
              Von diesen vorgegebenen Konzepten kann nur die emotionale Bewertung und nicht der Text geändert werden. 
              Im Folgenden bitten wir Sie, Ihre Gedanken und Gefühle hinsichtlich der Frage 
              <b>Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von Rettungsrobotern bei Such- und Rettungseinsätzen ein?</b> in Ihrer Mind-Map zu zeichnen. 
              Dafür sollen Sie alle Vorteile und Nachteile, die Ihnen bezüglich Rettungsrobotern einfallen, um vorgegebenen Konzepte "Rettungsroboter", "Vorteile" und "Nachteile" herumzeichnen. Die anfängliche Mind-Map sieht so aus:               
              `);
              $("#placeholderText3").html(`
              <b>Wichtig:</b> Durch Ändern der emotionalen Bewertung des zentralen Konzepts "Rettungsroboter" können Sie angeben, ob Sie Rettungsroboter insgesamt als negativ, neutral oder positiv wahrnehmen. 
              Sie können das Kommentarfeld verwenden, um weitere Erläuterungen zu Ihren gezeichneten Konzepten zu schreiben.
              `);
              // change picture
              $('#changePic1').attr('src', 'pre_CAM/static/CAMscenariotext/default_Rettungsroboter.JPG');
            } else {
              $("#placeholderText1").text("Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von sozialen Assistenzrobotern in Therapie, Altenpflege, Bildung oder als soziale Begleiter ein?");
              $("#placeholderText2").html(`
              Die Entwicklung von sozialen Assistenzrobotern befindet sich derzeit noch in den Anfängen. Sie können zur Entwicklung ethisch sicherer sozialer Assistenzroboter beitragen. 
              Dafür möchten wir Ihre Einstellungen und Gefühle zu sozialen Assistenzrobotern herausfinden. Zu diesem Zweck haben wir Ihnen die zentralen Konzepte "sozialer Assistenzroboter", "Vorteile" und "Nachteile" im Zentrum Ihrer Mind-Map vordefiniert. 
              Von diesen vorgegebenen Konzepten kann nur die emotionale Bewertung und nicht der Text geändert werden. 
              Im Folgenden bitten wir Sie, Ihre Gedanken und Gefühle hinsichtlich der Frage 
              <b>Welche Vorteile und Nachteile fallen Ihnen bezüglich des Einsatzes von sozialen Assistenzrobotern in Therapie, Altenpflege, Bildung oder als soziale Begleiter ein?</b> in Ihrer Mind-Map zu zeichnen. 
              Dafür sollen Sie alle Vorteile und Nachteile, die Ihnen bezüglich sozialer Assistenzroboter einfallen, um die vorgegebenen Konzepte "sozialer Assistenzroboter", "Vorteile" und "Nachteile" herumzeichnen. Die anfängliche Mind-Map sieht so aus: 
              `);
              $("#placeholderText3").html(`
              <b>Wichtig:</b> Durch Ändern der emotionalen Bewertung des zentralen Konzepts "sozialer Assistenzroboter" können Sie angeben, ob Sie soziale Assistenzroboter insgesamt als negativ, neutral oder positiv wahrnehmen. 
              Sie können das Kommentarfeld verwenden, um weitere Erläuterungen zu Ihren gezeichneten Konzepten zu schreiben.
              `);
              // change picture
              $('#changePic1').attr('src', 'pre_CAM/static/CAMscenariotext/default_sozialenAssistenzroboter.JPG');
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

        // save PROLIFIC_PID and choosen robot for next session
        var studySessionData = {
          "choosen_Robot": study.options.datastore.get("choosen_Robot"),
          "PROLIFIC_PID": study.options.datastore.get("PROLIFIC_PID")
      };
      jatos.setStudySessionData(studySessionData);
      console.log(studySessionData);
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
    new lab.plugins.Metadata(),
    //new lab.plugins.Fullscreen(),
    //new lab.plugins.Debug(), // comment out finally
    // new lab.plugins.Download()
  ],
  content: [ 
    explanationSR1_htmlForm,
    explanationSR2_htmlForm,
    explanationSR3_htmlForm,     // -> next session
    // >>> PRE
    Greetings_htmlForm,

    InformCon_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    //AttentionCheck_htmlForm,
    SetupStudy_htmlForm,

    CAMinst_multipage_htmlScreen,
    /**/
    explanationSR1_htmlForm,
    explanationSR2_htmlForm,
    explanationSR3_htmlForm     // -> next session
  ],
});

// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
