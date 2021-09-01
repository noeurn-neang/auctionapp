import React, { Suspense } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse">Loading...</div>
    </div>
)

// Pages
const ItemsPage = React.lazy(() => import('../pages/ItemsPage'));
const ItemDetailPage = React.lazy(() => import('../pages/ItemDetailPage'));

const TheLayout = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Auction App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{padding: 10}}>
                <Suspense fallback={loading}>
                    <Switch>
                        <Route 
                            path="/" 
                            exact={true} 
                            render={props => <ItemsPage {...props}/>} />
                        <Route 
                            path="/detail" 
                            exact={true}
                            render={props => <ItemDetailPage {...props}/>} />
                    </Switch>
                </Suspense>
            </Container>
        </div>
    )
}

export default TheLayout;