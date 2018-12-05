import React, { Component } from 'react';
import { Container,Table,Row,Col,FormGroup,Label } from 'reactstrap';
import CurrencyFormat from 'react-currency-format'; 

class SalesOrderEdit_Preview extends Component{
    constructor(props){
        super(props);
    }

    onClickSubmit = () => {
        this.props.onSubmitSalesOrder();
    }

    render(){
        return (<div>
            <Container fluid={true}>
                <div>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label sm="12" className="titleSectionPreview">1. Delivery </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Name</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_name"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Phone Number</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_phone_num"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Origin Warehouse</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["warehouse"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Code</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["delivery_code"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Sales Chanel</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["sales_channel"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Original Order ID</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["erp_order"]}</Label>
                    </FormGroup>
                </Col>
                        <Col md="6">
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Address Line 1</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_address1"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Suburb</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_city"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">State</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_state"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Post Code</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_postal_code"]}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Destination Country</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder["ship_to_country"]}</Label>
                    </FormGroup>
                </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label sm="12" className="titleSectionPreview">2. Product </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Table hover responsive striped size="sm" className="table-condensed">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Product Code</th>
                                    <th>Qty</th>
                                    <th>PO Reference</th>
                                    <th>Country of Origin</th>
                                    <th>Price($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.salesOrder.products.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item["PRODUCT"]}</td>
                                        <td>{item["QUANTITY"]}</td>
                                        <td>No Reference</td>
                                        <td>{item["COUNTRY_OF_ORIGIN"]}</td>
                                        <td>
                                            {/* <Label className="float-right">{parseFloat(item["ITEM_PRICE"])}</Label> */}
                                            <CurrencyFormat className="float-right" value={parseFloat(item["ITEM_PRICE"])} thousandSeparator={true} displayType={'text'} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                    {/* <Row>
                        <Col md="8">
                                <Label className="float-right">Amount :</Label>
                        </Col>
                        <Col md="4 p-1">
                                <Label className="float-right"> 
                                    { this.props.salesOrder.products.reduce((acc, cur) => {
                                        return (parseFloat(cur["ITEM_PRICE"])) + acc;
                                    }, 0) }
                                </Label>
                        </Col>
                    </Row> */}
                    
                    <Row>
                        <Col md="8">
                                <Label className="float-right">Total</Label>
                        </Col>
                        <Col md="4 p-1">
                                <Label className="float-right">
                                    { this.props.salesOrder.products.reduce((acc, cur) => {
                                        return (parseFloat(cur["ITEM_PRICE"])) + acc;
                                    }, 0) }
                                </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Label>Confirmation</Label>
                            </center>
                            <center>
                                <Label>Please validate that the above information is correct before submitting.</Label>
                            </center>
                            <center>
                                <Label>Click ‘SUBMIT’ to edit this sales order.</Label>
                            </center>
                        </Col>
                    </Row>
                    <div className="row">
                        <div className="col-12">
                            <div className="modal-footer-action mt-5">
                                <button type="button" className="btn btnWhite mr-auto" onClick={this.props.onClickBack}>BACK</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClickSubmit}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>);
    }
}

export default SalesOrderEdit_Preview;