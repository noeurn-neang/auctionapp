import React, { Suspense } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    Switch,
    Route
  } from "react-router-dom";
import { clearUserAction } from '../modules/auth/action';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse">Loading...</div>
    </div>
)

// Pages
const ItemsPage = React.lazy(() => import('../pages/ItemsPage'));
const ItemDetailPage = React.lazy(() => import('../pages/ItemDetailPage'));

const TheLayout = ({ clearUser }) => {

    const onLogout = () => {
        localStorage.clear();
        clearUser();
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Auction App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" onClick={onLogout}>Logout</Nav.Link>
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
                            path="/detail/:id" 
                            exact={true}
                            render={props => <ItemDetailPage {...props}/>} />
                    </Switch>
                </Suspense>
            </Container>
        </div>
    )
}

const mapDispatchToProps = {
    clearUser: clearUserAction
}

export default connect(null, mapDispatchToProps)(TheLayout);