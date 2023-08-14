import Axios from "axios";

export const login = (username, password) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
        .then(res => {
            if (res.data.length === 0) {
                // Kalo gak ada, kasih info
                return dispatch({
                    type: 'ERROR_LOGIN'
                })
            } else {
                // Kalo ada
                // Simpan di local storage
                localStorage.setItem('iduser', res.data[0].id)
                // data user dikirim ke redux
                return dispatch({
                    type: `LOGIN`,
                    payload: res.data[0]
                })
            }
        })
    }
}

export const errorLoginFalse = () => {
    return (dispatch) => {
        return dispatch({
            type: 'ERROR_LOGIN_FALSE'
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        // ngeclear data di localstorage
        localStorage.removeItem('iduser')
        
        return dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
        .then(res => {
            return dispatch({
                type: 'LOGIN',
                payload: res.data
            })
        })
    }
}

export const regDataValid = (username, email, data) => {
    return (dispatch) => {
        // cek apakah sudah ada username tsb di datanbase
        Axios.get(`http://localhost:2000/users?username=${username}`)
        .then(res => {
            // kalo sudah ada ada, maka
            if (res.data.length !== 0) {
                return dispatch({
                    type: 'REG_INVALID'
                })
            } else {
                // kalo tidak ada, maka berikutnya cek apakah sudah ada email tsb di datanbase
                Axios.get(`http://localhost:2000/users?email=${email}`)
                .then(res => {
                    // kalo sudah ada ada, maka reducer case di bawah ini:
                    if (res.data.length !== 0) {
                        return dispatch({
                            type: 'REG_INVALID'
                        })
                    } else {
                        // kalo benar ga ada, maka reducer case di bawah ini:
                        Axios.post('http://localhost:2000/users/', data)
                        .then(res => {
                            return dispatch({
                                type: 'REG_SUCCESS',
                            })
                        })
                    }
                })
            }
        })
    }
}

export const regInvaErr = () => {
    return (dispatch) => {
        return dispatch({
            type: 'REG_INVALID_ERROR'
        })
    }
}