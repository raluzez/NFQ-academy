import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const auth = (email, password, login) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKF538j0hsnR4r0kIRHSmW1RIRj-LN0cA"
        if (login) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKF538j0hsnR4r0kIRHSmW1RIRj-LN0cA"
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

export const resetError = () => {
    return {
        type: actionTypes.RESET_ERROR
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout())
      }, expirationTime*1000)
    }
  }

  export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
      type: actionTypes.LOGOUT
    }
  }