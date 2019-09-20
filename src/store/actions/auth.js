import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    }
  }
  
export const authSuccess = (token, userId) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
    }
  }
  
export const authFail = (error) => {
    return {
      type: actionTypes.AUTH_FAIL,
      error: error
    }
  }

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIQjITVt2V1MNvWLT3y5TIOu904o8TmH0"
        if (isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIQjITVt2V1MNvWLT3y5TIOu904o8TmH0"
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000)
                localStorage.setItem("token", response.data.idToken)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("userId", response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}