import React from "react";
import { 
    InputGroup,
    Form,
    Button
 } from "react-bootstrap";
 import { Link } from "react-router-dom";
 import "./styles.css"

class LoginPage extends React.Component {
    // local state buat bikin tampilan password
    // constructor (props) {
    //     super(props)
    //     this.state = {
    //         visibility: false
    //     }
    // }
    // onVisIcon = () => {
    //     this.setState({visibility: !(this.state.visibility)})
    // }
    // sorry gak jadi kepake, soalnya si bootstrap udah nyediain pake type='password'

    render() {
        // ini namanya object deconstrutary
        // const { visibility } = this.state

        return (
            <div className="my-login-div">
                <div className="my-login-cont">
                    <h1>Hello,</h1>
                    <p>welcome back!</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control placeholder="Username" />
                    </InputGroup>
                    {/* <InputGroup className="mb-3">
                        <InputGroup.Text onClick={this.onVisIcon}>
                            {visibility ? '@' : '--'}
                        </InputGroup.Text>
                        <Form.Control type={visibility ? 'text' : 'password'} placeholder="Password" />
                    </InputGroup> */}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control type='password' placeholder="Password" />
                    </InputGroup>
                    <Button variant="light">Login</Button>
                    <p>Already have an account? <Link to='/register'>Register</Link></p>
                </div>
            </div>
        )
    }
}

export default LoginPage