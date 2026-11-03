/*
Use the modern version of the Fisher–Yates shuffle algorithm:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
function shuffle(queslist) {
  let array_emp = []
  for (var i = 0; i < queslist.ques.length; i++) {
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

function createitems(queslist, quesindex) {
  let quesitems = [];
  for (i = 0; i < queslist.ques.length; i++) {
    let tmp_ques = queslist.ques[quesindex[i]];
    let tmp_label = queslist.scale[quesindex[i]];

    quesitems.push({
      label: tmp_ques,
      coding: tmp_label,
    })

  }
  return quesitems;
}



/* PANAS SCALE */
let quespanaslist = {
  ques: ["interessiert", "bekümmert", "freudig erregt", "verärgert", "stark", "schuldig", "erschrocken", "feindselig", "begeistert", "stolz", "gereizt", "wach", "beschämt", "angeregt", "nervös", "entschlossen", "aufmerksam", "durcheinander", "aktiv", "ängstlich"],
  scale: ["01p", "01n", "02p", "02n", "03p", "03n", "04n", "05n", "04p", "05p", "06n", "06p", "07n", "07p", "08n", "08p", "09p", "09n", "10p", "10n"]
}
/*
let quespanaslist = {
  ques: ["interested", "distressed", "excited", "upset", "strong", "guilty", "scared", "hostile", "enthusiastic", "proud", "irritable", "alert", "ashamed", "inspired", "nervous", "determined", "attentive", "jittery", "active", "afraid"],
  scale: ["01p", "01n", "02p", "02n", "03p", "03n", "04n", "05n", "04p", "05p", "06n", "06p", "07n", "07p", "08n", "08p", "09p", "09n", "10p", "10n"]
}


var index_quespanas = shuffle(quespanaslist);
//console.log("quespanasindex: ", index_quespanas);
//console.log("quespanaslist: ", quespanaslist);

var items_quespanas = createitems(quespanaslist, index_quespanas);
//console.log(items_quespanas.slice(0, 4));
*/

/* Perceived Stress Scale */
let quespsclist = {
  ques: ["Wie oft waren Sie im letzten Monat aufgewühlt, weil etwas unerwartet passiert ist?", 
  "Wie oft hatten Sie im letzten Monat das Gefühl, nicht in der Lage zu sein, die wichtigen Dinge in Ihrem Leben kontrollieren zu können?", 
  "Wie oft haben sie sich im letzten Monat nervös und gestresst gefühlt?", 
  "Wie oft waren Sie im letzten Monat zuversichtlich, dass Sie fähig sind, ihre persönlichen Probleme zu bewältigen?", 
  "Wie oft hatten Sie im letzten Monat das Gefühl, dass sich die Dinge zu Ihren Gunsten entwickeln?", 
  "Wie oft hatten Sie im letzten Monat den Eindruck, nicht all Ihren anstehenden Aufgaben gewachsen zu sein?", 
  "Wie oft waren Sie im letzten Monat in der Lage, ärgerliche Situationen in Ihrem Leben zu beeinflussen?", 
  "Wie oft hatten Sie im letzten Monat das Gefühl, alles im Griff zu haben?", 
  "Wie oft haben Sie sich im letzten Monat über Dinge geärgert, über die Sie keine Kontrolle hatten?",
  "Wie oft hatten Sie im letzten Monat das Gefühl, dass sich so viele Schwierigkeiten angehäuft haben, dass Sie diese nicht überwinden konnten?"],
  scale: ["1h", "2h", "3h", "1s", "2s", "4h", "3s", "4s", "5h", "6h"]
}

var index_quespsclist = shuffle(quespsclist);
console.log("quespsclist index: ", index_quespsclist);
console.log("quespsclist: ", quespsclist);

var items_quespsc = createitems(quespsclist, index_quespsclist);
console.log(items_quespsc.slice(0, 4));

/* Messinstrument für die Wahrnehmung von Studienanforderungen */
let quesstudienanflist = {
  ques: ["...mit dem sozialen Klima im Studiengang zurechtzukommen (z.B. Konkurrenz aushalten)", 
    "...mit dem vorhandenen Lehrangebot zurechtzukommen (z.B. ungünstige Termine, eingeschränkte Themenwahl)", 
    "...mit Prüfungsergebnissen umzugehen (z.B. schlechte Noten)", 
    "...zu erkennen, wie man sinnvoll lernt (z.B. die richtige Methode wählen)", 
    "...sich die Wissenschaftssprache anzueignen (z.B. für Klausuren und Hausarbeiten)", 
    "...einen eigenen Stundenplan zu erstellen (z.B. interessengeleitet Veranstaltungen wählen Studienplan bei der Auswahl berücksichtigen)",
     "...mit Leistungsdruck umzugehen (z.B. mit Prüfungsstress oder eigenen Ansprüchen zurechtkommen)", 
     "...Studieninhalte mit Berufsvorstellungen zu verbinden (z.B. Berufsperspektiven entwickeln, berufliche Relevanz der Inhalte erkennen)",
     " ...Lernaktivitäten zeitlich sinnvoll zu strukturieren (z.B. Zeitpunkt und Dauer des Lernens)", 
      "...Teamarbeit zu organisieren (z.B. Lerngruppen finden)", 
      "...passende Informations- und Beratungsangebote zu finden (z.B. Ansprechpersonen finden)", 
      "...eigene Interessen zu erkennen und die Studiengangswahl zu überprüfen (z.B. die Frage, ob der Studiengang zu einem passt)", 
      "...die Menge an Lernstoff zu bewältigen (z.B. semesterbegleitende Aufgaben oder Lektüren)", 
      "...sich auf die wissenschaftlichen Herangehensweisen einzustellen (z.B. unterschiedlicher Umgang mit Inhalten in Schule und Uni)", 
      "...mit Prüfungsbedingungen zurechtzukommen (z.B. Benotungspraxis, Prüfungsdichte)", 
      "...Bezüge zwischen Theorie und Praxis herzustellen (z.B. Anwendungsbeispiele finden)", 
      "...Kontakte zu Mitstudierenden zu knüpfen (z.B. für Lerngruppen, Freizeit)", 
      "...eigene Belastbarkeit einzuschätzen (z.B. Lernumfang, Erholungsbedarf)", 
      "...mit ungünstigen Rahmenbedingungen umzugehen (z.B. Überfüllung, Zugangsbeschränkungen, Ausstattung)", 
      "...wissenschaftliche Arbeitsweisen zu erlernen (z.B. wissenschaftliche Texte bearbeiten, eine Fragestellung entwickeln)", 
      "...im Team zusammen zu arbeiten (z.B. gemeinsam Aufgaben bearbeiten, Referate vorbereiten)"],
  scale: ["KK1", "SO1", "LD1", "LA1", "WM1", "SO2", "LD2", "StA1", "LA2", "KK2", "SO3", "StA2", "LA3", "WM2", "LD3", "StA3", "KK3", 
  "LA4", "SO4", "WM3", "KK4"]
}

var index_quesstudienanflist = shuffle(quesstudienanflist);
console.log("quesstudienanflist index: ", index_quesstudienanflist);
console.log("quesstudienanflist: ", quesstudienanflist);

var items_quesstudienanf = createitems(quesstudienanflist, index_quesstudienanflist);
console.log(items_quesstudienanf.slice(0, 4));