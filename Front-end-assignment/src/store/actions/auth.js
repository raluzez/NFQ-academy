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
      error
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
                dispatch(checkSpecialist(response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const checkSpecialistFail = (error) => {
    return {
        type: actionTypes.CHECK_SPECIALIST_FAIL,
        error
    }
}

export const checkSpecialistSuccess = (index) => {
    return {
        type: actionTypes.CHECK_SPECIALIST_SUCCESS,
        index
    }
}

export const checkSpecialist = (userId) => {
  return dispatch => {
    axios.get("https://nfq-academy-ac4e1.firebaseio.com/specialists.json")
      .then(response => {
        let index = null
        for (const id in response.data){
          if( id === userId ){
            index = response.data[id]
            dispatch(checkSpecialistSuccess(index))
          }
        }
        if (index === null) {
          dispatch(checkSpecialistSuccess(null)
          )}   
      })
      .catch(error => {
        dispatch(checkSpecialistFail(error.response.data.error))
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
  
export const authCheckLogin = () => {
    return dispatch => {
      dispatch(authStart())
      const token = localStorage.getItem("token")
      if (!token) {
        dispatch(logout())
      } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"))
        if (expirationDate > new Date()){
          const userId = localStorage.getItem("userId")
          dispatch(authSuccess(token, userId))
          dispatch(checkSpecialist(userId))
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        } else {
          dispatch(logout())
        }
      }
    }
  }