const jatosStub = {
    jQuery: null,
    urlQueryParameters: {},
    studySessionData: {},
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

export { jatosStub };
