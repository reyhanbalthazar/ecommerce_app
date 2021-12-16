import axios from "axios"
import { API_URL } from "../../helper"


export const onLogin = (username, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/dataUser?username=${username}&password=${password}`)
            if (res.data.length > 0) {
                dispatch({
                    // MENYIMPAN DATA KE REDUCER
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const onRegister = (username, email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/dataUser`, {
                username: username,
                email: email,
                password: password,
                role: "user",
                status: "Active",
                cart: []
            })
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data
            })
            return { success: true }
        } catch (error) {
            console.log(error)
        }
    }
}