import React from 'react';
import { connect } from 'react-redux';

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { userSelector } from './modules/auth/selector';

// Layout
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

const AppRouter = props => {
    return (
        <BrowserRouter>
            <React.Suspense fallback={null}>
                <Switch>
                    <UnAuthenticateRoute path="/login" component={<LoginPage {...props}/>} {...props}/>
                    <PrivateRoute path="/" {...props}/>
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    )
}

const PrivateRoute = ({ user, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <TheLayout {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

const UnAuthenticateRoute = ({ user, component, ...rest }) =>{
   return (
        <Route
        {...rest}
        render={props =>
        user ? (
            <Redirect
                to={{
                pathname: "/",
                state: { from: props.location }
                }}
            />
        ) : component
        }
    />
   )
}

const mapStateToProps = state => ({
    user: userSelector(state)
})

export default connect(mapStateToProps)(AppRouter);