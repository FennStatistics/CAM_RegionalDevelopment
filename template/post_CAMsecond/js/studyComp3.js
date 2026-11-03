const Required_Testing = true; // set to false for production

/* number of components / elements to set slider */
const numElements = 13; // 8+5
var numElementsCounter = 5;


const htmlForm = new lab.html.Form({
  content:
    `
    <header>
    <h2>
    Abschließend möchten wir Sie noch bitten, ein paar allgemeine Fragen zu beantworten.
    </h2>
    <br>
    <h3>
    Bitte beantworten Sie zuerst folgende Frage zu Ihrer angepassten <i>Mind-Map</i>:
    </h3>
  </header>
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
  <form id="page-form">
    Ihre angepasste <i>Mind-Map</i> hatte eine durchschnittliche emotionale Bewertung von 
    <span id="placeholder" style="font-weight: bold;">XXX</span>, diese war im Vergleich zu ihrer anfangs gezeichneten <i>Mind-Map</i> 
    (durchschnittliche emotionale Bewertung von <span id="placeholder_b" style="font-weight: bold;">XXX</span>) 
    <span id="placeholder2" style="font-weight: bold;">XXX</span>. Bitte erklären Sie, warum Sie diese 
    <span id="placeholder2_b" style="font-weight: bold;">XXX</span> wahrgenommen haben:
      <textarea rows="10" name="ans1" style="width: 100%;" placeholder="Schreiben Sie hier Ihre Antwort..." required></textarea>
    </div>
</main>
</form>

<footer class="content-vertical-center content-horizontal-right">
<button id="continue" type="submit" form="page-form">
Weiter &rarr;
</button>
</footer>
  `,
  messageHandlers: {
    run: function anonymous(){
      var meanDifference = jatos.studySessionData.meanvalence2 - jatos.studySessionData.meanvalence;

      // show mean values
      $("#placeholder").text(Number(jatos.studySessionData.meanvalence2.toFixed(2))); // post
      $("#placeholder_b").text(Number(jatos.studySessionData.meanvalence.toFixed(2))); // pre
      
      if(meanDifference < 0){
        $("#placeholder2").text("negativer");
        $("#placeholder2_b").text("negativer");
      }else if(meanDifference > 0){
        $("#placeholder2").text("positiver");
        $("#placeholder2_b").text("positiver");
      }else if(meanDifference == 0){
        $("#placeholder2").text("unverändert");
        $("#placeholder2_b").text("unverändert");
      }
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";
      }

  },
})

const htmlForm2 = new lab.html.Form({
  content:     `
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
  Your have drawn <span id="placeholder" style="font-weight: bold;">XXX</span> negative and <span id="placeholder2" style="font-weight: bold;">XXX</span> positive concepts. 
  Please explain why:
<form>
<textarea rows="10" name="ans2" style="width: 100%;" placeholder="Write your answer here..." required></textarea>
<br>
<button type="submit">Save</button>
</div>
</main>
</form>
`,
  messageHandlers: {
    run: function anonymous(){
      $("#placeholder").text(jatos.studySessionData.negativenodes.length);
      $("#placeholder2").text(jatos.studySessionData.positivenodes.length);     
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson2 = study.options.datastore.exportJson();
        if (typeof jatos.jQuery === "function") {
          console.log("my result data sent to JATOS first time: ", resultJson2);
          jatos.submitResultData(resultJson2)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
        }
      }
    }
  },
})


const htmlForm3 = new lab.html.Form({
  content:     `
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
    Sie haben die folgenden positiven Konzepte gezeichnet: 
    <div id="myListPos"></div>
    Sie haben die folgenden negativen Konzepte gezeichnet: 
    <div id="myListNeg"></div>
    <br>
    Bitte erklären Sie warum:
    <form id="page-form">
      <textarea rows="10" name="ans3" style="width: 100%;" placeholder="Schreiben Sie hier Ihre Antwort..." required></textarea>
      <br>
    </div>
</main>
</form>

<footer class="content-vertical-center content-horizontal-right">
<button id="continue" type="submit" form="page-form">
Weiter &rarr;
</button>
</footer>
`,
  messageHandlers: {
    run: function anonymous(){
      function arrToUl(root, arr) {
        var ul = document.createElement('ul');
        var li;
        
        root.appendChild(ul); // append the created ul to the root
      
        arr.forEach(function(item) {
          if (Array.isArray(item)) { // if it's an array
            arrToUl(li, item); // call arrToUl with the li as the root
            return;
          }
          
          li = document.createElement('li'); // create a new list item
          li.appendChild(document.createTextNode(item)); // append the text to the li
          ul.appendChild(li); // append the list item to the ul
        });
      }
      var divPos = document.getElementById('myListPos');
      var divNeg = document.getElementById('myListNeg');

      if(jatos.studySessionData.positivenodes.length > 0){
        var nodes = jatos.studySessionData.positivenodes;
        var ArrayText = [];
        nodes.forEach(node => {
          ArrayText.push(node.text);
        });

        arrToUl(divPos, ArrayText);
      }


      if(jatos.studySessionData.negativenodes.length > 0){
        var nodes = jatos.studySessionData.negativenodes;
        var ArrayText = [];
        nodes.forEach(node => {
          ArrayText.push(node.text);
        });

        arrToUl(divNeg, ArrayText);
      }
  
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson2 = study.options.datastore.exportJson();
        if (typeof jatos.jQuery === "function") {
          console.log("my result data sent to JATOS first time: ", resultJson2);
          jatos.submitResultData(resultJson2)
          .then(() => console.log('success'))
          .catch(() => console.log('error'));
        }
      }
    }
  },
})




const break500 = new lab.html.Screen({
  content: `
  `,
  timeout: 500
})


/* 
################### survey scales ###################
*/



// >>>  General Attitudes Towards Robots Scale (GAToRS)
const LikertGAToRS1_htmlForm = new lab.html.Page({
  title: "GAToRS 1",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Koverola.slice(0, 7),
      width: "7",
      anchors: [
        "Stimme überhaupt nicht zu",
        "Stimme nicht zu",
        "Stimme eher nicht zu",
        "Neutral",
        "Stimme eher zu",
        "Stimme zu",
        "Stimme voll und ganz zu"
      ],
      label:
        "Bitte lesen Sie die folgenden Aussagen und geben Sie basierend darauf an, inwieweit Sie jeder Aussage zustimmen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "GAToRS",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});



const LikertGAToRS2_htmlForm = new lab.html.Page({
  title: "GAToRS 2",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Koverola.slice(7, 14),
      width: "7",
      anchors: [
        "Stimme überhaupt nicht zu",
        "Stimme nicht zu",
        "Stimme eher nicht zu",
        "Neutral",
        "Stimme eher zu",
        "Stimme zu",
        "Stimme voll und ganz zu"
      ],
      label:
        "Bitte lesen Sie die folgenden Aussagen und geben Sie basierend darauf an, inwieweit Sie jeder Aussage zustimmen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "GAToRS",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


const LikertGAToRS3_htmlForm = new lab.html.Page({
  title: "GAToRS 3",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Koverola.slice(14, 20),
      width: "7",
      anchors: [
        "Stimme überhaupt nicht zu",
        "Stimme nicht zu",
        "Stimme eher nicht zu",
        "Neutral",
        "Stimme eher zu",
        "Stimme zu",
        "Stimme voll und ganz zu"
      ],
      label:
        "Bitte lesen Sie die folgenden Aussagen und geben Sie basierend darauf an, inwieweit Sie jeder Aussage zustimmen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "GAToRS",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});



const GAToRS_sequence = new lab.flow.Sequence({
  title: "GAToRS Sequence",
  shuffle: false,
  content: [
    LikertGAToRS1_htmlForm,
    LikertGAToRS2_htmlForm,
    LikertGAToRS3_htmlForm
  ],
});


// >>> Almere Model
const LikertAlmere_htmlForm = new lab.html.Page({
  title: "Almere",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Heerink,
      width: "5",
      anchors: [
        "Stimme überhaupt nicht zu",
        "Stimme nicht zu",
        "Weiß nicht",
        "Stimme zu",
        "Stimme voll und ganz zu"
      ],
      label:
        "Bitte lesen Sie die folgenden Aussagen und geben Sie basierend darauf an, inwieweit Sie jeder Aussage zustimmen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "Almere",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 50%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});




// >>> Li and Wang
const LikertLiWang_htmlForm = new lab.html.Page({
  title: "LiWang",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_LiWang,
      width: "7",
      anchors: [
        "Stimme überhaupt nicht zu",
        "Stimme nicht zu",
        "Stimme eher nicht zu",
        "Neutral",
        "Stimme eher zu",
        "Stimme zu",
        "Stimme voll und ganz zu"
      ],
      label:
        "Bitte lesen Sie die folgenden Aussagen und geben Sie basierend darauf an, inwieweit Sie jeder Aussage zustimmen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "LiWang",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 55%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 10%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 15%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


// >>> MDMT
const Likert_MDMT1_htmlForm = new lab.html.Page({
  title: "MDMT 1",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_MDMT.slice(0,8),
      width: "9",
      anchors: [
        "Überhaupt nicht 0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "Sehr 7",
        "Passt nicht"
      ],
      label: 'Bitte bewerten Sie den Roboter auf einer Skala von 0 (Überhaupt nicht) bis 7 (Sehr). Falls eine bestimmte Frage nicht zum Roboter zu passen scheint, wählen Sie bitte die Option, die aussagt "Passt nicht".',
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "MDMT",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
      <col style=\"width: 20%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
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


const Likert_MDMT2_htmlForm = new lab.html.Page({
  title: "MDMT 2",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_MDMT.slice(8,16),
      width: "9",
      anchors: [
        "Überhaupt nicht 0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "Sehr 7",
        "Passt nicht"
      ],
      label: 'Bitte bewerten Sie den Roboter auf einer Skala von 0 (Überhaupt nicht) bis 7 (Sehr). Falls eine bestimmte Frage nicht zum Roboter zu passen scheint, wählen Sie bitte die Option, die aussagt "Passt nicht".',
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "MDMT",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
      <col style=\"width: 20%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
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


const MDMT_sequence = new lab.flow.Sequence({
  title: "MDMT Sequence",
  shuffle: false,
  content: [
    Likert_MDMT1_htmlForm,
    Likert_MDMT2_htmlForm
  ],
});



/* 
################### ending phase ###################
*/
// feedback screen
const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: textObj.feedbackQues,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// ending screen
/*
 ` +
    "${TechnologyScenario}" +
    `
*/
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: `
  <header>
  <h2> Vielen Dank für Ihre Teilnahme! </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

    <br>
    <div>
      <i>Das Experiment wird in wenigen Sekunden enden und Sie werden automatisch zurück zu Prolific umgeleitet.</i> 
      <br>
      <br>
      <br>
      Wenn Sie Fragen haben, kontaktieren Sie bitte die Studienleiterin Louisa Estadieu (<a href="mailto:louisa.estadieu@livmats.uni-freiburg.de">louisa.estadieu@livmats.uni-freiburg.de</a>).
    </div>
  </main>
  `,
  timeout: 6000,
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = 100 + "%";

      // alert(numElementsCounter);
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        if (
          study.options.datastore.extract("sender").includes("FeedbackScreen")
        ) {
          jatos.endStudyAndRedirect(
            "https://app.prolific.com/submissions/complete?cc=C1O1B8DE",  // !!! https://drawyourminds.de/
            true,
            "everything worked fine"
          );
        } else {
          alert(
            "It seems that you did not go through the entire study because you did not see the previous feedback screen."
          );
          jatos.abortStudy("study aborted - copied submission link");
        }
      }
    },
  },
});



// >>>> ALL SCALES
const SCALES_sequence = new lab.flow.Sequence({
  title: "SCALES Sequence",
  shuffle: true,
  content: [
    //MDMT_sequence,
    GAToRS_sequence,
    LikertLiWang_htmlForm,
    LikertAlmere_htmlForm, 
  ],
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
    htmlForm,

    /*
    break500,
    CAMfeedbackGeneral_htmlForm,
    htmlForm,
    htmlForm3,
*/
    SCALES_sequence,
    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen
  ],
})



// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}