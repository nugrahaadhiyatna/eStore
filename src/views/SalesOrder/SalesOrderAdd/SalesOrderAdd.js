import React, { Component } from 'react';
import { 
  Card,
  CardBody, 
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Row, 
  Table,
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  
  Nav, NavItem, NavLink, TabContent, TabPane,Progress
} from 'reactstrap';

import SalesOrder_Preview from './SalesOrder_Preview';
import SalesOrderDeliveryForm from './SalesOrderDeliveryForm';
import SalesOrder_Product from './SalesOrder_Product';

import './SalesOrderAdd.css';

class SalesOrderAdd extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: 1,
        salesOrder: {
          deliveryOrder: {
            deliveryName: '',
            originWarehouse: null,
            destinationCountry: null,
            deliveryPhoneNumber: '',
            orderId: null,
            deliveryCode: null,
            service: null,
            deliveryEmailAddress: '',
            deliveryCode: null,
            companyName: '',
            deliveryAddress1: '',
            subUrb: '',
            state: '',
            postCode: '',
            salesChannel: null,
            deliveryAddress2: '',
            deliveryPhoneNumber: '',
            brandCode: ''
          },
          products: []
        },
        moreFieldShowClass: ' d-none'
      };
  
      this.salesOrderDeliveryForm = React.createRef();
      this.salesOrderProductForm = React.createRef();
    }

    activeTabIndex = (tab) => {
        if(this.state.activeTab !== tab){ this.setState({ activeTab: tab }); }
    }

    assignDeliveryOrder = (deliveryOrder) => {
        const salesOrder = this.state.salesOrder;
        salesOrder.deliveryOrder = deliveryOrder;
        this.setState({ salesOrder: salesOrder });
    }
    
    assignProduct = (products) => {
        const salesOrder = this.state.salesOrder;
        salesOrder.products = products;
        this.setState({ salesOrder: salesOrder });
    }

    saveSalesOrder = () => {
        this.props.addSalesOrder(this.state.salesOrder);
    }
    
    handleDeliveryOrder = (isValid, obj) => {
        // this.assignDeliveryOrder(obj);
        if(isValid) {
            this.activeTabIndex(2);
        }
    }

    handleProduct = (isValid, obj) => {
        this.assignProduct(obj);
        if(isValid) {
            this.activeTabIndex(3);
        }
    }

    onSubmitSalesOrder = (isValid, obj) => {
        this.saveSalesOrder();
        this.props.toggle();
    }

    onClickBack = () => {
        if(this.state.activeTab > 1)
            this.activeTabIndex(this.state.activeTab - 1);
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={'modal-company modal-lg ' + this.props.className} backdrop="static">
                    <ModalHeader toggle={this.props.toggle}>
                        New Sales Order
                        <small className="d-block">Please enter delivery and product details to create a new sales order. </small>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12" md="12">
                                <Nav className="progress-status pt-4" tabs>
                                    <NavItem className="col text-center px-0" active={this.state.activeTab === 1}>
                                        <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 1 } onClick={ () => { this.activeTabIndex(1) } }>Delivery</NavLink>
                                    </NavItem>
                                    <NavItem className="col text-center px-0" active={this.state.activeTab === 2}>
                                        <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 2 } onClick={() => { if(this.state.activeTab == 1) { this.salesOrderDeliveryForm.current.onClickNext() } else { this.activeTabIndex(2) } } }>Product</NavLink>
                                    </NavItem>
                                    <NavItem className="col text-center px-0" active={this.state.activeTab === 3}>
                                        <NavLink className={"border-0 py-0 d-inline-block"} active={this.state.activeTab === 3 } onClick={ () => { if(this.state.activeTab == 2) this.salesOrderProductForm.current.onClickNext() } }>Preview</NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab} className="border-0">
                                    <TabPane tabId={1} className="mt-1">
                                        <SalesOrderDeliveryForm ref={this.salesOrderDeliveryForm} moreFieldShowClass={this.state.moreFieldShowClass} handleDeliveryOrder={this.handleDeliveryOrder} />
                                    </TabPane>
                                    <TabPane tabId={2} className="mt-1">
                                        <SalesOrder_Product ref={this.salesOrderProductForm} handleProduct={this.handleProduct} onClickBack={this.onClickBack} />
                                    </TabPane>
                                    <TabPane tabId={3} className="mt-1">
                                        <SalesOrder_Preview salesOrder={this.state.salesOrder} onSubmitSalesOrder={this.onSubmitSalesOrder} onClickBack={this.onClickBack} />
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter className="d-none">
                        <button type="button" className={"btn btn-link link-company-old" + (this.state.activeTab === "1" ? '' : ' d-none')} onClick={this.onClickMoreField}>{(this.state.moreFieldShowClass) === '' ? 'Less Field' : 'More Field'}</button>
                        <Button color="company" onClick={this.onSubmitDelivery} type="button" className={this.state.activeTab === "1" ? '' : 'd-none'}>NEXT</Button>
                        <Button color="company" onClick={this.onSubmitProduct} type="button" className={this.state.activeTab === "2" ? '' : 'd-none'}>NEXT</Button>
                        <Button color="company" onClick={this.onSubmitConfirmation} type="button" className={this.state.activeTab === "3" ? '' : 'd-none'}>SUBMIT</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default SalesOrderAdd;