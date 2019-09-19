import * as actionTypes from "./actionTypes";

export const jumbotronClicked = (jumbotronData) => {
    return {
        type: actionTypes.JUMBOTRON_CLICKED,
        jumbotronData
    }
}

export const closeJumbotronModal = () => {
    return {
        type:actionTypes.CLOSE_JUMBOTRON_MODAL
    }
}