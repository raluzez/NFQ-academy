import * as actionTypes from "../actions/actionTypes";
import Data from "../../dummyData.json";

const initialState = {
    clickedJumbotron: null,
    showJumbotronModal: false,
    data: Data,
    timerOn: false,
    registrationSuccessful: false,
    registrationSuccessData: {}
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
            const newData = timerUpdate(state)
            return {
                ...state,
                data: newData,
                timerOn: true
            }
        case actionTypes.REGISTER_CLIENT:
            const lastClient = action.specialistData.clients[action.specialistData.clients.length-1]
            const clientName = lastClient.name+1
            const timeLeft = lastClient.timeLeft + action.specialistData.visitTime
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