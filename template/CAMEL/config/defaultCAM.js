/* default CAM which will be redrawn if CAM is deleted
function shuffle(queslist) {
    let array_emp = [];
    for (var i = 0; i < queslist.length; i++) {
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

const ConceptsCAM = ["positive aspects", "negative aspects"];
const index_ConceptsCAM = shuffle(ConceptsCAM);
console.log("index_ConceptsCAM:", index_ConceptsCAM);
*/

function defaultCAM() {
  // if existent add ID to CAM.creator
  if (Object.keys(jatos.studySessionData).includes("choosen_Robot")) {
    CAM.addElement(new NodeCAM(0, jatos.studySessionData.choosen_Robot, {
      x: 650,
      y: 400
    }, false, false, false));
  }else{
    CAM.addElement(new NodeCAM(0, "Rettungsroboter", {
      x: 650,
      y: 400
    }, false, false, false));
  }





  CAM.addElement(new NodeCAM(0, "Nachteile", {
    x: 450,
    y: 400
  }, false, false, false));


  CAM.addElement(new NodeCAM(0, "Vorteile", {
    x: 850,
    y: 400
  }, false, false, false));



  var connector = new ConnectorCAM();
  connector.establishConnection(CAM.nodes[0], CAM.nodes[1], IncreaseSliderIntensity, true);
  CAM.addElement(connector);
  CAM.connectors[0].isDeletable = false;

  var connector = new ConnectorCAM();
  connector.establishConnection(CAM.nodes[0], CAM.nodes[2], IncreaseSliderIntensity, true);
  CAM.addElement(connector);
  CAM.connectors[0].isDeletable = false;
/**/
  CAM.draw();
}