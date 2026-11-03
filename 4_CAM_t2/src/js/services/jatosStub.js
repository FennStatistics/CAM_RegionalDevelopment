/** Stable mock UUID for local ID-restore checks (npm run dev). */
const MOCK_CENTRAL_NODE_ID = "11111111-1111-4111-8111-111111111111";

const mockCamT1 = {
    idCAM: "22222222-2222-4222-8222-222222222222",
    creator: "devcode01",
    projectCAM: "CleanEnergyValley_CAM_t1",
    defocusCAM: null,
    date: Date.now(),
    nodes: [
        {
            id: MOCK_CENTRAL_NODE_ID,
            value: 0,
            text: "klimaneutrale Regionalentwicklung",
            comment: "",
            position: { x: 650, y: 400 },
            isActive: true,
            date: Date.now(),
            kind: "Node",
            isSelected: false,
            isConnectorSelected: false,
            isDraggable: false,
            isDeletable: false,
            hasElementMoved: false,
            eventLog: [],
            isTextChangeable: false,
        },
    ],
    connectors: [],
};

const jatosStub = {
    jQuery: null,
    urlQueryParameters: {},
    studySessionData: {
        teilnehmer_code: "devcode01",
        einwilligung: true,
        datenschutz_version: "entwurf-2026-03-01",
        CAM_t1: mockCamT1,
        meanValence_t1: 0,
        nNodes_t1: 1,
        nConnectors_t1: 0,
    },
    setStudySessionData: (data) => {
        jatosStub.studySessionData =
            typeof data === "object" && data !== null ? data : {};
        console.info(
            "[jatosStub] setStudySessionData",
            jatosStub.studySessionData,
        );
        return Promise.resolve();
    },
    startNextComponent: () => {
        console.info(
            "[jatosStub] startNextComponent — next JATOS component would start here",
        );
        return Promise.resolve();
    },
    submitResultData: () => Promise.resolve(),
    endStudyAndRedirect: () => Promise.resolve(),
    endStudy: () => Promise.resolve(),
};

export { jatosStub, MOCK_CENTRAL_NODE_ID };
