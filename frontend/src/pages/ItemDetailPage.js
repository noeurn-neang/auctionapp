import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, FormCheck, FormControl, FormLabel, Image, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Countdown from '../components/Countdown';
import { bidService, disableAutoBidService, getItemDetailService } from '../modules/items/service';
import moment from 'moment';
import { connect } from 'react-redux';
import { userSelector } from '../modules/auth/selector';
import AutoBiddingModal from '../containers/AutoBiddingModal';

const ItemDetailPage = ({ user }) => {
    const { id } = useParams();

    const modalRef = useRef();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [autoBid, setAutoBid] = useState(false); 

    const setData = data => {
        setAmount(parseFloat(data.last_bid_amount > 0 ? data.last_bid_amount : data.price) + 1);
        if(data.autoBiddingConfig) {
            setAutoBid(data.autoBiddingConfig.status === 1)
        }
    }

    const requestItemDetail = useCallback(() => 
        getItemDetailService(id)
            .then(res => {
                setItem(res.data);
                setData(res.data)
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
            setLoading(false);
            if(res.data) {
                setItem({
                    ...item,
                    ...res.data
                });
                setData(res.data);
    
                // request api item detail to get latest bid (auto bidding purpose)
                requestItemDetail();
            } else {
                alert(res.msg);
            }
        }).catch(err => {
            alert(err.msg);
            setLoading(false);
            console.error(err);
        });
    }

    const showAutoBidConfig = () => {
        modalRef.current.show(
            item.autoBiddingConfig,
            item.autoBiddingConfig ? parseFloat(item.autoBiddingConfig.max_bid_amount) : 0
        );
    }

    const disableAutoBid = () => {
        disableAutoBidService({
            itemId: item.id
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
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
                                        style={{width: 150}}
                                        value={amount}
                                        onChange={e => {
                                            setAmount(parseFloat(e.target.value));
                                        }}
                                    />
                                </div>
                                <div style={{
                                    display: 'flex', 
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Button 
                                        disabled={loading} 
                                        variant="primary" 
                                        onClick={onBid}>
                                        {loading ? "Bidding..." : "Bid Now"}
                                    </Button>
                                    <FormCheck
                                        onChange={e => {
                                            setAutoBid(e.target.checked)
                                            if(!item.autoBiddingConfig) {
                                                showAutoBidConfig();
                                            }

                                            // Check disable auto bid
                                            if(!e.target.checked && item.autoBiddingConfig) {
                                                disableAutoBid();
                                            }
                                        }}
                                        checked={autoBid}
                                        style={{marginLeft: 10}} 
                                        label="Auto Bidding" />
                                    {autoBid ? <a href="#" onClick={showAutoBidConfig}>Config</a> : null }
                                </div>
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
            <AutoBiddingModal 
                ref={modalRef}
                itemId={item.id}
                handleResult={result => {
                    setItem({
                        ...item,
                        autoBiddingConfig: result
                    })
                    if(result == null) {
                        setAutoBid(false);
                    }
                }}
            />
        </div> : null
    )
}

const mapStateToProps = state => ({
    user: userSelector(state)
})

export default connect(mapStateToProps)(ItemDetailPage);