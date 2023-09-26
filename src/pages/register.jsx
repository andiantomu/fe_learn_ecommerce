import React from "react";
import { 
    Form,
    Button,
    Modal
 } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { regDataValid, regInvaErr } from "../redux/actions";
import "./styles.css"

class RegisPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameErr: [false, ''],
            emailErr: [false, ''],
            passwordErr: [false, ''],
            modalErr: [false, '']
        }
    }
    userValid = (e) => {
        let symb = /^[a-z0-9_-]{3,16}$/
        let warnText = `Your username must be 3-16 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.`
        if (!symb.test(e.target.value))
        return this.setState({usernameErr: [true, warnText]})
        this.setState({usernameErr: [false, '']})
    }
    emailValid = (e) => {
        let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
        let warnText = `Please input a valid email.`
        if (!regex.test(e.target.value))
        return this.setState({emailErr: [true, warnText]})
        this.setState({emailErr: [false, '']})
    }
    passwordValid = (e) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let warnText = `The password must contain at least one lowercase letter.
        The password must contain at least one uppercase letter.
        The password must contain at least one digit.
        The password must be at least 8 characters long and can only contain letters and digits `
        if (!regex.test(e.target.value))
        return this.setState({passwordErr: [true, warnText]})
        this.setState({passwordErr: [false, '']})
    }
    onRegister = () => {
        // ambil data inputan
        let username = this.refs.username.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let passwordCf = this.refs.passwordCf.value;
        let data = {
            username: username,
            email: email,
            password: password,
            role: 'user',
            cart: []
        }
        // cek udah keisi apa belum
        if (!(username && email && password && passwordCf))
        return this.setState({modalErr: [true, 'Please input all data']})
        // Nanti muncul kotak Modal
        // cek confirm password
        if (!(password === passwordCf))
        return this.setState({modalErr: [true, 'Silahkan konfirmasi password dengan benar.']})
        // Jika semua input sudah benar, maka melakukan action regDataValid (lihat user-action)
        this.props.regDataValid(username, email, data)
    }
    render() {
        if (this.props.regSuccess) {
            return <Navigate to='/login' />
        }
        return (
            <div className="my-login-div">
                <div className="my-login-cont">
                    <h2>Register, and join us!</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                onChange={(e) => this.userValid(e)}
                                type="text"
                                rows={3}
                                placeholder="New Username"
                                ref="username"
                            />
                            <Form.Text style={styles.myFormText}>
                                {this.state.usernameErr[0] ? this.state.usernameErr[1] : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                onChange={(e) => this.emailValid(e)}
                                type="email"
                                placeholder="Email"
                                ref="email"
                            />
                            <Form.Text style={styles.myFormText}>
                                {this.state.emailErr[0] ? this.state.emailErr[1] : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(e) => this.passwordValid(e)}
                                type="password"
                                placeholder="New Password"
                                ref="password"
                            />
                            <Form.Text style={styles.myFormText}>
                                {this.state.passwordErr[0] ? this.state.passwordErr[1] : ''}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPasswordCF">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref="passwordCf" />
                        </Form.Group>
                    </Form>
                    <Button variant="light" className='mb-2' onClick={this.onRegister}>Register</Button>
                    <p>Already have an account? <Link to='/login' style={styles.myLink}>Login</Link></p>
                </div>
                <Modal show={this.state.emptyErr}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.modalErr[1]}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({emptyErr: [false, '']})}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.regInvalid}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Username atau email sudah terdaftar</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.regInvaErr}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    myLink: {
        color: '#f0f0ee'
    },
    myFormText: {
        color: 'yellow'
    }
}

const mapStateToProps = (state) => {
    return {
        regInvalid: state.userReducer.regInvalid, // dipanggil oleh line 137
        regSuccess: state.userReducer.regSuccess // dipanggil oleh line 70
    }
} 

export default connect(mapStateToProps, { regDataValid, regInvaErr })(RegisPage)