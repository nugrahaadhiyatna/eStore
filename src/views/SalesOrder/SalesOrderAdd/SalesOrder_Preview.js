import React, { Component } from 'react';
import { Container,Table,Row,Col,FormGroup,Label } from 'reactstrap';

class SalesOrder_Preview extends Component{
    constructor(props){
        super(props);
    }

    onClickNext = () => {
        let isValid = this.validateForm();
        let salesOrder = null;
        if(isValid){
            salesOrder = this.props.salesOrder;
        }
        this.props.onSubmitSalesOrder(isValid, salesOrder);
    }

    validateForm = () => {
        // if(this.props.salesOrder.deliveryOrder != null && this.props.salesOrder.product){
        //     return true;
        // }
        return true;
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
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.deliveryName}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Phone Number</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.deliveryPhoneNumber}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Origin Warehouse</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.originWarehouse}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Code</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.deliveryCode}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Sales Chanel</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.salesChannel}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Original Order ID</Label>
                        <Label className="text-secondary" sm="7">K60345</Label>
                    </FormGroup>
                </Col>
                        <Col md="6">
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Delivery Address Line 1</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.deliveryAddress1}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Suburb</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.subUrb}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">State</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.state}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Post Code</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.postCode}</Label>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="font-weight-bold" sm="5">Destination Country</Label>
                        <Label className="text-secondary" sm="7">{this.props.salesOrder.deliveryOrder.destinationCountry}</Label>
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
                                    <th>Price($AUD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.salesOrder.products.map((item, idx) => (
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{item.productCode}</td>
                                        <td>{item.qty}</td>
                                        <td>No Reference</td>
                                        <td>{item.countryOfOrigin}</td>
                                        <td><Label className="float-right">{item.price}</Label></td>
                                    </tr>
                                ))}
                                {/* <tr>
                                    <th>1</th>
                                    <td>SKU005</td>
                                    <td>5</td>
                                    <td>No Reference</td>
                                    <td>CN</td>
                                    <td><Label className="float-right">50</Label></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>SKU005</td>
                                    <td>5</td>
                                    <td>No Reference</td>
                                    <td>CN</td>
                                    <td><Label className="float-right">50</Label></td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Col md="8">
                                <Label className="float-right">Amount :</Label>
                        </Col>
                        <Col md="4">
                                <Label className="float-right"> 100</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8">
                                <Label className="float-right">Taxes :</Label>
                        </Col>
                        <Col md="4">
                                <Label className="float-right"> 0</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="8">
                                <Label className="float-right">Total</Label>
                        </Col>
                        <Col md="4">
                                <Label className="float-right"> 100</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <Label>Confirmation</Label>
                            </center>
                            <center>
                                <Label>Check all the fields information, make sure all field match and corrects.</Label>
                            </center>
                            <center>
                                <Label>Click ‘Submit’ to submit New Sales Order.</Label>
                            </center>
                        </Col>
                    </Row>
                   
                    <div className="row">
                        <div className="col-12">
                            <div className="modal-footer-action mt-5">
                                <button type="button" className="btn btnWhite mr-auto" onClick={this.props.onClickBack}>BACK</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClickNext}>NEXT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>);
    }
}


export default SalesOrder_Preview;