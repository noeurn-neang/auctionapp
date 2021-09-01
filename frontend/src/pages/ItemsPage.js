import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form, FormLabel, FormSelect } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getItemsService } from '../modules/items/service';

const ItemsPage = () => {
    const history = useHistory();

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState("");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const requestItems = () => {
            setLoading(true)
            getItemsService({
                q,
                page,
                sort
            }).then(({data}) => {
                setLoading(false);
                setItems(data.data);
                setTotal(data.total);
            }).catch(err => {
                setLoading(false);
                console.error(err)
            })
        }

        requestItems();

    }, [page, q, sort])

    const goToDetail = item => {
        history.push('/detail/' + item.id)
    }

    return (
        <div>
            <Row className="mb-3 mt-3">
                <Col>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Form.Control
                                value={q}
                                onChange={e => {
                                    setQ(e.target.value)
                                }}
                                style={{ width: '30rem', marginRight: 10 }}
                                placeholder="Enter name, description to search"
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FormLabel style={{ marginBottom: 0, marginRight: 10 }}>Sort&nbsp;by&nbsp;price:</FormLabel>
                            <FormSelect
                                value={sort}
                                onChange={e => {
                                    setSort(e.target.value)
                                }}
                            >
                                <option>None</option>
                                <option>ASC</option>
                                <option>DESC</option>
                            </FormSelect>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col><center><FormLabel className="m-2">{loading ? "Loading..." : ""}</FormLabel></center></Col>
            </Row>
            <Row className="gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                {items.map(it => (
                    <Col className="mb-5" key={it.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={it.image_url} />
                            <Card.Body>
                                <Card.Title>{it.name}</Card.Title>
                                <FormLabel className="item-price">$ {it.price}</FormLabel>
                                <Card.Text>{it.description}</Card.Text>
                                <Button variant="primary" onClick={() => {
                                    goToDetail(it);
                                }}>Bid Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination 
                active={page} 
                perPage={10}
                total={total}
                handleClick={p => {
                    setPage(p)
                }}
            />
        </div>
    )
}

export default ItemsPage;