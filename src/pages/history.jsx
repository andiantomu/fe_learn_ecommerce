import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    Accordion,
    Table,
    Image
} from 'react-bootstrap';

class HistoryPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            history: []
        }
    }
    componentDidMount() {
        // if it's admin, then get all the history data
        this.props.userRole === "admin" ?
        (Axios.get(`http://localhost:2000/history`)
        .then(response => {
            this.setState({ history: response.data })
            console.log(response.data);
        })
        .catch(error => {
            console.error('error fetching data slider', error);
        }))
        : // but if it's user, then get only the history of the specific id
        (Axios.get(`http://localhost:2000/history?idUser=${this.props.userId}`)
        .then(response => {
            this.setState({ history: response.data })
            console.log(response.data);
        })
        .catch(error => {
            console.error('error fetching data slider', error);
        }))
    }
    render() {
        // proteksi biar redirect ke login kalo belum
        if (!this.props.userId) {
            return <Navigate to='/login' />
        }
        return (
            <div className="my-base-cont">
                <h2>History Page</h2>
                <Accordion>
                    {this.state.history.reverse().map((item, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{item.username}, {item.time}</Accordion.Header>
                            <Accordion.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Qty</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.product.map((element, index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>
                                                    <Image src={element.image} className="my-cart-img" rounded />
                                                </td>
                                                <td>{element.name}</td>
                                                <td>{element.qty}</td>
                                                <td>{element.price * element.qty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id,
        userRole: state.userReducer.role
    }
}

export default connect(mapStateToProps)(HistoryPage)