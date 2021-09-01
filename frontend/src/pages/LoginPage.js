import React, { useState } from 'react';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';
import { setUserAction } from '../modules/auth/action';
import { loginService } from '../modules/auth/service';

const LoginPage = ({ setUser }) => {

    const [name, setName] = useState("user1");
    const [password, setPassword] = useState("123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = e => {
        e.preventDefault();

        setLoading(true);
        loginService({
            name,
            password
        }).then(res => {
            setLoading(false);
            if(res.data) {
                setUser(setUser)
            } else {
                setError(res.msg)
            }
        }).catch(err => {
            setLoading(false);
            setError(err.msg)
        })
        
    }

    return (
        <Row>
            <Col>
                <center>
                    <Form.Label style={{ fontSize: 30, marginTop: 30, textAlign: 'center' }}>Login</Form.Label>
                </center>
                <Card style={{ maxWidth: 500, margin: '30px auto' }}>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter name" 
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? "Loading..." : "Submit" }
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = {
    setUser: setUserAction
}

export default connect(null, mapDispatchToProps)(LoginPage);