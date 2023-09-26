import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
    Carousel,
    Button,
    Card,
    Pagination
} from 'react-bootstrap';

class HomePage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            carousels: [],
            products: [],
            currentPage: 1
        }
    }
    componentDidMount() {
        Axios.get('https://havelar-db.onrender.com/slider')
        .then(response => {
            this.setState({ carousels: response.data })
        })
        .catch(error => {
            console.error('error fetching data slider', error);
        });
        Axios.get('https://havelar-db.onrender.com/products')
        .then(response => {
            this.setState({ products: response.data })
        })
        .catch(error => {
            console.error('error fetching data product', error);
        });
    }
    render() {
        const itemsPerPage = 4;
        const indexOfLastItem = this.state.currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = this.state.products.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(this.state.products.length / itemsPerPage);
        return (
            <div>
                <Carousel>
                    {this.state.carousels.map((item, index) => (
                    <Carousel.Item className="my-carousel-img" key={index}>
                        <img src={item.image} alt='' />
                        <Carousel.Caption className='my-carousel-text'>
                        <h3>{item.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
                <div className='my-product-cont'>
                    {currentItems.map(item => (
                    <Card key={item.id} className="my-card bg-dark text-white">
                        <Card.Img className='my-card-img' variant="top" src={item.images} />
                        <Card.Body>
                            <Card.Title className="my-card-title">
                                {item.name}
                            </Card.Title>
                            <Card.Text>
                                {item.price.toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className='my-card-btn-cont'>
                            <Button
                            className='my-card-btn'
                            as={Link}
                            to={`/detail/${item.id}`}
                            // lihat set up route di App.js, pake dynamic url
                            variant="light">
                                <i className="fa-solid fa-cart-shopping"></i> Buy/See Detail
                            </Button>
                        </Card.Body>
                    </Card>
                    ))}
                </div>
                <div className="my-pagination">
                    <Pagination>
                        {this.state.currentPage <= 1 ?
                            <Pagination.First disabled />:
                            <Pagination.First onClick={() => this.setState({ currentPage: 1 })} />
                        }
                        {this.state.currentPage <= 1 ?
                            <Pagination.Prev disabled />:
                            <Pagination.Prev onClick={() => this.setState({ currentPage: (this.state.currentPage - 1) })} />
                        }
                        {this.state.currentPage <= 2 ?
                            null :
                            <Pagination.Item onClick={() => this.setState({ currentPage: 1 })}>
                                {1}
                            </Pagination.Item>
                        }
                        {this.state.currentPage <= 3 ?
                            null :
                            <Pagination.Ellipsis />
                        }
                        {this.state.currentPage < 2 ?
                            null :
                            <Pagination.Item onClick={() => this.setState({ currentPage: (this.state.currentPage - 1) })}>
                                {this.state.currentPage - 1}
                            </Pagination.Item>
                        }
                        <Pagination.Item active>
                            {this.state.currentPage}
                        </Pagination.Item>
                        {this.state.currentPage > totalPages-2 ?
                            null :
                            <Pagination.Item onClick={() => this.setState({ currentPage: (this.state.currentPage + 1) })}>
                                {this.state.currentPage + 1}
                            </Pagination.Item>
                        }
                        {this.state.currentPage > totalPages-3 ?
                            null :
                            <Pagination.Ellipsis />
                        }
                        {this.state.currentPage >= totalPages ?
                            null :
                            <Pagination.Item onClick={() => this.setState({ currentPage: totalPages })}>
                                {totalPages}
                            </Pagination.Item>
                        }
                        {this.state.currentPage >= totalPages ?
                            <Pagination.Next disabled />:
                            <Pagination.Next onClick={() => this.setState({ currentPage: (this.state.currentPage + 1) })} />
                        }
                        {this.state.currentPage >= totalPages ?
                            <Pagination.Last disabled />:
                            <Pagination.Last onClick={() => this.setState({ currentPage: totalPages })} />
                        }
                    </Pagination>
                    <Button as={Link} to={'/products'} variant='primary'>See All Products</Button>
                </div>
            </div>
        )
    }
}

export default HomePage