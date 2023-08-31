import Axios from "axios";

export const addToCart = (userId, data) => {
    return (dispatch) => {
        // ambil dulu data user
        Axios.get(`http://localhost:2000/users/${userId}`)
        .then(response => {
            let tempCart = response.data.cart;
            // search ada apa ga data di cart user
            let existingData = tempCart.find(item => item.id === data.id);
            // kalo tidak ada data
            if (!existingData) {
                // masukin data product tempCart
                tempCart.push(data);
            } else {
                // maka quantitasnya doang
                existingData.qty += data.qty;
            }
            // masukin ke database
            Axios.patch(`http://localhost:2000/users/${userId}`, { cart: tempCart })
            .then(response => {
                // get data product dengan id yg dibeli
                Axios.get(`http://localhost:2000/products/${data.id}`)
                .then(response => {
                    // kurangi data stock nya dengan qty yg dibeli
                    let newStock = response.data.stock - data.qty;
                    Axios.patch(`http://localhost:2000/products/${data.id}`, {stock: newStock})
                    .then(response => {
                        // get lagi data user yg udah update cart-nya
                        Axios.get(`http://localhost:2000/users/${userId}`)
                        .then(response => {
                            // masukkan lagi data update user ke reducer global state
                            return dispatch({
                                type: `LOGIN`,
                                payload: response.data
                            })
                        })
                    })
                })
            })
        })
    }
}

export const saveCart = (userId, productId, qtyEdited) => {
    return (dispatch) => {
        // Pertama, tambahkan stock barang sesuai dengan data quantitas barang yg didelete
        Axios.get(`http://localhost:2000/products/${productId}`)
        .then(response => {
            let newStock = response.data.stock + qtyEdited;
            Axios.patch(`http://localhost:2000/products/${productId}`, {stock: newStock})
            .then(response => {
                // Next, cari cart user, quantitas barang yg dimaksud, jadikan 0
                Axios.get(`http://localhost:2000/users/${userId}`)
                .then(response => {
                    let tempCart = response.data.cart;
                    let findItem = tempCart.find(item => item.id === productId);
                    findItem.qty -= qtyEdited;
                    Axios.patch(`http://localhost:2000/users/${userId}`, { cart: tempCart })
                    .then(response => {
                        // Next, update lagi data user yg di global state
                        Axios.get(`http://localhost:2000/users/${userId}`)
                        .then(response => {
                            return dispatch({
                                type: `LOGIN`,
                                payload: response.data
                            })
                        })
                    })
                })
            })
        })
    }
}

export const delCart = (userId, productId, qtyEdited) => {
    return (dispatch) => {
        // Pertama, tambahkan stock barang sesuai dengan data quantitas barang yg didelete
        Axios.get(`http://localhost:2000/products/${productId}`)
        .then(response => {
            let newStock = response.data.stock + qtyEdited;
            Axios.patch(`http://localhost:2000/products/${productId}`, {stock: newStock})
            .then(response => {
                // Next, cari cart user, dengan id spesifik, delete
                Axios.get(`http://localhost:2000/users/${userId}`)
                .then(response => {
                    let tempCart = response.data.cart;
                    let updCart = tempCart.filter(item => item.id !== productId)
                    Axios.patch(`http://localhost:2000/users/${userId}`, { cart: updCart })
                    .then(response => {
                        // Next, update lagi data user yg di global state
                        Axios.get(`http://localhost:2000/users/${userId}`)
                        .then(response => {
                            return dispatch({
                                type: `LOGIN`,
                                payload: response.data
                            })
                        })
                    })
                })
            })
        })
    }
}

export const checkout = (data, userId) => {
    return (dispatch) => {
        Axios.post('http://localhost:2000/history/', data)
        .then(response => {
            return dispatch({
                type: 'CHECKOUT',
                payload: response.data
            })
        })
        .then(response => {
            Axios.patch(`http://localhost:2000/users/${userId}`, { cart: [] })
            .then(response => {
                return dispatch({
                    type: `LOGIN`,
                    payload: response.data
                })
            })
        })
    }
}