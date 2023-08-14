import React from "react";
import { 
    InputGroup,
    Form,
    Button,
    Modal
 } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, errorLoginFalse } from "../redux/actions";
import "./styles.css"

class LoginPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            // ini state buat modal kalo input kosong
            error: false,
        }
    }
    onLogin = () => {
        // Apa aja yg dilakuin?
        // Ambil data input usernama & password
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        // Peringatan kalo input kosong
        if (!username || !password) {
            return this.setState({error: true})
        }
        // Cek database ada apa ga data username, lihat user-action
        this.props.login(username, password)
    }

    render() {
        // Kalo login berhasil (username di globalstate terisi), maka redirect ke home
        if (this.props.username) {
            return <Navigate to='/' />
            // note: Navigate adalah syntax baru dari Redirect dari react-router-dom
        }

        return (
            <div className="my-login-div">
                <div className="my-login-cont">
                    <h1>Hello,</h1>
                    <p>welcome back!</p>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Username"
                            // ref ini buat ambil data buat function onLogin
                            ref="username"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            // pake bootstrap type="password", kalo di video pake function buat hidden password
                            type='password'
                            placeholder="Password"
                            // sama, ref ini buat ambil data
                            ref="password"
                        />
                    </InputGroup>
                    <Button variant="light" onClick={this.onLogin}>Login</Button>
                    <p>Already have an account? <Link to='/register'>Register</Link></p>
                </div>
                {/* Modal (notif) jika input kosong */}
                <Modal show={this.state.error}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please input all data</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({error: false})}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal (notif) buat error username ga ada di database */}
                <Modal show={this.props.errorLogin}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This account doesn't exist</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.errorLoginFalse}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errorLogin: state.userReducer.errorLogin,
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps, {login, errorLoginFalse})(LoginPage)