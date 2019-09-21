import * as actionTypes from "../actions/actionTypes";
import Data from "../../dummyData.json";

const initialState = {
    clickedJumbotron: null,
    showJumbotronModal: false,
    data: Data,
    timerOn: false,
    registrationSuccessful: false,
    registrationSuccessData: {},
    withPatient: false
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
            const lastClient = () => {
                let lastClient = {
                    name: action.specialistData.lastClientName,
                    timeLeft: -action.specialistData.visitTime
                }
                if(action.specialistData.clients[action.specialistData.clients.length] > 0) {
                    lastClient = action.specialistData.clients[action.specialistData.clients.length-1]
                } 
                return lastClient
            }    
            const clientName = lastClient().name+1
            const timeLeft = lastClient().timeLeft + action.specialistData.visitTime
            const client = {name:clientName, timeLeft:timeLeft}
            const specialistIndex = () => {
                let index = 0
                for( let i=0; i< state.data.length; i++){
                    if(state.data[i].name === action.specialistData.name){
                        index = i
                        break
                    }
                }
                return index
            }
            const newClients = state.data[specialistIndex()].clients.concat(client)
            let specialist = state.data[specialistIndex()]
            let data = state.data
            specialist.clients = newClients
            specialist.lastClientName = clientName
            data[specialistIndex()]= specialist 
            return {
                ...state,
                registrationSuccessful: true,
                data: data,
                registrationSuccessData: {
                    name: clientName,
                    timeLeft: timeLeft,
                    specialistName : specialist.name
                }
                }
        // need to rewrite this case in more estetic way
        case actionTypes.CALL_PATIENT:
            return {
                ...state,
                withPatient: true  
            }
        case actionTypes.PATIENT_SERVED:
            const visitTimeLeft = state.data[action.specialistIndex].clients[0].timeLeft
            const leftClientsList = state.data[action.specialistIndex].clients.slice(1)
            const newClientsList = () => {
                return leftClientsList.map(client => {
                    client.timeLeft -= visitTimeLeft
                    return client
                })
            }
            const newSpecialisData = {...state.data[action.specialistIndex], clients: newClientsList()}
            const updateData = () => {
                return state.data.map(specialistData => {
                    if(state.data.indexOf(specialistData) === action.specialistIndex){
                        return newSpecialisData
                    } else { return specialistData }
                })
            }
            return {
                ...state,
                withPatient: false,
                data: updateData()
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