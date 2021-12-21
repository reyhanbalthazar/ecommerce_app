import AsyncStorageLib from "@react-native-async-storage/async-storage"
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
                await AsyncStorageLib.setItem("dataUser", JSON.stringify(res.data[0]))
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const onLogout = () => {
    return async (dispatch) => {
        await AsyncStorageLib.removeItem("dataUser")
        dispatch({ type: "LOGOUT" })
    }
}

export const onKeepLogin = () => {
    return async (dispatch) => {
        try {
            let dataUser = await AsyncStorageLib.getItem("dataUser")
            dataUser = JSON.parse(dataUser)
            console.log("Membaca data dari AsyncStorage", dataUser)
            if (dataUser.id) {
                let res = await axios.get(`${API_URL}/dataUser?id=${dataUser.id}`)
                if (res.data.length > 0) {
                    dispatch({
                        // MENYIMPAN DATA KE REDUCER
                        type: "LOGIN_SUCCESS",
                        payload: res.data[0]
                    })
                    await AsyncStorageLib.setItem("dataUser", JSON.stringify(res.data[0]))
                    return { success: true }
                }
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
                photo: "https://w7.pngwing.com/pngs/980/886/png-transparent-male-portrait-avatar-computer-icons-icon-design-avatar-flat-face-icon-people-head-cartoon-thumbnail.png",
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

export const updateUserCart = (data, iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/dataUser/${iduser}`, {
                cart: data
            })

            console.log("res.data dalam updateUserCart", res.data)

            dispatch({
                type: "UPDATE_CART",
                payload: res.data.cart
            })

            return { success: true }
        } catch (error) {
            console.type(error)
        }
    }
}

export const updateUserPhoto = (image, iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/dataUser/${iduser}`, {
                photo: image
            })

            dispatch({
                type: "UPDATE_PHOTO",
                payload: res.data.photo
            })

            return { success: true }

        } catch (error) {
            console.log(error)
        }
    }
}