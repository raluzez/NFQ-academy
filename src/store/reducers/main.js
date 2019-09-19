import * as actionTypes from "../actions/actionTypes";
import Data from "../../dummyData.json";

const initialState = {
    clickedJumbotron: null,
    showJumbotronModal: false,
    data: Data,
    timerOn: false
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
        default: return state
    }
}

export default reducer;