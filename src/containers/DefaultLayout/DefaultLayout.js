import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import CompanyFooter from './CompanyFooter';
import Authentication from '../../Auth/Authentication';
import salesOrder_icon from '../../assets/custom/delivery-1.svg'
//import salesOrder_icon from '../../assets/custom/Sales-Order.svg'
import DeliveryIcon from '../../Icons/Delivery'

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
   
  }

  navLinkMenu = (e) => {

    let isActive = document.getElementsByClassName('nav-link active');
    if(isActive.length > 0){
      for (var i=0; i < isActive.length; i++) {
        isActive[i].classList.remove('active');
      }
      e.target.classList.add('active');
    }else{
      if(isActive.length < 1){
        e.target.classList.add('active');
      }
    }
    
    //console.log(e.currentTarget.id);

      //this.setState({'isActive':true})
  }

  logout = (e) => {
    e.preventDefault();
    Authentication.signOut();
    this.props.history.push('/login');
  }

  navLinkMenu = (e) => {

    let isActive = document.getElementsByClassName('nav-link active');
    if(isActive.length > 0){
      for (var i=0; i < isActive.length; i++) {
        isActive[i].classList.remove('active');
      }
      e.currentTarget.classList.add('active');
    }else{
      if(isActive.length < 1){
        e.currentTarget.classList.add('active');
      }
    }
    
   
  }

  getUser = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    return user.name?user.name:'';
}


  render() {
    return (
      <div className="app sidebar-show">
        {/* <AppHeader fixed>
          <DefaultHeader />
        </AppHeader> */}
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <div className="p-0 sidebar-header">
              <img src="/static/media/estore_logistics_logo.39969834.svg" alt="" className="navbar-brand-full" />
            </div>
            {/* <AppSidebarHeader />
            <AppSidebarForm /> */}
            {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
            <nav className="sidebar-nav">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link active" href={'#/salesOrder'} onClick={this.navLinkMenu}>
                    {/* <img src={salesOrder_icon}/>  */}
                    <span className="iconU-delivery">
                    </span>
                    <p>
                      <label className="titleMenu px-2">Sales Order</label>
                    </p>
                    {/* <object id="ddd" type="image/svg+xml" data={salesOrder_icon}></object> Sales Order */}
                  </a>
                </li>
                
              </ul>

            </nav>




            {/* <AppSidebarFooter /> */}
            {/* <AppSidebarMinimizer /> */}
            <div className="p-0 sidebar-footer">
            <a className="nav-link" href="#/login" onClick={ this.logout }>
            <label className="titleMenu">{this.getUser()}</label>
            <p>Logout</p></a>
            </div>
          </AppSidebar>
          <main className="main">
            {/*<AppBreadcrumb appRoutes={routes}/>*/}
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                {/* <Redirect from="/" to="/login" /> */}
                <Redirect from="/" to="/salesOrder" />
              </Switch>
            </Container>
          </main>
          
          {/* <CompanyFooter child={this.state.footerChild} /> */}
          <div className="company-footer">© eStore Logistics 2018
                  <div className="pull-right">
                    Version 1.0.1
                  </div>
          </div>
          
          {/* <AppAside fixed hidden>
            <DefaultAside />
          </AppAside> */}
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;
