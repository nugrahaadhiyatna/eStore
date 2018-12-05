import React, { Component } from 'react';
import { 
  Col, 
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav, 
  NavItem, 
  NavLink, 
  TabContent, 
  TabPane,
} from 'reactstrap';
import axios from 'axios';

import {SalesOrderEdit_Delivery, SalesOrderEdit_Product, SalesOrderEdit_Preview} from './index';
import Authentication from 'Auth/Authentication';
import AppComponent from 'AppComponent';
import './SalesOrderEdit.css';

class SalesOrderEdit extends Component {
  static TRIGGER = { HEADER: "header", DETAIL: "detail" };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTabIndex,
      salesOrder: props.salesOrder,
      moreFieldShowClass: ' d-none'
    };
    this.payload = {};
    this.salesOrderDeliveryForm = React.createRef();
    this.salesOrderProductForm = React.createRef();
  }

    componentDidMount(){
        //        
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.salesOrder !== this.props.salesOrder){
            this.setState((state, props) => {
                state.salesOrder = props.salesOrder;
                return state;
            });
        }
    }

    componentWillUnmount(){
        //
    }

    activeTabIndex = (tab) => {
        if(this.state.activeTab !== tab){ this.setState({ activeTab: tab }); }
    }

    assignNewSalesOrderHeader = (formNode) => {
        const oldSalesOrder = this.props.salesOrder;
        const newSalesOrder = JSON.parse(JSON.stringify(this.state.salesOrder));
        this.payload = {
            ERP_ORDER: oldSalesOrder.deliveryOrder["erp_order"],
            COMPANY: Authentication.getCompanyCode()
        };
        for (var key in oldSalesOrder.deliveryOrder) {
            if (!formNode.hasOwnProperty(key)) { continue; }
            this.payload[key.toUpperCase()] = formNode[key].value;
            newSalesOrder["deliveryOrder"][key] = formNode[key].value;
        }
        this.setState({ salesOrder: newSalesOrder });
    }

    handleDeliveryOrder = (formNode, preventNavigate) => {
        this.assignNewSalesOrderHeader(formNode);
        if(formNode && !preventNavigate) {
            this.activeTabIndex(2);
        }
    }

    assignSalesOrderDetail = (products) => {
        let salesOrderState = this.state.salesOrder;
        salesOrderState.products = products;
        this.setState({ salesOrder: salesOrderState });
    }

    handleProduct = (obj) => {
        this.assignSalesOrderDetail(obj);
        if(obj) { this.activeTabIndex(3); }
    }

    saveSalesOrderHeader = () => {
        let endpoint = "scale/_proc/API_ShipmentUpdateDeliveryInformation";
        let params = {
            erp_order: this.props.salesOrder.deliveryOrder["erp_order"],
            id: this.props.salesOrder.deliveryOrder["id"]
        }
        let payload = { params: this.payload }
        axios.post(AppComponent.getBaseUrl() + endpoint, payload,
            {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
                    'X-Company-Code': Authentication.getCompanyCode(),
                    'X-DreamFactory-Session-Token': Authentication.getToken()
                }
            }
        )
        .then(res => {
            console.log("success");
            window.location.reload();
        })
        .catch(function (error) {
            window.errr = error;
            let result = {};
            result.isSuccess = false;
            if (error.response) {
                result.message = error.response.data.message;
            } else {
                result.message = 'Failed to proceess your request';
            }
            return result;
        });
    }

    saveSalesOrderDetail = () => { }

    // saveSalesOrder = () => {
    //     this.props.addSalesOrder(this.state.salesOrder);
    // }

    onSubmitSalesOrder = () => {
        if(this.props.trigger === SalesOrderEdit.TRIGGER.HEADER){
            this.saveSalesOrderHeader();
        } else {
            //
        }
        this.props.toggleModal();
    }

    onClickBack = () => {
        if(this.state.activeTab > 1)
            this.activeTabIndex(this.state.activeTab - 1);
    }

    onClickNext = (nextTabNumber) => {
        let tabDeliveryNode = this.salesOrderDeliveryForm.current;
        let tabProductNode = this.salesOrderProductForm.current;
        if(nextTabNumber === 3){
            if(tabDeliveryNode.validateForm() && tabProductNode.validate()){
                tabDeliveryNode.onClickNext(true);
                tabProductNode.onClickNext(true);
                this.activeTabIndex(nextTabNumber);
            }
        }
        if(nextTabNumber === 2){
            if(tabDeliveryNode.validateForm()){
                tabDeliveryNode.onClickNext(true);
                this.activeTabIndex(nextTabNumber);
            }
        }
    }

  render() {
    return (
          <div>
            <Row>
                  <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} centered={true} className={'modal-company modal-lg animated fadeIn'} backdrop="static" onClosed={ () => {this.activeTabIndex(this.props.activeTabIndex)}}>
                        <ModalHeader toggle={this.props.toggleModal}>
                          Edit Sales Order : {this.props.salesOrder.deliveryOrder["erp_order"]}
                          <small className="d-block">Review and update shipment details. </small>
                        </ModalHeader>
                        <ModalBody>
                          <Row>
                          <Col xs="12" md="12" className="mb-4">
                            <Nav className="progress-status pt-2" tabs>
                              <NavItem className="col text-center px-0" active={this.state.activeTab === 1}>
                                <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 1 } onClick = {() => { this.activeTabIndex(1); }}>Delivery</NavLink>
                              </NavItem>
                                <NavItem className="col text-center px-0" active={this.state.activeTab === 2}>
                                    {/* <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 2} onClick = {() => { if(this.state.activeTab === 1) { this.salesOrderDeliveryForm.current.onClickNext(false); alert("ll") } else { this.activeTabIndex(2) } }} >Product</NavLink> */}
                                    <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 2} onClick = {() => { this.onClickNext(2)} } >Product</NavLink>
                              </NavItem>
                              <NavItem className="col text-center px-0" active={this.state.activeTab === 3}>
                                {/* <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 3} onClick = {()=> { if(this.state.activeTab === 2) { this.salesOrderProductForm.current.onClickNext() } else { /*this.activeTabIndex(3) } }} >Preview</NavLink> */}
                                <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 3} onClick = {() => { this.onClickNext(3) }} >Preview</NavLink>
                              </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab} className="border-0">
                                <TabPane tabId={1} className="mt-1">
                                  <SalesOrderEdit_Delivery salesOrder={this.props.salesOrder} ref={this.salesOrderDeliveryForm} moreFieldShowClass={this.state.moreFieldShowClass} handleDeliveryOrder={this.handleDeliveryOrder}/>
                                </TabPane>
                                <TabPane tabId={2} className="mt-1">
                                  <SalesOrderEdit_Product ref={this.salesOrderProductForm} trigger={this.props.trigger} salesOrder={this.props.salesOrder} handleProduct={this.handleProduct} onClickBack={this.onClickBack}/>
                                </TabPane>
                                <TabPane tabId={3} className="mt-1">
                                  <SalesOrderEdit_Preview salesOrder={this.state.salesOrder} onSubmitSalesOrder={this.onSubmitSalesOrder} onClickBack={this.onClickBack}/> 
                                </TabPane>
                            </TabContent>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter className="d-none">
                      
                      </ModalFooter>
                  </Modal>
            </Row>
          </div>
    );
  }
}

export default SalesOrderEdit;
