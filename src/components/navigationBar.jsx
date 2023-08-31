import React from 'react'
import { 
    Navbar,
    Nav,
    Dropdown,
    Image,
    Container,
    Button,
    Badge
 } from "react-bootstrap";
 import { LOGO } from "../assets";
 import { Link } from "react-router-dom";
 import { connect } from "react-redux";
 import { logout } from "../redux/actions";
 import './styles.css'

class NavigationBar extends React.Component {
    onBadge = () => {
        let cart = this.props.userCart;
        let num = cart.length;
        if (num > 0) {
            return num;
        } else {
            return
        }
    }
    render() {
        return (
            <Navbar className='my-navbar' fixed='top'>
                <Container>
                    <Navbar.Brand  as={Link} to='/'>
                        <Image src={LOGO} className='my-logo' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={styles.myNavLink} as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link style={styles.myNavLink}>Product</Nav.Link>
                            <Nav.Link style={styles.myNavLink}>Contact Us</Nav.Link>
                        </Nav>
                        <Button as={Link} to='/cart' variant="outline-light">
                            Cart
                            <Badge bg="success">
                                {this.onBadge()}
                            </Badge>
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {/* kalo login (username di user-reducer terisi) */}
                                {this.props.username ? this.props.username : 'username'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu data-bs-theme="dark">
                                {
                                    // kalo login (username di user-reducer terisi), maka
                                    this.props.username ?
                                    <>
                                        <Dropdown.Item>Profile</Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/history'>History</Dropdown.Item>
                                        <Dropdown.Item onClick={this.props.logout}>Log Out</Dropdown.Item>
                                    </> :
                                    // kalo enggak, maka
                                    <>
                                        <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                                    </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

const styles = {
    myNavLink: {
        color: '#f0f0ee'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        userCart: state.userReducer.cart
    }
}

export default connect(mapStateToProps, {logout})(NavigationBar)