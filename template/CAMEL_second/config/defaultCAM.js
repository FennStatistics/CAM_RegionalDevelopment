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

  // draw nodes
  arrayIDs = [];
  for (var i = 0; i <   jatos.studySessionData.CAM.nodes.length; i++) {
      var elementNode =   jatos.studySessionData.CAM.nodes[i];
      //console.log(elementNode);

      if(elementNode.isActive){
          CAM.addElement(new NodeCAM(elementNode.value, elementNode.text, {
              x: elementNode.position.x,
              y: elementNode.position.y
          }, elementNode.isDraggable, elementNode.isDeletable, elementNode.isTextChangeable));

   
          // CAM.nodes[i].id = elementNode.id; // add ID of former node
          // CAM.nodes[i].isDraggable = true; // moveable
          arrayIDs.push(elementNode.id);
      }

  }


    // draw connectors
    for (var i = 0; i < jatos.studySessionData.CAM.connectors.length; i++) {
      //CAM.nodes.match(elt => elt.id ===     jsonObj.connectors[0].source)
      var elementConnector = jatos.studySessionData.CAM.connectors[i];
      //console.log(elementConnector);

      if(elementConnector.isActive){
      var connector = new ConnectorCAM();

      console.log("elementConnector.source:", elementConnector.source)
      console.log("elementConnector.target:", elementConnector.target)
      console.log("CAM.nodes[arrayIDs.indexOf(elementConnector.source)]", CAM.nodes[arrayIDs.indexOf(elementConnector.source)])
      console.log("CAM.nodes[arrayIDs.indexOf(elementConnector.target)]", CAM.nodes[arrayIDs.indexOf(elementConnector.target)])

      connector.establishConnection(CAM.nodes[arrayIDs.indexOf(elementConnector.source)], CAM.nodes[arrayIDs.indexOf(elementConnector.target)],
          elementConnector.intensity, elementConnector.agreement);
          connector.isBidirectional = elementConnector.isBidirectional;
          connector.isDeletable = elementConnector.isDeletable;
      CAM.addElement(connector);
      }
  }




  /* 
    CAM.addElement(new NodeCAM(0, "Covid-19", {
        x: 650,
        y: 400
    }, false, false, false));

        
    CAM.addElement(new NodeCAM(3, "positive aspects", {
      x: 450,
      y: 400
  }, false, false, false));


  CAM.addElement(new NodeCAM(-2, "negative aspects", {
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
*/
CAM.draw();
}