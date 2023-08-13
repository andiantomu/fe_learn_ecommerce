import React from "react";
import Axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class HomePage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            carousels: [],
            products: []
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/slider')
        .then(response => {
            this.setState({ carousels: response.data })
        })
        .catch(error => {
            console.error('error fetching data slider', error);
        });
        Axios.get('http://localhost:2000/products')
        .then(response => {
            this.setState({ products: response.data })
        })
        .catch(error => {
            console.error('error fetching data product', error);
        });
    }
    render() {
        return (
            <div>
                <Carousel>
                    {this.state.carousels.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img className="my-carousel-img" src={item.image} alt='' />
                        <Carousel.Caption className='my-carousel-text'>
                        <h3>{item.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
                <div className='my-product-cont'>
                    {this.state.products.map(item => (
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
                            <Button className='my-card-btn' variant="primary">Buy</Button>
                        </Card.Body>
                    </Card>
                    ))}
                </div>
            </div>
        )
    }
}

// const styles = {
//     myCardTitle: {
//         width: '100%',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis'
//     }
// }

export default HomePage