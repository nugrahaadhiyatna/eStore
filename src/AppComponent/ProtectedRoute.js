
// const ProtectedRoute = ({ component: Component, ...others }) => (
//     <Route {...others} render={ (props) => {
//         fakeAuth.isAuthenticated 
//         ? <Component {...props}/>
//         : <Redirect to={{
//             pathname: '/login',
//             state: { from: props.location }
//           }}/>
//     )
//     }
//       }/>
//   )
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentication from '../Auth/Authentication';

class ProtectedRoute extends Component {
    render() {
        const {component: Component, ...others} = this.props;
        
        const renderRoute = props => {
            if (Authentication.isAuthenticated()) {
                return ( <Component {...props} /> );
            }

            return (
                <Redirect to={
                    {
                        pathname: '/login', 
                        state: { returnUrl: props.location }
                    }
                } />
            );
        }

        return (
            <Route {...others} render={renderRoute}/>
        );
    }
}

export default ProtectedRoute;