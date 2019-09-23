import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_DATA_START
    }
}

export const fetchDataFail = (error) => {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
        error
    }
}

export const fetchDataSuccess = (data) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        data
    }
}

export const fetchData = () => {
    return dispatch => {
        dispatch(fetchDataStart())
        axios.get('https://nfq-academy-ac4e1.firebaseio.com/data.json')
            .then(response => {
                // const arr = Object.keys(response.data)[0]
                // const data = response.data[arr]
                dispatch(fetchDataSuccess(response.data[Object.keys(response.data)[0]])
            )})
            .catch(error => {
                console.log(error)
                dispatch(fetchDataFail(error))
            })
    }
}

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

export const registerClient = (data,specialistData) => {
    const lastClient = () => {
        let lastClient = {
            name: specialistData.lastClientName,
            timeLeft: specialistData.visitTime
        }
        if(specialistData.clients[specialistData.clients.length] > 0) {
            lastClient = specialistData.clients[specialistData.clients.length-1]
        } 
        return lastClient
    } 
    const clientName = lastClient().name+1
    const timeLeft = lastClient().timeLeft + specialistData.visitTime
    const client = {name:clientName, timeLeft:timeLeft}
    const specialistIndex = () => {
        let index = 0
            for( let i=0; i< data.length; i++){
                if(data[i].name === specialistData.name){
                    index = i
                    break
                }
            }
            return index
        }
    const newClients = data[specialistIndex()].clients.concat(client)
    let specialist = data[specialistIndex()]
    let newData = data
    const registrationSuccessData = {
        name: clientName,
        timeLeft: timeLeft,
        specialistName : specialist.name}
    specialist.clients = newClients
    specialist.lastClientName = clientName
    newData[specialistIndex()] = specialist
    
    return dispatch =>{
    axios.delete('https://nfq-academy-ac4e1.firebaseio.com/data.json')
        .then(axios.post('https://nfq-academy-ac4e1.firebaseio.com/data.json',newData)
            .then(() =>  {
                dispatch(registerClientSuccess(specialistData, newData, registrationSuccessData))
                }))
            .catch(error => console.log(error))
        .catch(error => console.log(error))
    }
}

export const registerClientSuccess = (specialistData, newData, registrationSuccessData) => {
    return {
        type: actionTypes.REGISTER_CLIENT,
        specialistData,
        newData,
        registrationSuccessData
}}

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