import * as actionTypes from "../actions/actionTypes";

const initialState = {
    clickedJumbotron: null,
    showJumbotronModal: false
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
        default: return state
    }
}

export default reducer;