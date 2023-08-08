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
            // local state buat bikin tampilan password
            // visibility: false
            // ini state buat modal kalo input kosong
            error: false,
        }
    }
    // onVisIcon = () => {
    //     this.setState({visibility: !(this.state.visibility)})
    // }
    // sorry gak jadi kepake, soalnya si bootstrap udah nyediain pake type='password'

    onLogin = () => {
        // Apa aja yg dilakuin?
        // Ambil data input usernama & password
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        // Peringatan kalo input kosong
        if (!username || !password) {
            return this.setState({error: true})
        }
        // Cek database ada apa ga data username, pake axios (udah dipindahin pake thunk)
        this.props.login(username, password)
    }

    render() {
        // Kalo login berhasiil, redirect ke home
        if (this.props.username) {
            return <Navigate to='/' />
        }
        // ini namanya object deconstrutary
        // const { visibility } = this.state

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
                    {/* <InputGroup className="mb-3">
                        <InputGroup.Text onClick={this.onVisIcon}>
                            {visibility ? '@' : '--'}
                        </InputGroup.Text>
                        <Form.Control type={visibility ? 'text' : 'password'} placeholder="Password" />
                    </InputGroup> */}
                    <InputGroup className="mb-3">
                        <Form.Control
                            type='password'
                            placeholder="Password"
                            // sama, ref ini buat ambil data
                            ref="password"
                        />
                    </InputGroup>
                    <Button variant="light" onClick={this.onLogin}>Login</Button>
                    <p>Already have an account? <Link to='/register'>Register</Link></p>
                </div>
                {/* Modal jika input kosong */}
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
                {/* Modal buat error username ga ada di database */}
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