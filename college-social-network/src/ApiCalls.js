import axios from 'axios'

export const studentLoginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("http://localhost:5000/student/loginStudent", userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}

export const staffLoginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("http://localhost:5000/faculty/staffAuth", userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}

export const placementOfficerLoginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("http://localhost:5000/placementOfficerAuth", userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}

