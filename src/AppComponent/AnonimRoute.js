import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentication from '../Auth/Authentication';

class AnonimRoute extends Component {
    render() {
        const {component: Component, ...others} = this.props;
        
        const renderRoute = props => {
            if (Authentication.isAuthenticated()) {
                return (
                    <Redirect to={
                        {
                            pathname: '/'
                        }
                    } />
                );
            }

            
            return ( <Component {...props} /> );
            // return null;
            
        }

        return (
            <Route {...others} render={renderRoute}/>
        );
    }
}

export default AnonimRoute;