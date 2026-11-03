/* default values */
var config = {
    CAMproject: "S2_CAM part 2", // "proj_" + uuid.v4(), // necessary for server (see ERM)
    ConNumNodes: 6, // number of nodes necessary to draw
    
    hideArrows: true, // if false = possible to draw arrows
    BidirectionalDefault: false, // if true the default connection is bidirectional

    hideAmbivalent: false, // if false = possible to draw ambivalent node
    showOnlyPosSlid: false, // show only slider for agreement (+1 - +3)
    
    MaxLengthWords: 3, // maximum number of words for each concept
    MaxLengthChars: 40, // maximum number of characters for each concept
    LengthSentence: 20, // include breaklines if >= X characters
    LengthWords: 8, // include breaklines after each word with cumsum >= X characters
    ShowResearcherButtons: false, // if true = show researcher functionalities
    cameraFeature: false, // include camera / splotlight feature to move screen

    setLanguage: "German", // set language of your CAM study, e.g. French 

    fullScreen: true, // if true = study in fullscreen mode + paradata
    showNotPopupStart: true, // true = no pop up shown; only working if fullScreen is set to true

    AdaptiveStudy: false, // run as adaptive study 
    ADAPTIVESTUDYurl: "http://example.org/", // URL the CAM data should be append to

    setReminder: false, // if true = after X ms 2 reminder pop up

    surpressSaveCAMpopup: false,  // if set to true no popup is shown when downloading a vector graphic of the CAM (for automation via the CAM2Image tool)

    MultiComponentStudy: true


}

// global variable
var usingMangoDB = false;
var usingJATOS = true;

console.log("config config file:", config)


// ! not change
const webAddress = "http://localhost:3001";