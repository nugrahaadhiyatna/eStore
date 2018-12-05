import React, { Component } from 'react';
import { 
  Card,
  CardBody, 
  Col,
  Row,
  Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import axios from 'axios';

import SalesOrderDetail_Header from './SalesOrderDetail_Header';
import SalesOrderDetailDetail from './SalesOrderDetailDetail';
import Authentication from 'Auth/Authentication';
import AppComponent from 'AppComponent';

import './SalesOrderDetail.css';

class SalesOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      salesOrder: {
        deliveryOrder: {},
        products: []
      },
      canManage: false,
      isLoad:false
    };
  }

  activeTabIndex(tab){
      if(this.state.activeTab !== tab){
        this.setState({activeTab:tab});
      }
  }
  
  componentDidMount() {
    let erpOrder = this.props.match.params.erpOrder;
    let id = this.props.match.params.id;
    let endpointDeliveryInformation = "scale/_proc/API_ShipmentGetDeliveryInformation";
    let endpointProductInformation = "scale/_proc/API_ShipmentProductInformation";
    let params = {
      erp_order: erpOrder,
      id: id,
    }

    let self = this;
    axios.all([
      axios.get(AppComponent.getBaseUrl() + endpointDeliveryInformation, {
          params: params,
          headers: {
              'Content-Type': 'application/json',
              'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
              'X-Company-Code': Authentication.getCompanyCode(),
              'X-DreamFactory-Session-Token': Authentication.getToken()
          }
      }),
      axios.get(AppComponent.getBaseUrl() + endpointProductInformation, {
          params: params,
          headers: {
              'Content-Type': 'application/json',
              'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
              'X-Company-Code': Authentication.getCompanyCode(),
              'X-DreamFactory-Session-Token': Authentication.getToken()
          }
      })
    ])
    .then(axios.spread((getShipmentReq, getProductReq) => {
      let salesOrder = {}
      salesOrder.deliveryOrder = getShipmentReq.data.resource[0];
      salesOrder.products = getProductReq.data.resource;
      return salesOrder;
    }))
    .then(function(result) {
        self.setState({ salesOrder: result,isLoad:true });
    })

  }

  // componentDidUpdate(prevProps, prevState, snapshot){
  //   if(prevProps.salesOrder.deliveryOrder["order_status"] !== this.state.salesOrder.deliveryOrder['order_status']){
  //       this.setState((state, props) => {
  //           state.canManage = props.salesOrder.deliveryOrder['order_status'] === "In Pool";
  //           return state;
  //       });
  //     }
  // }

  render() {
    return (
      <div>
          <div className={this.state.isLoad?"animated fadeIn":"d-none"}>
          {/* <div className="d-none"> */}
            <div>
                <Row>
                  <Col>
                    <Card className="cardTransparent">
                      <CardBody className="px-0">
                        <div><h4 className="headerTitle">Sales Order: {this.state.salesOrder.deliveryOrder["erp_order"]}</h4></div>                
                      </CardBody>
                    </Card>
                    </Col>
                </Row>
                <Row>
                  <Col>
                  <Row className="mb-4">
                      <Col>
                        <Nav className="salesOrderTabs" tabs>
                          <NavItem className="col-sm company pl-0 pr-2 black-text">
                            <NavLink className="tab-custom" active={this.state.activeTab === '1'} onClick={() => { this.activeTabIndex('1'); }}>
                              <div className="row barisTabCustom">
                                <div className ="col-1 kolomTabCustom">
                                  <i className={this.state.activeTab === '1' ?'fa fa-long-arrow-down fa-2x iconTabActive arrowTabIcon':'fa fa-long-arrow-down fa-2x iconSpace-sepuluh d-none'} />
                                </div>
                                <div className ={this.state.activeTab === '1'?"col-11":"col-12"}>
                                  <span className="tabTitleText">Delivery Information</span>
                                </div>
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="col-sm company pl-2 pr-0">
                            <NavLink className="tab-custom" active={this.state.activeTab === '2'} onClick={() => { this.activeTabIndex('2'); }}>
                            <div className="row barisTabCustom">
                                <div className ="col-1 kolomTabCustom">
                                    <i className={this.state.activeTab === '2' ?'fa fa-long-arrow-down fa-2x iconTabActive arrowTabIcon':'fa fa-long-arrow-down fa-2x iconSpace-sepuluh d-none'} />
                                </div>
                                <div className ={this.state.activeTab === '2'?"col-11":"col-12"}>
                                    <span className="tabTitleText">Product Information</span>
                                </div>
                            </div>
                            </NavLink>
                          </NavItem>
                        </Nav>  
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                          <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                  <SalesOrderDetail_Header history={this.props.history} salesOrder={this.state.salesOrder} /> 
                                </TabPane>
                                <TabPane tabId="2">
                                  <SalesOrderDetailDetail salesOrder={this.state.salesOrder}/>
                                </TabPane>
                          </TabContent>
                      </Col>
                    </Row>
                  </Col>
                </Row>
            </div>
          </div>
          <div className={!this.state.isLoad?"h-100":"d-none"} style={{textAlign:"center",position:"relative"}}>
            <i className={!this.state.isLoad?'fa fa-refresh fa-10x fa-spin':'fa fa-refresh fa-10x d-none'} style={{"marginTop":"400px"}}></i>
            <br/>
            <label>loading...</label>
          </div>
      </div>
    );
  }
}

export default SalesOrderDetail;