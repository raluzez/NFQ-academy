import * as actionTypes from "./actionTypes";

export const jumbotronClicked = (jumbotronData) => {
    return {
        type: actionTypes.JUMBOTRON_CLICKED,
        jumbotronData
    }
}

export const closeJumbotronModal = () => {
    return {
        type: actionTypes.CLOSE_JUMBOTRON_MODAL
    }
}
export const timer = () => {
    return {
        type: actionTypes.TIMER_START
    }
}

export const registerClient = (specialistData) => {
    return {
        type: actionTypes.REGISTER_CLIENT,
        specialistData
    }
}

export const closeSuccessScreen = () => {
    return {
        type: actionTypes.CLOSE_SUCCESS_SCREEN
    }
}

export const callPatient = () => {
    return {
        type: actionTypes.CALL_PATIENT
    }
}

export const patientServed = (specialistIndex) => {
    return {
        type: actionTypes.PATIENT_SERVED,
        specialistIndex
    }
}

export const addVisitTime = (specialistIndex) => {
    return {
        type: actionTypes.ADD_VISIT_TIME,
        specialistIndex
    }
}