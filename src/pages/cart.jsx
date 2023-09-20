import React from "react";
import { connect } from "react-redux";
import { saveCart, delCart, checkout } from "../redux/actions";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import {
    Table,
    Image,
    Button,
    Form,
    Modal,
    InputGroup
} from "react-bootstrap";

class CartPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            userCart: [],
            products: [],
            passConfirm: false
        }
    }
    onCheckOut = () => {
        if (this.state.userCart.length === 0) {
            return alert("keranjang kosong")
        } else {
            return this.setState({ passConfirm: true })
        }
    }
    onConfirm = () => {
        let password = this.refs.password.value;
        if (password === this.props.userPass) {
            let data = {
                idUser: this.props.userId,
                username: this.props.username,
                time: new Date(Date.now()).toLocaleString(),
                product: this.props.userCart
            };
            this.setState({userCart: []})
            this.props.checkout(data, this.props.userId)
            this.setState({passConfirm: false})
            alert('Berhasil Checkout')
        } else {
            alert("password salah")
        }
    }
    onCancel = (id) => {
        // loop data inside cart, finding the corespondence id to edit
        let updateCancel = this.state.userCart.map(item => {
            if (item.id === id) {
                // set the property editMode to be false
                return {...item, editMode: false, tempQty: item.qty}
            }
            return item
        })
        return this.setState({ userCart: updateCancel })
    }
    onEdit = (id) => {
        // loop data inside cart, finding the corespondence id to edit
        let updateEdit = this.state.userCart.map(item => {
            if (item.id === id) {
                // set the property editMode to be true
                return {...item, editMode: true}
            }
            return item
        })
        return this.setState({ userCart: updateEdit })
    }
    onDelete = (a, b) => {
        let idProduct = a;
        let qtyDeleted = b;
        // find the exact item in cart
        let tempCart = this.state.userCart;
        let updCart = tempCart.filter(item => item.id !== idProduct)
        this.setState({ userCart: updCart })
        // find the exact item in prod
        let tempProd = this.state.products;
        let findItemProd = tempProd.find(item => item.id === idProduct);
        // assign qty that has been deleted to stock
        findItemProd.stock += qtyDeleted;
        this.setState({ products: tempProd })
        // run the redux action to change the database too
        let userId = this.props.userId;
        this.props.delCart(userId, idProduct, qtyDeleted);
    }
    onDec = (tempQty, idProduct) => {
        // find the exact item
        let tempCart = this.state.userCart;
        let findItemCart = tempCart.find(item => item.id === idProduct);
        // if the number less than stock,
        if (tempQty > 1) {
            findItemCart.tempQty = +(tempQty-1);
            return this.setState({ userCart: tempCart })
        // jika sudah minimum (jumlah 1), maka tidak bisa dikurang
        } else {
            return
        }
    }
    onInc = (tempQty, idProduct, qty) => {
        // First, neutralize stock (stock must be sum of stock in db + cart qty)
        let findItemProd = this.state.products.find(item => item.id === idProduct);
        let stock = findItemProd.stock + qty;
        // find the exact item
        let tempCart = this.state.userCart;
        let findItemCart = tempCart.find(item => item.id === idProduct);
        // if the number less than stock,
        if (tempQty < stock) {
            findItemCart.tempQty = +(tempQty+1);
            return this.setState({ userCart: tempCart })
        // jika sudah minimum (jumlah 1), maka tidak bisa dikurang
        } else {
            return
        }
    }
    onInp = (e, idProduct, qty) => {
        // First, make stock temporary (stock must be sum of stock in db + cart qty)
        let findItemProd = this.state.products.find(item => item.id === idProduct);
        let stock = findItemProd.stock + qty;
        // find the exact item
        let tempCart = this.state.userCart;
        let findItemCart = tempCart.find(item => item.id === idProduct);
        // to makse sure the input is in range between 1 and max stock
        if (e.target.value > 0 && e.target.value <= 9) {
            findItemCart.tempQty = +e.target.value;
            return this.setState({ userCart: tempCart })
        } else if (e.target.value === "") {
            findItemCart.tempQty = "";
            return this.setState({ userCart: tempCart })
        } else if (e.target.value < 1) {
            findItemCart.tempQty = 1;
            return this.setState({ userCart: tempCart })
        } else {
            findItemCart.tempQty = stock;
            return this.setState({ userCart: tempCart })
        } 
    }
    onSave = (idProduct) => {
        // find the exact item in cart
        let tempCart = this.state.userCart;
        let findItemCart = tempCart.find(item => item.id === idProduct);
        let qtyEdited = findItemCart.qty - findItemCart.tempQty
        // assign tempQty to actual qty
        let newQty = findItemCart.tempQty;
        findItemCart.qty = newQty;
        this.setState({ userCart: tempCart })
        // find the exact item in prod
        let tempProd = this.state.products;
        let findItemProd = tempProd.find(item => item.id === idProduct);
        // assign selisih to stock
        let newStock = findItemProd.stock + qtyEdited;
        findItemProd.stock = newStock;
        this.setState({ products: tempProd })
        // run the redux action to change the database too
        let userId = this.props.userId;
        this.props.saveCart(userId, idProduct, qtyEdited);
        this.onCancel(idProduct)
    }
    componentDidMount() {
        // taking data from cart from global state, adding property "editMode" and "tempQty" to be used in function later
        let updatedArray = this.props.userCart.map(obj =>
            ({
                ...obj,
                editMode: false,
                tempQty: obj.qty
            }));
        // store data from that modified data cart from global state to local state
        this.setState({ userCart: updatedArray });
        // Berikutnya saya get data stock
        // saya tidak mengikuti metode tutor (data stock masuk global state cart user), karena menurut saya, data stock butuh update
        Axios.get('https://havelar-db.onrender.com/products')
        .then(response => {
            let productStock = []
            response.data.forEach(item => {
                productStock.push({ id: item.id, stock: item.stock })
            });
            this.setState({ products: productStock })
        })
        .catch(error => {
            console.error('error fetching data product', error);
        });
    }
    render() {
        // Cek login atau belum
        if (!this.props.userId) {
            return <Navigate to='/login' />
            // note: Navigate adalah syntax baru dari Redirect dari react-router-dom
        }
        return (
            <div className="my-base-cont">
                <div className="my-cart-heading">
                    <h2>Cart</h2>
                    <Button onClick={this.onCheckOut} variant="primary">Checkout</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userCart.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>
                                        <Image src={item.image} className="my-cart-img" rounded />
                                    </td>
                                    <td>{item.name}</td>
                                    {item.editMode ?
                                    <td className="my-detail-btn-cont">
                                        <Button onClick={() =>this.onDec(item.tempQty, item.id)} variant="primary">-</Button>
                                        <Form.Control
                                            // style={styles.formControl}
                                            type="number"
                                            // min={1}
                                            // max={9}
                                            value={item.tempQty}
                                            // onChange={e => this.setState({ qty: +e.target.value })}
                                            onChange={(e) => this.onInp(e, item.id, item.qty)}
                                        />
                                        <Button onClick={() =>this.onInc(item.tempQty, item.id, item.qty)} variant="primary">+</Button>
                                    </td> : 
                                    <td>{item.qty}</td>}
                                    <td>{(item.qty*item.price).toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}</td>
                                    {item.editMode ?
                                    <td>
                                        <Button onClick={() => this.onSave(item.id)} variant="danger">Save</Button>
                                        <Button onClick={() => this.onCancel(item.id)} variant="primary">Cancel</Button>
                                    </td> : 
                                    <td>
                                        <Button onClick={() => this.onEdit(item.id)} variant="primary">Edit</Button>
                                        <Button onClick={() => this.onDelete(item.id, item.qty)} variant="danger">Delete</Button>
                                    </td>}
                                </tr>
                            )
                        })}
                        {/* <tr>
                            <td>
                                <button onClick={this.onTry}>cek console</button>
                            </td>
                        </tr> */}
                    </tbody>
                </Table>
                <Modal show={this.state.passConfirm} onHide={() => this.setState({passConfirm: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Password</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type='password'
                                placeholder="Password"
                                ref="password"
                            />
                        </InputGroup>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="light" onClick={this.onConfirm}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id,
        userCart: state.userReducer.cart,
        userPass: state.userReducer.password,
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps, { saveCart, delCart, checkout })(CartPage)