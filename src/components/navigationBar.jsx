import React from 'react'
import { 
    Navbar,
    Nav,
    Dropdown,
    Image,
    Container,
    Button
 } from "react-bootstrap";
 import { LOGO } from "../assets";
 import { Link } from "react-router-dom";
 import './styles.css'

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar className='my-navbar' fixed='top'>
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={LOGO} className='my-logo' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={styles.myNavLink} as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link style={styles.myNavLink}>Produk</Nav.Link>
                            <Nav.Link style={styles.myNavLink}>Contact Us</Nav.Link>
                        </Nav>
                        <Button variant="outline-light" className='my-nav-link'>Keranjang</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                Username
                            </Dropdown.Toggle>

                            <Dropdown.Menu data-bs-theme="dark">
                                <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
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

export default NavigationBar