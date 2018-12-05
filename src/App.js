import React, { Component } from 'react';
import { 
  HashRouter, 
  // BrowserRouter, 
  Route, 
  Switch 
} from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
import './Custom.css';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { 
  Login, 
  ForgotPassword, 
  // Page404, 
  // Page500, 
  // Register 
} from './views/Pages';

// import { SalesOrder } from './views/SalesOrder/index';
// import { SalesOrderDetail } from './views/SalesOrder/SalesOrderDetail/index';
import ProtectedRoute from './AppComponent/ProtectedRoute';
import AnonimRoute from './AppComponent/AnonimRoute';
// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
      <HashRouter>
      {/* <BrowserRouter> */}
        <Switch>
          <AnonimRoute exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/forgotPassword" name="Forgot Password Page" component={ForgotPassword} />
          {/* <Route path="/" name="Home" component={DefaultLayout} /> */}
          <ProtectedRoute path="/" name="Home" component={DefaultLayout} />
           
          {/*<Route exact path="/salesOrder" name="Sales Order" component={SalesOrder} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} /> */}
        </Switch>
      </HashRouter>
      // </BrowserRouter>
    );
  }
}

export default App;
