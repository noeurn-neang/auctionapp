import React from 'react';
import { Card, Col, Row, Button, Form, FormLabel } from 'react-bootstrap';

const ItemsPage = () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
        let ind = i + 1;
        items.push({
            id: ind,
            name: 'Product ' + ind,
            description: 'Hello wowo I am the boos' + ind,
            image_urle: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
            price: 100.00,
            last_bid_amount: 140.00,
            close_date: '2020-08-01 10:00 PM',
            max_bid_amount: 300.00,
        })
    }

    return (
        <Row className="gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
            {items.map(it => (
                <Col className="mb-5" key={it.id}>
                    <Card className="h-100">
                        <Card.Img variant="top" src={it.image_urle} />
                        <Card.Body>
                            <Card.Title>{it.name}</Card.Title>
                            <FormLabel className="item-price">$ {it.price}</FormLabel>
                            <Card.Text>{it.description}</Card.Text>
                            <Button variant="primary">Bid Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default ItemsPage;