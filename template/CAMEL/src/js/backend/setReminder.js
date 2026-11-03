
const contentFirstReminder =  `
Sie haben nur noch <b>3 Minuten</b>, um Ihre <i>Mind-Map</i> zu zeichnen. Bitte kommen Sie langsam zum Abschluss und beachten Sie Folgendes:
<ul style="font-size: 14px;">
  <li>Verwenden Sie pro Konzept nicht mehr als drei Wörter und lassen Sie kein gezeichnetes Konzept leer.</li>
  <li>Verbinden Sie alle gezeichneten Konzepte miteinander.</li>
</ul>
<br>
Bitte klicken Sie auf den Hintergrund, um fortzufahren.
`;



const contentFinalReminder =  `
Bitte vervollständigen Sie jetzt die Zeichnung der <i>Mind-Map</i> und beachten Sie dabei die folgenden Regeln:
<ul style="font-size: 14px;">
  <li>Lassen Sie kein gezeichnetes Konzept leer.</li>
  <li>Verbinden Sie alle gezeichneten Konzepte miteinander.</li>
</ul>
<br>
Bitte klicken Sie auf den Hintergrund, um fortzufahren, und klicken Sie auf das Diskettensymbol in der oberen rechten Ecke, um Ihre CAM zu speichern. Danke!
`;



var startTimeMS = 0;  // EPOCH Time of event count started
var timerStepFirst = 720000;   // Time first reminder > 720000 / 1000 / 60 = 12 minutes
var timerStepFinal = 900000;   // Time final reminder > 900000 / 1000 / 60 = 15 minutes


function firstReminder() {
   $("#dialogReminder").dialog("open");
   $("#textDialogReminder")[0].innerHTML = contentFirstReminder;
 }
   
 function finalReminder() {
   $("#dialogReminder").dialog("open");
   $("#textDialogReminder")[0].innerHTML = contentFinalReminder;
 }
   


// This function starts the two reminder
function startTimer(){
   startTimeMS = (new Date()).getTime();
   setTimeout(firstReminder,timerStepFirst);
   setTimeout(finalReminder,timerStepFinal);
}


// Gets the number of ms remaining to execute the eventRaised Function
function getRemainingTime(){
    var remainingTimeFirst =  timerStepFirst - ( (new Date()).getTime() - startTimeMS );
    var remainingTimeFinal =  timerStepFinal - ( (new Date()).getTime() - startTimeMS );

    console.log("remaining time first reminder:", remainingTimeFirst);
    console.log("remaining time final reminder:", remainingTimeFinal);
}


if(config.setReminder){
  startTimer();
}



