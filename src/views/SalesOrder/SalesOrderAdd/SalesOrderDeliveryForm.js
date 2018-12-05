import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
// import SelectCountry from '../SelectCountry';
import countries from '../allCountry';


class SalesOrderDeliveryForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            salesChannelChecked: 'b2c',
            showMoreField: false,
            valid: {
                deliveryName: { isValid: true, message: "" },
            }
        };
        this.deliveryForm = React.createRef();
    }

    onSalesChannelChange = (e) => {
        this.setState({ salesChannelChecked: e.target.value});
        console.log(e.target.value);
    }

    onClickMoreField = () => {
        this.setState({ showMoreField: !this.state.showMoreField });
    }
    
    onClickNext = () => {
        let isValid = this.validateForm();
        let deliveryOrder = null;
        if(isValid){
            deliveryOrder = this.createDeliveryOrder();
        }
        this.props.handleDeliveryOrder(isValid, deliveryOrder);
    }

    validateForm = () => {
        let form = this.deliveryForm.current;
        let validState = this.state.valid;
        let isValid = true;
        
        let deliveryNameValidState = validState.deliveryName;
        if(!form.deliveryName.value) {
            deliveryNameValidState.isValid = false;
            deliveryNameValidState.message = "Delivery must be filled.";
            validState.deliveryName = deliveryNameValidState;
            this.setState({valid: validState});
            isValid = false;
        } else if(form.deliveryName.value.length >= 35) {
            deliveryNameValidState.isValid = false;
            deliveryNameValidState.message = "Character length must be equal or less then 35.";
            validState.deliveryName = deliveryNameValidState;
            this.setState({valid: validState});
            isValid = false;
        }

        // let deliveryNameValidState = validState.deliveryName;
        // if(!form.deliveryName.value) {
        //     deliveryNameValidState.isValid = false;
        //     deliveryNameValidState.message = "Delivery must be filled.";
        //     validState.deliveryName = deliveryNameValidState;
        //     this.setState({valid: validState});
        //     isValid = false;
        // }


        return isValid;
    }

    // This event will move to SalesOrderDeliveryForm.
    createDeliveryOrder = () => {
        const { deliveryName, originWarehouse, destinationCountry, deliveryPhoneNumber, orderId, deliveryCode, service, deliveryEmailAddress, companyName, deliveryAddress2, deliveryAddress1, subUrb, state, postCode, salesChannel, brandCode, giftCardGreeting, giftCardSenderName, giftCardMessage } = this.deliveryForm.current;
        let deliveryOrder = {
            deliveryName: deliveryName.value,
            originWarehouse: originWarehouse.value,
            destinationCountry: destinationCountry.value,
            deliveryPhoneNumber: deliveryPhoneNumber.value,
            orderId: orderId.value,
            deliveryCode: deliveryCode.value,
            service: service.value,
            deliveryEmailAddress: deliveryEmailAddress.value,
            companyName: companyName.value,
            deliveryAddress2: deliveryAddress2.value,
            deliveryAddress1: deliveryAddress1.value,
            subUrb: subUrb.value,
            state: state.value,
            postCode: postCode.value,
            salesChannel: salesChannel.value,
            brandCode: brandCode.value,
            giftCardGreeting: giftCardGreeting.value,
            giftCardSenderName: giftCardSenderName.value,
            giftCardMessage: giftCardMessage.value,
        }
        return deliveryOrder;
    }

    render(){
        return (
            <Fragment>
                <form ref={this.deliveryForm}>
                    <div className="row">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="deliveryName">Delivery Name</label>
                                <input type="text" className={"form-control" + (this.state.valid.deliveryName.isValid ? "" : " is-invalid")} id="deliveryName" name="deliveryName" placeholder="Delivery Name..." />
                                <FormFeedback valid={false}>{this.state.valid.deliveryName.message}</FormFeedback>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="originWarehouse">Origin Warehouse</label>
                                    <select id="originWarehouse" name="originWarehouse" className="form-control">
                                        {/* <option defaultValue>Choose...</option> */}
                                        <option>LAV 1</option>
                                        <option>LAV 2</option>
                                        <option>LAV 3</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="destinationCountry">Destination Country</label>
                                    <select id="destinationCountry" name="destinationCountry" className="form-control">
                                        
                                    {countries.map((country) => (
                                        <option value={country.value}>{country.text}</option>
                                     ) )}
                                    </select>
                                    {/* <select id="destinationCountry" name="destinationCountry" className="form-control">
                                        <option>AU</option>
                                        <option>SG</option>
                                        <option>ID</option>
                                        <option>NZ</option>
                                    
                                    </select> */}
                                    {/* <SelectCountry /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deliveryPhoneNumber">Delivery Phone Number</label>
                                <input type="text" className="form-control" id="deliveryPhoneNumber" name="deliveryPhoneNumber" placeholder="Delivery Phone Number" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="orderId">Order ID</label>
                                <input type="text" className="form-control" id="orderId" name="orderId" placeholder="Order ID..." />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="deliveryCode">Delivery Code</label>
                                    <select id="deliveryCode" name="deliveryCode" className="form-control">
                                       
                                        <option value="ATL">ATL</option>
                                        <option value="SAR">SAR</option>
                                        <option value="SIG">SIG</option>
                                        <option value="ATL-PD">ATL-PD</option>
                                        <option value="SAR-PD">SAR-PD</option>
                                        <option value="SIG-PD">SIG-PD</option>
                                    </select>
                                </div>
                                <div className={"form-group col-md-6" + (this.state.showMoreField ? "" : " d-none")}>
                                    <label htmlFor="service">Service</label>
                                    <select id="service" name="service" className="form-control">
                                        
                                        <option value="S1">S1</option>
                                        <option value="X6">X6</option>
                                    </select>
                                </div>
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="deliveryEmailAddress">Delivery Email Address</label>
                                <input type="text" className="form-control" id="deliveryEmailAddress" name="deliveryEmailAddress" placeholder="Delivery Email Address" />
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="companyName">Company Name</label>
                                <input type="text" className="form-control" id="companyName" name="companyName" placeholder="Company Name" />
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="deliveryAddress2">Delivery Address 2</label>
                                <textarea className="form-control" id="deliveryAddress2" name="deliveryAddress2" rows="3" placeholder="Delivery Address 2..."></textarea>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="deliveryAddress1">Delivery Address 1</label>
                                <textarea className="form-control" id="deliveryAddress1" name="deliveryAddress1" rows="3" placeholder="Delivery Address 1..."></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subUrb">Suburb</label>
                                <input type="text" className="form-control" id="subUrb" name="subUrb" placeholder="Suburb..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state" className="d-none">State</label>
                                
                                <select id="state" name="state" className="form-control">
                                    <option value="QLD">QLD</option>
                                    <option value="NSW">NSW</option>
                                    <option value="VIC">VIC</option>
                                    <option value="SA">SA</option>
                                    <option value="WA">WA</option>
                                    <option value="NT">NT</option>
                                    <option value="TAS">TAS</option>
                                    <option value="ACT">ACT</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="postCode" className="d-none">Post Code</label>
                                <input type="text" className="form-control" id="postCode" name="postCode" placeholder="Post Code..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Sales Channel</label>
                                <div className="btn-group-toggle" data-toggle="buttons" >
                                    <label className={'btn btn-company' + (this.state.salesChannelChecked === "b2c" ? ' active' : '')}>
                                    <input type="radio" id="salesChannel1" name="salesChannel" autoComplete="off" value="b2c" checked={this.state.salesChannelChecked === "b2c"} onChange={this.onSalesChannelChange} />  B2C
                                    </label>
                                    <label className={'btn btn-company' + (this.state.salesChannelChecked === "b2b" ? ' active' : '')}>
                                    <input type="radio" id="salesChannel2" name="salesChannel" autoComplete="off" value="b2b" checked={this.state.salesChannelChecked === "b2b"} onChange={this.onSalesChannelChange} /> B2B
                                    </label>
                                </div>
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="brandCode">Brand Code</label>
                                <input type="text" className="form-control" id="brandCode" name="brandCode" placeholder="Brand Code..." />
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="giftCardGreeting">Gift Card</label>
                                <input type="text" className="form-control" id="giftCardGreeting" name="giftCardGreeting" placeholder="Greeting..." />
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="giftCardSenderName">Greeting</label>
                                <input type="text" className="form-control" id="giftCardSenderName" name="giftCardSenderName" placeholder="Sender Name..." />
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="giftCardMessage">Gift Card Message</label>
                                <textarea className="form-control" id="giftCardMessage" name="giftCardMessage" rows="3" placeholder="Gift Card Message..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="modal-footer-action mt-5">
                                <button type="button" className={"btn btn-link link-company-old mr-2"} onClick={this.onClickMoreField}>
                                    <i className={"fa fa-long-arrow-" + (this.state.showMoreField ? "up" : "down")} aria-hidden="true"></i> {this.state.showMoreField ? 'Less Field' : 'More Field'}
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClickNext}>NEXT</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default SalesOrderDeliveryForm;