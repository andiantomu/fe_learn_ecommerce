import React from "react";
import { 
    Form,
    Button,
 } from "react-bootstrap";
 import { Link } from "react-router-dom";
 import "./styles.css"

class RegisPage extends React.Component {
    render() {
        return (
            <div className="my-login-div">
                <div className="my-login-cont">
                    <h1>Hello,</h1>
                    <p>welcome!</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control type="text" rows={3} placeholder="New Username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Control type="password" placeholder="New Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                    </Form>
                    <Button variant="light">Register</Button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        )
    }
}

export default RegisPage