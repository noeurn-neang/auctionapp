import React from 'react';
import { Card, Col, Row, Button, Form, FormLabel, FormSelect } from 'react-bootstrap';

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
        <div>
            <Row style={{marginBottom: 20, marginTop: 10}}>
                <Col>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Control
                                style={{width: '30rem', marginRight: 10}}
                                placeholder="Enter name, description to search"
                            />
                            <Button>Search</Button>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <FormLabel style={{marginBottom: 0, marginRight: 10}}>Sort&nbsp;by&nbsp;price:</FormLabel>
                            <FormSelect>
                                <option>None</option>
                                <option>ASC</option>
                                <option>DESC</option>
                            </FormSelect>
                        </div>
                    </div>
                </Col>
            </Row>
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
        </div>
    )
}

export default ItemsPage;