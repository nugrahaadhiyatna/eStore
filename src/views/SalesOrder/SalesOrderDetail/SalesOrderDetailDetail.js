import React, { Component } from 'react';
import { Container,Table,Row,Col,FormGroup,Label } from 'reactstrap';
import SalesOrderEdit from '../SalesOrderEdit/SalesOrderEdit';

class SalesOrderDetailDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            activeTab:2,
            canManage: false
        }
        this.salesOrderEdit = React.createRef();
    }

    toggleModal = () => {
        if(this.state.modal) {
            this.salesOrderEdit.current.activeTabIndex(2);
        }
        this.setState({ modal: !this.state.modal })
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.salesOrder.deliveryOrder["order_status"] !== this.props.salesOrder.deliveryOrder['order_status']){
            this.setState((state, props) => {
                state.canManage = props.salesOrder.deliveryOrder['order_status'] === "In Pool";
                return state;
            });
        }
    }

    render(){

        return (
            <React.Fragment>
            <div>
                <Row>
                    <Col>
                    {/* <Col className="scrollDetail"> */}
                        <Row>
                            <Col xs='11'>
                                <FormGroup row>
                                    <Label sm="12"><strong><h4>{this.props.salesOrder.deliveryOrder["ship_to_name"]}, {this.props.salesOrder.deliveryOrder["ship_to_city"]}, {this.props.salesOrder.deliveryOrder["ship_to_email_address"]}, {this.props.salesOrder.deliveryOrder["ship_to_phone_num"]}</h4></strong></Label>
                                </FormGroup>
                            </Col>
                            <Col xs='1'>
                                {/* <button className="btn btn-company-inverse p-1 rounded-circle float-right" onClick={this.toggleModal} disabled={ !this.state.canManage }> */}
                                <button className={this.state.canManage ? "btn btn-company-inverse p-1 rounded-circle float-right":"d-none"} onClick={this.toggleModal} disabled={ !this.state.canManage }>
                                <span className="fa fa-stack fa-pencil">
                                </span>
                                </button>
                                <SalesOrderEdit salesOrder={this.props.salesOrder} ref={this.salesOrderEdit} isOpen={this.state.modal} toggleModal={this.toggleModal} activeTabIndex={2} trigger={SalesOrderEdit.TRIGGER.DETAIL} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Table size="sm" responsive="true" className="table-condensed table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">No</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Product Code</th>
                                        <th className="text-center">Order Reference</th>
                                        <th className="text-center">Item List Price (AUD)</th>
                                        <th className="text-center">Country of Origin</th>
                                        <th className="text-center">Original Order ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.props.salesOrder.products.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="text-center">{idx + 1}</td>
                                        <td className="text-center">{parseInt(item["QUANTITY"])}</td>
                                        <td className="text-center">{item["PRODUCT"]}</td>
                                        <td className="text-center">{item["PRODUCT_DESCRIPTION"]}</td>
                                        <td className="text-center">{item["ITEM_PRICE"]}</td>
                                        <td className="text-center">{item["COUNTRY_OF_ORIGIN"]}</td>
                                        <td className="text-center">{item["ORIGINAL_ORDER_ID"]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </div>
        </React.Fragment>
        );
    }
}

export default SalesOrderDetailDetail;