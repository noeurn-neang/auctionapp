import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, FormControl, FormLabel, Image, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Countdown from '../components/Countdown';
import { bidService, getItemDetailService } from '../modules/items/service';
import moment from 'moment';
import { connect } from 'react-redux';
import { userSelector } from '../modules/auth/selector';

const ItemDetailPage = ({ user }) => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);

    const requestItemDetail = useCallback(() => 
        getItemDetailService(id)
            .then(res => {
                setItem(res.data);
                setAmount(parseFloat(res.data.last_bid_amount) + 1);
            })
            .catch(err => {
                console.log(err);
            })
    , [id]);

    useEffect(() => {
        requestItemDetail();
    }, [id, requestItemDetail]);

    const onBid = () => {
        setLoading(true);
        bidService({
            userId: user.id,
            itemId: item.id,
            amount
        }).then(res => {
            setItem({
                ...item,
                ...res.data
            });
            setAmount(parseFloat(res.data.last_bid_amount) + 1);
            setLoading(false);

            // request api item detail to get latest bid (auto bidding purpose)
            requestItemDetail();
        }).catch(err => {
            setLoading(false);
            console.error(err);
        });
    }

    return (
        item ? <div className="mb-3 mt-3">
            <Row>
                <Col sm="6">
                    <Image className="mb-2" style={{width: '100%'}} src={item.image_url} />
                </Col>
                <Col sm="6">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <FormLabel className="item-price">$ {item.price}</FormLabel>
                            <Card.Text>{item.description}</Card.Text>
                            <Countdown date={item.closing_date} />
                            { moment() < moment(item.closing_date) ? <div style={{
                                display: 'flex', 
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <FormLabel className="mb-0 mr-2">Bid Amount:</FormLabel>
                                    <FormControl
                                        min={parseFloat(item.last_bid_amount) + 1}
                                        type="number"
                                        style={{width: 250}}
                                        value={amount}
                                        onChange={e => {
                                            setAmount(parseFloat(e.target.value));
                                        }}
                                    />
                                </div>
                                <Button 
                                    disabled={loading} 
                                    variant="primary" 
                                    onClick={onBid}>
                                    {loading ? "Bidding..." : "Bid Now"}
                                </Button>
                            </div> : null }
                            
                            <br />
                            <FormLabel className="mt-3">Bid Histories</FormLabel>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>User</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.histories.map(hi => {
                                        return <tr key={hi.id}>
                                            <td>{hi.bid_amount}</td>
                                            <td>{hi.user.name}</td>
                                            <td>{moment(hi.created_at).format('YYYY/MM/DD')}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div> : null
    )
}

const mapStateToProps = state => ({
    user: userSelector(state)
})

export default connect(mapStateToProps)(ItemDetailPage);