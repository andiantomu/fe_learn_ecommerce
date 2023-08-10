const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    role: "",
    errorLogin: false,
    regInvalid: false,
    regSuccess: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role
            }
        case 'ERROR_LOGIN':
            return {
                ...state,
                errorLogin: true
            }
        case 'ERROR_LOGIN_FALSE':
            return {
                ...state,
                errorLogin: false
            }
        case 'LOG_OUT':
            return INITIAL_STATE
        case 'REG_INVALID':
            return {
                ...state,
                regInvalid: true
            }
        case 'REG_INVALID_ERROR':
            return {
                ...state,
                regInvalid: false
            }
        case 'REG_SUCCESS':
            return {
                ...state,
                regSuccess: true
            }
        default:
            return state
    }
}

export default userReducer