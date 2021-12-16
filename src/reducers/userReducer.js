const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("USER REDUCER", action.payload)
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, ...action.payload }
        case "REGISTER_SUCCESS":
            return { ...state, ...action.payload }
        default:
            return state
    }
} 