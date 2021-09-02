import React from 'react';
import { Modal, Button, FormControl, Form, FormLabel } from 'react-bootstrap';
import { configAutoBidService } from '../modules/items/service';

class AutoBiddingModal extends React.Component {
    state = {
        visible: false,
        value: 0,
        config: null,
        loading: false,
    }

    show = (config, value) => {
        this.setState({
            visible: true,
            value: value,
            config
        })
    }

    handleClose = () => {
        this.setState({
            visible: false,
            value: 0
        })
    }

    handleResult = () => {
        const { handleResult } = this.props;
        const { config } = this.state;
        handleResult(config);
    }

    onConfirm = () => {
        const { value } = this.state;
        const { itemId } = this.props;

        this.setState({
            loading: true
        })
        configAutoBidService({
            itemId,
            maxBidAmount: value
        }).then(res => {
            this.setState({
                loading: false,
                visible: false,
                config: res.data
            }, () => {
                this.handleResult();
            })
        }).catch(err => {
            console.error(err);
            this.setState({
                loading: false
            })
        })
    }

    render = () => {
        const { visible, value, loading } = this.state;

        return (
            <Modal
                show={visible}
                onHide={() => {
                    this.handleClose();
                    this.handleResult();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Setup Auto Bidding</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormLabel>Maximum Bid Amount</FormLabel>
                        <FormControl 
                            type="number"
                            value={value}
                            onChange={e => {
                                this.setState({
                                    value: e.target.value
                                })
                            }}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        this.handleClose();
                        this.handleResult();
                    }}>
                        Close
                    </Button>
                    <Button disabled={loading} variant="primary" onClick={() => {
                        this.onConfirm();
                    }}>{loading? "Loading..." : "Confirm" }</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AutoBiddingModal;