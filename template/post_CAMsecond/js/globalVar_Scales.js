/*
Use the modern version of the Fisher–Yates shuffle algorithm:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
function shuffle(queslist) {
  let array_emp = [];
  for (var i = 0; i < queslist.ques.length; i++) {
    array_emp.push(i);
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

function createitems(queslist, quesindex) {
  let quesitems = [];
  for (i = 0; i < queslist.ques.length; i++) {
    let tmp_ques = queslist.ques[quesindex[i]];
    let tmp_label = queslist.scale[quesindex[i]];

    quesitems.push({
      label: tmp_ques,
      coding: tmp_label,
    });
  }
  return quesitems;
}



/* items Koverola 2022 */
let KoverolaList = {
  ques: ["Ich kann Personen und Organisationen, die mit der Entwicklung von Robotern zu tun haben, vertrauen.",
    "Personen und Organisationen, die mit der Entwicklung von Robotern zu tun haben, werden die Bedürfnisse, Gedanken und Gefühle ihrer Nutzer berücksichtigen.",
    "Ich kann einem Roboter vertrauen.",
    "Ich würde mich im Gespräch mit einem Roboter entspannt fühlen.",
    "Wenn Roboter Emotionen hätten, könnte ich mich mit ihnen anfreunden.",
    "Ich würde mich unbehaglich dabei fühlen, wenn ich einen Job bekommen würde, bei dem ich mit Robotern arbeiten müsste.",
    "Ich befürchte, dass Roboter meine Anweisungen nicht verstehen wüden.",
    "Roboter machen mir Angst.",
    "Ich würde mich sehr nervös fühlen, allein in der Nähe eines Roboters zu sein.",
    "Ich möchte nicht, dass ein Roboter mich anfasst.",
    "Roboter sind notwendig, da sie Jobs ausführen können, welche zu schwer oder gefährlich für Menschen sind.",
    "Roboter können das Leben einfacher machen.",
    "Die Zuweisung von Routineaufgaben an Roboter ermöglicht es den Menschen, bedeutungsvollere Aufgaben zu erledigen.",
    "Gefährliche Aufgaben sollten primär Robotern übertragen werden.", "Roboter sind eine gute Sache für die Gesellschaft, da sie Menschen helfen. ",
    "Roboter könnten uns noch fauler machen. ",
    "Der weitverbreitete Einsatz von Robotern wird Menschen Arbeitsplätze wegnehmen.",
    "Ich habe Angst, dass Roboter dazu führen könnten, dass weniger zwischenmenschliche Interaktion stattfindet.",
    "Robotik ist einer der Bereiche der Technologie, der engmaschig überwacht werden muss.",
    "Der unregulierte Einsatz von Robotik kann zu gesellschaftlichen Umwälzungen führen."],
  scale: ["1pp", "2pp", "3pp", "4pp", "5pp", "1pn", "2pn", "3pn", "4pn", "5pn", "1sp", "2sp", "3sp", "4sp", "5sp", "1sn", "2sn", "3sn", "4sn", "5sn"]
};

var index_KoverolaList = shuffle(KoverolaList);
console.log("KoverolaList: ", KoverolaList);
console.log("KoverolaList index: ", index_KoverolaList);

var items_Koverola = createitems(KoverolaList, index_KoverolaList);
console.log(items_Koverola.slice(0, 4));


/* items Heerink 2010 */
let HeerinkList = {
  ques: ["Wenn ich den Roboter benutzen sollte, hätte ich Angst, Fehler damit zu machen.", "Wenn ich einen Roboter beutzen sollte, hätte ich Angst etwas kaputt zu machen.", "Ich finde den Roboter gruselig.", "Ich finde den Roboter einschüchternd.", "Ich denke es ist eine gute Idee, den Roboter zu verwenden.", "Der Roboter würde das Leben Interessanter machen.", "Es ist gut, einen Nutzen aus dem Roboter zu ziehen."],
  scale: ["1anx", "2anx", "3anx", "4anx", "1att", "2att", "3att"]
};

var index_HeerinkList = shuffle(HeerinkList);
console.log("HeerinkList: ", HeerinkList);
console.log("HeerinkList index: ", index_HeerinkList);

var items_Heerink = createitems(HeerinkList, index_HeerinkList);
console.log(items_Heerink.slice(0, 4));



/* items Li and Wang 2022 ADJUSTED */
let LiWangList = {
  ques: ["Der Roboter sollte automatisch Veränderungen in der Umgebung wahrnehmen.",
    "Der Roboter sollte automatisch Entscheidungen treffen.",
    "Der Roboter sollte automatisch Aufgaben erledigen.",
    "Der Roboter sollte einen eigenen Willen haben.",
    "Der Roboter sollte Absichten haben.",
    "Der Roboter sollte einen freien Willen haben.",
    "Der Roboter sollte ein Bewusstsein haben.",
    "Der Roboter sollte die Fähigkeit besitzen, Emotionen zu erleben."]
  ,
  scale: ["1autonomy", "2autonomy", "3autonomy", "1anthropomorphism", "2anthropomorphism", "3anthropomorphism", "4anthropomorphism", "5anthropomorphism"]
};

var index_LiWangList = shuffle(LiWangList);
console.log("LiWangList: ", LiWangList);
console.log("LiWangList index: ", index_LiWangList);

var items_LiWang = createitems(LiWangList, index_LiWangList);
console.log(items_LiWang.slice(0, 4));


/* items MDMT 2019 */
let MDMTList = {
  ques: ["Verlässlich", "Vorhersehbar", "Jemand, auf den man zählen kann", "Konsistent", "Fähig", "Fachkundig", "Kompetent", "Gewissenhaft", "Ethisch", "Respektabel", "Prinzipientreu", "hat Integrität", "Ehrlich", "Echt", "Aufrichtig", "Authentisch"],
  scale: ["1reliable", "2reliable", "3reliable", "4reliable", "1capable", "2capable", "3capable", "4capable", "1ethical", "2ethical", "3ethical", "4ethical", "1sincere", "2sincere", "3sincere", "4sincere"]
};

var index_MDMTList = shuffle(MDMTList);
console.log("MDMTList: ", MDMTList);
console.log("MDMTList index: ", index_MDMTList);

var items_MDMT = createitems(MDMTList, index_MDMTList);
console.log(items_MDMT.slice(0, 4));
