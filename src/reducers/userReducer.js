const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    photo: "",
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("USER REDUCER", action.payload)
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, ...action.payload }
        case "REGISTER_SUCCESS":
            return { ...state, ...action.payload }
        case "UPDATE_CART":
            return { ...state, cart: action.payload }
        case "UPDATE_PHOTO":
            return { ...state, photo: action.payload }
        case "UPDATE_USER":
            return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
} 