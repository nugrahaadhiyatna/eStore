import React, { Component } from 'react';
import { Row,
  Col, 
  FormGroup,
} from 'reactstrap';

import { SalesOrderEdit,SalesOrderDelete} from '../SalesOrderEdit/index';
import { formatStandardDate } from 'AppComponent/Helper';

class SalesOrderDetail_Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            modalDelete:false,
            canManage: false,
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.salesOrder.deliveryOrder['order_status'] !== this.props.salesOrder.deliveryOrder['order_status']){
            this.setState((state, props) => {
                state.canManage = props.salesOrder.deliveryOrder['order_status'] === "In Pool";
                return state;
            });
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleModalDelete = () => {
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }

    render(){
        return(
            <div>     
                <Row>
                    {/* <Col className="scrollDetail"> */}
                    <Col>
                        <Row>
                            <Col xs="11" sm="10">
                                <h4>Sales Order</h4>
                                <hr/>
                            </Col>
                            <Col xs="1" sm="2">
                                <Row>
                                    <Col xs="6" className="px-2">
                                        <button className={this.state.canManage ? "btn btn-company-inverse p-1 rounded-circle float-right":"d-none"} onClick={this.toggleModal} disabled={ !this.state.canManage }> 
                                            <span className="fa fa-stack fa-pencil float-right"></span>
                                        </button>
                                        <SalesOrderEdit salesOrder={this.props.salesOrder} isOpen={this.state.modal} toggleModal={this.toggleModal} activeTabIndex={1} trigger={ SalesOrderEdit.TRIGGER.HEADER } />
                                    </Col>                      
                                    <Col xs="6" className="px-2">
                                        <button className={this.state.canManage ? "btn btn-company-inverse p-1 rounded-circle float-left":"d-none"} onClick={this.toggleModalDelete}  disabled={ !this.state.canManage }>
                                            <span className="fa fa-stack fa-trash float-right"></span>
                                        </button>
                                        <SalesOrderDelete history={this.props.history} salesOrder={this.props.salesOrder} isOpen={this.state.modalDelete} toggleModal={this.toggleModalDelete} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>                                        
                                            {/* <Col md="4">Sales Order ID</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["id"]}</Col> */}
                                            <Col md="4" className="font-weight-bold">Delivery Name</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_name"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">OrderID</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["erp_order"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Origin Warehouse</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["warehouse"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Service</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["carrier_service"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery Address 1</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_address1"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Company</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["company"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery Suburb</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_city"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery Email Address</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_email_address"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery State</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_state"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery Phone Number</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_phone_num"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery PostCode</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_postal_code"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Destination Country</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to_country"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Delivery Code</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["delivery_code"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Brand Code</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["brand_code"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Sales Channel</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["sales_channel"]}</Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="7">
                                        <FormGroup row>
                                            <Col md="4" className="font-weight-bold">Company Name</Col>
                                            <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["ship_to"]}</Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>
                                    <Col md="5">
                                        <FormGroup row>
                                        </FormGroup>
                                    </Col>
                                </FormGroup> */}
                            </Col>
                        </Row>
                        <Row className='d-none'>
                            <Col xs="11">
                            <h4>Customer</h4>
                                <hr></hr>
                            </Col>
                            <Col xs="1">
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup row>
                                    <Col md="5">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Department Code</Col>
                                        <Col md="8" className="text-black-50"></Col>
                                    </FormGroup>
                                    </Col>
                                    <Col md="7">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer Suburb</Col>
                                        <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["customer_city"]}</Col>
                                    </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer Name</Col>
                                        <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["customer_name"]}</Col>
                                    </FormGroup>
                                    </Col>
                                    <Col md="7">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer State</Col>
                                        <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["customer_state"]}</Col>
                                    </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer Address 1</Col>
                                        <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["customer_address1"]}</Col>
                                    </FormGroup>
                                    </Col>
                                    <Col md="7">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer Post Code</Col>
                                        <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["customer_postal_code"]}</Col>
                                    </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer Address 2</Col>
                                        <Col md="8" className="text-black-50">{this.props.salesOrder.deliveryOrder["customer_address2"]}</Col>
                                    </FormGroup>
                                    </Col>
                                    <Col md="7">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Customer Code</Col>
                                        <Col md="8" className="text-black-50"></Col>
                                    </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold">Created</Col>
                                        <Col md="8" className="text-black-50">{formatStandardDate(this.props.salesOrder.deliveryOrder["creation_datetime"])}
                                        </Col>
                                    </FormGroup>
                                    </Col>
                                    <Col md="7">
                                    <FormGroup row>
                                        <Col md="4" className="font-weight-bold"></Col>
                                        <Col md="8" className="text-black-50"></Col>
                                    </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>       
        );
    }
}

export default SalesOrderDetail_Header;