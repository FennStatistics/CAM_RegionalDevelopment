/* MAKE CHANGES: start*/
/* default values */
const config = {
    CAMproject: "CleanEnergyValley_CAM_t2", // becomes store.cam.projectCAM
    MinNumNodes: 1, // number of nodes necessary to draw # !!! 8
    
    // Inverted: false = arrows/direction UI ON (Leitfaden: gerichtete + bidirektionale Verbindungen)
    enableArrows: false,
    BidirectionalDefault: true, // if true the default connection is bidirectional

    // Inverted: false = ambivalent nodes ON (Leitfaden: Ambivalenz erlaubt)
    enableAmbivalent: false,
    OnlyStraightCon: false, // if true = show only slider for agreement (+1 - +3); only when arrows UI is on (enableArrows: false)
    
    MaxNumWords: 3, // maximum number of words for each concept
    MaxLengthChars: 40, // maximum number of characters for each concept
    LengthSentence: 14, // include breaklines if >= X characters
    LengthWords: 8, // include breaklines after each word with cumsum >= X characters

    ShowResearcherButtons: false, // if true = show researcher functionalities

    cameraFeature: false, // include camera / splotlight feature to move screen

    setLanguage: "German", // set language of your CAM study, e.g. French 

    fullScreen: false, // if true = study in fullscreen mode + paradata
    showNotPopupStart: true, // true = no pop up shown; only working if fullScreen is set to true

    // Leipzig: multi-component JATOS chain (session + startNextComponent in saveButton), not URL redirect
    AdaptiveStudy: false,
    ADAPTIVESTUDYurl: "http://example.org/", // unused when AdaptiveStudy is false

    setReminder: false, // if true = after X ms 2 reminder pop up

    surpressSaveCAMpopup: false // if set to true no popup is shown when downloading a vector graphic of the CAM (for automation via the CAM2Image tool)
};

const defaultFlags = {
    usingSupabase: false,
    usingJATOS: true,
};
/* MAKE CHANGES: end*/

console.log("config config file:", config);

// ! not change
const webAddress = "https://camadministrative.vercel.app/api/"; // "https://drawyourminds.de/API/"; // "http://localhost:3001/";

export { config, defaultFlags, webAddress };
