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

export const fetchDataSuccess = (data, dataKey) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        data,
        dataKey
    }
}

export const fetchData = () => {
    return dispatch => {
        dispatch(fetchDataStart())
        axios.get('https://nfq-academy-ac4e1.firebaseio.com/data.json')
            .then(response => {
                const dataKey = Object.keys(response.data)[0]
                // const data = response.data[arr]
                dispatch(fetchDataSuccess(response.data[Object.keys(response.data)[0]], dataKey)
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

export const registerClient = (data, specialistData, dataKey) => {
    const lastClient = () => {
        let lastClient = {
            name: specialistData.lastClientName,
            timeLeft: specialistData.visitTime
        }
        if(specialistData.clients.length > 0) {
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
        axios.post('https://nfq-academy-ac4e1.firebaseio.com/data.json',newData)
         .then(response => {
            const newDataKey = response.data.name
            return (
            axios.delete(`https://nfq-academy-ac4e1.firebaseio.com/data/${dataKey}.json`)
            .then(() =>  {
                dispatch(registerClientSuccess(specialistData, newData, registrationSuccessData, newDataKey))
                })
            .catch(error => console.log(error))
              )} )  
        .catch(error => console.log(error))
    }
}

export const registerClientSuccess = (specialistData, newData, registrationSuccessData, dataKey) => {
    return {
        type: actionTypes.REGISTER_CLIENT,
        specialistData,
        newData,
        registrationSuccessData,
        dataKey
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

export const patientServedSuccess = (newData, visitTime, dataKey, withPatient) => {
    return {
        type: actionTypes.PATIENT_SERVED,
        newData,
        visitTime,
        dataKey,
        withPatient
    }
}

export const patientServedFail = (error) => {
    return {
        type:actionTypes.PATIENT_SERVED_FAIL,
        error
    }
}

export const patientSaveStart = () => {
    return {
        type:actionTypes.PATIENT_SAVE_START
    }
}

export const patientSaved = (specialistIndex, visitTime, patient, dataKey, data, withPatient) => {
    patient.timeLeft = visitTime
    patient.specialistIndex = specialistIndex
    const clientsArray = data[specialistIndex].clients.slice(1)
    const newData = data
    newData[specialistIndex].clients = clientsArray
    let timeSubstract = 0
    if(newData[specialistIndex].clients[0].timeLeft){
        timeSubstract = newData[specialistIndex].clients[0].timeLeft
    } 
    newData[specialistIndex].clients.map((item,i) =>(
        newData[specialistIndex].clients[i].timeLeft=item.timeLeft-timeSubstract
    ))
    let withPatientFalse = withPatient
    withPatientFalse[specialistIndex] = false

    return dispatch => {
        dispatch(patientSaveStart())
        axios.post("https://nfq-academy-ac4e1.firebaseio.com/servedClients.json", patient)
            .then(() => 
                axios.post(`https://nfq-academy-ac4e1.firebaseio.com/data.json`,newData)
                    .then(response => { 
                        const newDataKey = response.data.name
                        return(
                        axios.delete(`https://nfq-academy-ac4e1.firebaseio.com/data/${dataKey}.json`)
                            .then( () => dispatch(patientServedSuccess(newData, visitTime, newDataKey, withPatient)))
                            .catch(error => console.log(error)))}
                    )
                    .catch(error => console.log(error))
            )
            .catch(error => dispatch(patientServedFail()))
    }
}

export const  fetchServedPatientsStart = () => {
    return {
        type: actionTypes.FETCH_SERVED_PATIENTS_START
    }
}

export const fetchServedPatientsFail = (error) => {
    return {
        type: actionTypes.FETCH_SERVED_PATIENTS_FAIL,
        error
    }
}

export const fecthServedPatientsSuccess = (patientsArr) => {
    return {
        type: actionTypes.FETCH_SERVED_PATIENTS_SUCCESS,
        patientsArr
    }
}

export const fetchServedPatients = () => {
    return dispatch => {
        dispatch(fetchServedPatientsStart())
        axios.get("https://nfq-academy-ac4e1.firebaseio.com/servedClients.json")
            .then( res => {
                const fetchedPatients = []
                for (const key in res.data) {
                    fetchedPatients.push({
                    ...res.data[key],
                    key: key})
                }
                dispatch(fecthServedPatientsSuccess(fetchedPatients))
            })
            .catch ( error => {
                dispatch(fetchServedPatientsFail(error))
            })
    }
}

export const addVisitTime = (specialistIndex) => {
    return {
        type: actionTypes.ADD_VISIT_TIME,
        specialistIndex
    }
}