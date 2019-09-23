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
    ]
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
                data: action.data
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
                registrationSuccessData: action.registrationSuccessData
                }
        // need to rewrite this case in more estetic way
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
            const visitTimeLeft = state.data[action.specialistIndex].clients[0].timeLeft+state.data[action.specialistIndex].visitTime
            const leftClientsList = state.data[action.specialistIndex].clients.slice(1)
            const servedPatient = state.data[action.specialistIndex].clients[0] 
            const newClientsList = () => {
                return leftClientsList.map(client => {
                    client.timeLeft -= (visitTimeLeft-1)
                    return client
                })
            }
            const newSpecialisData = {...state.data[action.specialistIndex], clients: newClientsList(), servedPatients:state.data[action.specialistIndex].servedPatients.concat(servedPatient)}
            const updateData = () => {
                return state.data.map(specialistData => {
                    if(state.data.indexOf(specialistData) === action.specialistIndex){
                        return newSpecialisData
                    } else { return specialistData }
                })
            }
            console.log(updateData())
            let withPatientFalse = [...state.withPatient]
            withPatientFalse[action.specialistIndex] = false
            return {
                ...state,
                withPatient: withPatientFalse,
                data: updateData(),
                loading: false
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
        default: return state
    }
}

export default reducer;