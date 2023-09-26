import React from "react";
import Axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function withUrlParams(Component) {
    return function WrappedComponent(props) {
      const params = useParams();
      return <Component {...props} params={params} />;
    }
}

class DetailPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            product: {},
            images: [],
            price: 0,
            qty: 1,
            toLogin: false
        }
    }
    onInc = () => {
        // tiap klik akan mengubah state qty
        if (this.state.qty < this.state.product.stock) {
            return this.setState({ qty: +(this.state.qty + 1) })
        // jika sudah maks stock, maka tidak bisa ditambah
        } else {
            return
        }
    }
    onDec = () => {
        // tiap klik akan mengubah state qty
        if (this.state.qty > 1) {
            return this.setState({ qty: +(this.state.qty - 1) })
        // jika sudah minimum (jumlah 1), maka tidak bisa dikurang
        } else {
            return
        }
    }
    onInp = (e) => {
        // to makse sure the input is in range between 1 and max stock
        if (e.target.value > 0 && e.target.value <= this.state.product.stock) {
            this.setState({ qty: +e.target.value })
        } else if (e.target.value === "") {
            this.setState({ qty: "" })
        } else if (e.target.value < 1) {
            this.setState({ qty: 1 })
        } else {
            this.setState({ qty: this.state.product.stock })
        } 
    }
    onCart = () => {
        let userId = this.props.userId;
        if (!userId) {
            return this.setState({ toLogin: true })
        };
        let { id } = this.props.params;
        let data = {
            id: +id, // id from params is a string, so I have to change it
            name: this.state.product.name,
            image: this.state.images[0],
            price: this.state.price,
            qty: this.state.qty
        };
        let newStock = this.state.product.stock - data.qty;
        let newDataProd = this.state.product;
        // this line below is action
        this.props.addToCart(userId, data);
        // this line below, updating data product stock in local state
        this.setState({ product: {...newDataProd, stock: newStock} })
        // sementara alert dulu, nanti bikin redirect ke page lain
        alert('Sudah masuk ke keranjang');
    }
    componentDidMount() {
        // this is actually using useParams from react-router-dom
        // const { id } = useParams()
        const { id } = this.props.params;
        Axios.get(`https://havelar-db.onrender.com/products/${id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    product: response.data,
                    images: response.data.images,
                    price: response.data.price
                })
            })
    }
    render() {
        // Kalo login berhasil (username di globalstate terisi), maka redirect ke home
        if (this.state.toLogin) {
            return <Navigate to='/login' />
            // note: Navigate adalah syntax baru dari Redirect dari react-router-dom
        }
        return (
            <div className="my-detail-cont">
                <Carousel className="my-detail-caro-cont">
                    {this.state.images.map((item, index) => (
                        <Carousel.Item key={index}>
                            <img className="my-detail-carousel-img" src={item} alt='' />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className="my-detail-desc-cont">
                    <h2>{this.state.product.name}</h2>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <th>Description</th>
                                <td>{this.state.product.description}</td>
                            </tr>
                            <tr>
                                <th>Brand</th>
                                <td>{this.state.product.brand}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{this.state.price.toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}</td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>{this.state.product.stock}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <p>Input jumlah pesanan:</p>
                    <div className="my-detail-btn-cont">
                        <Button onClick={this.onDec} variant="secondary">-</Button>
                        <Form.Control
                            style={styles.formControl}
                            type="number"
                            min={1}
                            max={this.state.product.stock}
                            value={this.state.qty}
                            // onChange={e => this.setState({ qty: +e.target.value })}
                            onChange={this.onInp}
                        />
                        <Button onClick={this.onInc} variant="secondary">+</Button> 
                        {this.props.userRole === "admin" ?
                        null :
                        <Button onClick={this.onCart} variant="success"><i className="fa-solid fa-cart-plus"></i> Add to Cart</Button> 
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    formControl: {
        width: "5rem",
        border: "1px solid blue"
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id,
        userRole: state.userReducer.role
    }
}

export default connect(mapStateToProps, { addToCart })(withUrlParams(DetailPage))