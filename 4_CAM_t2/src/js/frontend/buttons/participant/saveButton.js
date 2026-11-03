import { $, toastr } from "../../../app/vendor.js";
import { store } from "../../../app/store.js";
import { webAddress } from "../../../../../config/configfile.js";
import {
    addElementsCy,
    bfsAlgorithm,
    cy,
} from "../../../processing/preprocessingCAM.js";
import {
    getActiveListNodes,
    getMeanValenceNodes,
} from "../../../processing/postprocessingCAM.js";
import { getJatos } from "../../../services/jatosAdapter.js";

function initSaveButton() {
    /* add button: */
    const saveButton = `<button id="saveCAM" onclick="saveCam()" class="material-icons" title="Save CAM on server" style="margin-right: 5px;">save</button>`;
    var target = document.getElementById("rightButton");
    target.innerHTML += saveButton;

    // language file
    $(function () {
        document.getElementById("saveCAM").title = store.language.btr_02;
        document.getElementById("dialogConfirmSave").title =
            store.language.confirmSaving_01_title;
    });

    function saveCam() {
        var CAMnodes = store.cam.nodes.filter((element) => element.isActive === true);
        var CAMconnectors = store.cam.connectors.filter(
            (element) => element.isActive === true
        );

        // every concept should include text
        var CAMnodesNoText = CAMnodes.filter(
            (element) => element.text.length === 0
        );
        console.log(CAMnodesNoText);
        if (CAMnodesNoText.length > 0) {
            toastr.warning(
                store.language.popSave_01emptyNodes,
                CAMnodesNoText.length + store.language.popSave_02emptyNodes,
                {
                    closeButton: true,
                    timeOut: 2000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                }
            );
            return false;
        }

        // every concept should include at least 3 characters
        var CAMnodesFewText = CAMnodes.filter(
            (element) => element.text.length < 3
        );

        if (CAMnodesFewText.length > 0) {
            toastr.warning(
                store.language.popSave_01insufficientCharsNodes,
                CAMnodesFewText.length +
                    store.language.popSave_02insufficientCharsNodes,
                {
                    closeButton: true,
                    timeOut: 2000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                }
            );
            return false;
        }

        // necessary # of concepts
        if (CAMnodes.length < store.config.MinNumNodes) {
            toastr.warning(
                store.language.popSave_01numNodes,
                store.language.popSave_02numNodes +
                    store.config.MinNumNodes +
                    store.language.popSave_03numNodes,
                {
                    closeButton: true,
                    timeOut: 2000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                }
            );
            return false;
        } else if (CAMnodes.length - 1 > CAMconnectors.length) {
            console.log("CAMconnectors.length: ", CAMconnectors.length);
            console.log("CAM.nodes.length: ", CAMnodes.length);

            toastr.warning(
                store.language.popSave_01unconnectedA,
                store.language.popSave_02unconnectedA,
                {
                    closeButton: true,
                    timeOut: 2000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                }
            );

            return false;
        } else {
            addElementsCy();
            var ResbfsAl = bfsAlgorithm("#" + cy.nodes()[0].id());
            console.log("num of distinct components of CAM: ", ResbfsAl);

            if (ResbfsAl !== 1) {
                toastr.warning(
                    store.language.popSave_01unconnectedB,
                    store.language.popSave_02unconnectedB +
                        " " +
                        ResbfsAl +
                        store.language.popSave_03unconnectedB,
                    {
                        closeButton: true,
                        timeOut: 2000,
                        positionClass: "toast-top-center",
                        preventDuplicates: true,
                    }
                );

                return false;
            } else {
                // confirm saving
                $("#dialogConfirmSave").dialog("open");
            }
        }
    }

    function saveCAMsuccess() {
        toastr.success(store.language.popSave_01savedData, {
            closeButton: true,
            timeOut: 4000,
            positionClass: "toast-top-center",
            preventDuplicates: true,
        });

        // after 4 seconds
        var delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        delay(function () {
            // set defocus data
            if (store.config.fullScreen == true) {
                store.cam.defocusCAM = store.ui.defocusEvents;
            }

            /* if server is >>> JATOS <<< */
            // Leipzig multi-component: write CAM_t2 (nodes/connectors inkl. UUID-id),
            // keep existing CAM_t1 + teilnehmer_code from earlier parts, then startNextComponent.
            // Do not regenerate IDs — needed for Delta-CAM in Teil 5.
            console.log("usingJATOS: ", store.flags.usingJATOS);
            if (store.flags.usingJATOS) {
                const jatos = getJatos();
                console.log("jatos: ", jatos);

                try {
                    const existing =
                        typeof jatos.studySessionData === "object" &&
                        jatos.studySessionData
                            ? jatos.studySessionData
                            : {};

                    // creator = participant ID across study parts; never invent a new code
                    const teilnehmer_code =
                        typeof existing.teilnehmer_code === "string" &&
                        existing.teilnehmer_code.length > 0
                            ? existing.teilnehmer_code
                            : "noID";
                    store.cam.creator = teilnehmer_code;

                    const camSerialized = JSON.parse(
                        JSON.stringify(store.cam),
                    );
                    const activeNodes = getActiveListNodes();
                    const activeConnectors = store.cam.connectors.filter(
                        (element) => element.isActive === true,
                    );

                    const sessionPayload = {
                        // Session key for Prompt 5: full CAM2 with stable UUIDs
                        CAM_t2: camSerialized,
                        teilnehmer_code: teilnehmer_code,
                        meanValence_t2: getMeanValenceNodes(activeNodes),
                        nNodes_t2: activeNodes.length,
                        nConnectors_t2: activeConnectors.length,
                    };
                    // Keep CAM_t1 from Teil 2 (do not overwrite with CAM_t2 payload)
                    if (existing.CAM_t1 !== undefined) {
                        sessionPayload.CAM_t1 = existing.CAM_t1;
                    }
                    if (existing.einwilligung !== undefined) {
                        sessionPayload.einwilligung = existing.einwilligung;
                    }
                    if (existing.datenschutz_version !== undefined) {
                        sessionPayload.datenschutz_version =
                            existing.datenschutz_version;
                    }
                    // Preserve t1 summaries if present
                    if (existing.meanValence_t1 !== undefined) {
                        sessionPayload.meanValence_t1 = existing.meanValence_t1;
                    }
                    if (existing.nNodes_t1 !== undefined) {
                        sessionPayload.nNodes_t1 = existing.nNodes_t1;
                    }
                    if (existing.nConnectors_t1 !== undefined) {
                        sessionPayload.nConnectors_t1 = existing.nConnectors_t1;
                    }

                    const mergedSession = Object.assign(
                        {},
                        existing,
                        sessionPayload,
                    );
                    console.log(
                        "JATOS studySessionData (CAM_t2 + keep CAM_t1 + teilnehmer_code):",
                        mergedSession,
                    );

                    Promise.resolve(jatos.setStudySessionData(mergedSession))
                        .then(() =>
                            jatos.submitResultData(camSerialized),
                        )
                        .then(() => {
                            console.log(
                                "JATOS: CAM_t2 saved; starting next component",
                            );
                            return jatos.startNextComponent();
                        })
                        .catch((err) => {
                            console.warn(
                                "JATOS save / startNextComponent failed:",
                                err,
                            );
                            toastr.warning(
                                "Speichern oder Weiterleiten fehlgeschlagen. Bitte versuchen Sie es erneut.",
                                {
                                    closeButton: true,
                                    timeOut: 4000,
                                    positionClass: "toast-top-center",
                                    preventDuplicates: true,
                                },
                            );
                        });
                } catch (err) {
                    console.warn("JATOS session handoff error:", err);
                    toastr.warning(
                        "Lokaler Speichervorgang fehlgeschlagen (siehe Konsole).",
                        {
                            closeButton: true,
                            timeOut: 4000,
                            positionClass: "toast-top-center",
                            preventDuplicates: true,
                        },
                    );
                }
            }

            /* if server is >>> admin panel (Supabase-backed) <<< */
            console.log("usingSupabase: ", store.flags.usingSupabase);
            if (store.flags.usingSupabase) {
                async function postData() {
                    const url = webAddress + "poststudy";
                    const headers = { "Content-Type": "application/json" };

                    console.log("postData");

                    var dateStart = new Date(store.cam.date);
                    var dateEnd = new Date();
                    var diffTime = Math.abs(dateEnd - dateStart);

                    const post = await fetch(url, {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify({
                            namestudy: store.env.nameStudy,
                            camid: store.cam.idCAM,
                            participantid: store.cam.creator,
                            datestart: dateStart,
                            dateend: dateEnd,
                            datediff:
                                Math.round((diffTime / 1000 / 60) * 100) / 100,
                            numconcepts: store.cam.nodes.length,
                            numconnectors: store.cam.connectors.length,
                            avgvalence: getMeanValenceNodes(getActiveListNodes()),
                            cam: store.cam,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => console.log(data))
                        .catch((error) => console.error("Error:", error));

                    window.location =
                        store.env.linkRedirect +
                        "?participantID=" +
                        store.cam.creator;
                }
                postData();
            }

            /* if NO server >>> <<< */
            if (!store.flags.usingJATOS && !store.flags.usingSupabase) {
                toastr.success(store.language.popSave_01notSavedData, {
                    closeButton: true,
                    timeOut: 4000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                });
            }
        }, 4000); // end delay
    }

    window.saveCam = saveCam;
    window.saveCAMsuccess = saveCAMsuccess;
}

export { initSaveButton };
