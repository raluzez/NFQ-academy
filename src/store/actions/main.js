import * as actionTypes from "./actionTypes";
import axios from "axios";

export const jumbotronClicked = (jumbotronData, jumbotronIndex) => {
    jumbotronData.index = jumbotronIndex
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

export const callPatient = (index) => {
    return {
        type: actionTypes.CALL_PATIENT,
        index
    }
}

export const patientServedLocal = (specialistIndex, visitTime) => {
    return {
        type: actionTypes.PATIENT_SERVED,
        specialistIndex,
        visitTime
    }
}

export const patientSaveStart = () => {
    return {
        type:actionTypes.PATIENT_SAVE_START
    }
}

export const patientSaved = (specialistIndex, visitTime, patient) => {
    patient.timeLeft = visitTime
    patient.specialistIndex = specialistIndex
    return dispatch => {
        dispatch(patientSaveStart())
        console.log("before")
        axios.post("https://nfq-academy-ac4e1.firebaseio.com/servedClients.json", patient)
            .then(() => {
                console.log("inthen")
                dispatch(patientServedLocal(specialistIndex, visitTime))
            })
            .catch(error => dispatch(patientServedLocal(specialistIndex, visitTime)))
    }
}

export const addVisitTime = (specialistIndex) => {
    return {
        type: actionTypes.ADD_VISIT_TIME,
        specialistIndex
    }
}