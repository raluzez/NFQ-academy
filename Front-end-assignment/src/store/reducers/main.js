import * as actionTypes from "../actions/actionTypes";
import Data from "../../dummyData.json";

const initialState = {
    clickedJumbotron: null,
    showJumbotronModal: false,
    data: Data,
    timerOn: false,
    registrationSuccessful: false,
    registrationSuccessData: {},
    loading: false,
    error: null,
    withPatient: [
        false,
        false,
        false
    ],
    servedPatients:[[],[],[]]
}

const timerUpdate = (state) => {
    const newData = [...state.data]
    return newData.map(item => {
        return {
            ...item, 
            clients: item.clients.map(client => {
                return {
                    ...client,
                    timeLeft: (client.timeLeft -= (1/60)*5)
                }})
            }
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                dataKey: action.dataKey
            }
        case actionTypes.JUMBOTRON_CLICKED:
            return {
                ...state,
                clickedJumbotron: action.jumbotronData,
                showJumbotronModal: true
            }
        case actionTypes.CLOSE_JUMBOTRON_MODAL:
            return {
                ...state,
                showJumbotronModal: false,
                clickedJumbotron: null
            }
        case actionTypes.TIMER_START:
            return {
                ...state,
                data: timerUpdate(state),
                timerOn: true
            }
        case actionTypes.REGISTER_CLIENT:
            return {
                ...state,
                registrationSuccessful: true,
                data: action.newData,
                registrationSuccessData: action.registrationSuccessData,
                dataKey: action.dataKey
                }
        case actionTypes.CALL_PATIENT:
            const timeTillVisit = state.data[action.index].clients[0].timeLeft
            const newClientsTime = () => {
                return state.data[action.index].clients.map(client => {
                    client.timeLeft -= timeTillVisit
                    return client
                })
            }
            const updatedSpecialisData = {...state.data[action.index], clients: newClientsTime()}
            const updateCallPatientData = () => {
                return state.data.map(specialistData => {
                    if(state.data.indexOf(specialistData) === action.index){
                        return updatedSpecialisData
                    } else { return specialistData }
                })
            }
            let withPatientTrue = [...state.withPatient]
            withPatientTrue[action.index] = true
            return {
                ...state,
                withPatient: withPatientTrue,
                data: updateCallPatientData()
            }
        case actionTypes.PATIENT_SERVED:
            //finish
            return {
                ...state,
                withPatient: action.withPatient,
                data: action.newData,
                loading: false,
                dataKey: action.dataKey
            }
        case actionTypes.PATIENT_SAVE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADD_VISIT_TIME:
            const dataWithAddedTime = () => {
                let data = [...state.data]
                data.map(specialistData => {
                    let clients = specialistData.clients
                    if(state.data.indexOf(specialistData) === action.specialistIndex) {
                        clients = specialistData.clients.map(client =>{
                            return client.timeLeft += specialistData.visitTime
                        })
                    }
                    return data.clients = clients           
                })  
                return data
            }
            return {
                ...state,
                data: dataWithAddedTime()
            }
        case actionTypes.CLOSE_SUCCESS_SCREEN:
            return {
                ...state,
                registrationSuccessful: false,
                specialistData: null
            }
        case actionTypes.FETCH_SERVED_PATIENTS_START:
            return {
                ...state,
                loading: true,
                servedPatients:[[],[],[]]
            }
        case actionTypes.FETCH_SERVED_PATIENTS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.FETCH_SERVED_PATIENTS_SUCCESS:
            const fetchedservedPatients = state.servedPatients
            state.servedPatients.map((item, i)=>{
                return action.patientsArr.map(patient => {
                    if (patient.specialistIndex === i){
                        fetchedservedPatients[i].push(patient)
                    }
                    return item
                })
            })
            console.log(fetchedservedPatients)
            return {
                ...state,
                loading: false,
                servedPatients: fetchedservedPatients

            }
        default: return state
    }
}

export default reducer;