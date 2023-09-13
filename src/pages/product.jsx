import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    Pagination
} from 'react-bootstrap';

class ProductPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            products: [],
            currentPage: 1
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/products')
        .then(response => {
            this.setState({ products: response.data })
        })
        .catch(error => {
            console.error('error fetching data product', error);
        });
    }
    render() {
        const itemsPerPage = 8;
        const indexOfLastItem = this.state.currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = this.state.products.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(this.state.products.length / itemsPerPage);
        console.log(totalPages)
        return (
            <div className="my-base-cont">
                <div className='my-product-cont'>
                    {currentItems.map(item => (
                    <Card key={item.id} style={{ width: '18rem' }}>
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
                            <Button className='my-card-btn' variant="primary">Wish</Button>
                            <Button
                            className='my-card-btn'
                            as={Link}
                            to={`/detail/${item.id}`}
                            // lihat set up route di App.js, pake dynamic url
                            variant="primary">
                                Buy
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
                </div>
            </div>
        )
    }
}

export default ProductPage