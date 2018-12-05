import React, { Component, Fragment } from 'react';
import { FormFeedback } from 'reactstrap';

class SalesOrderEdit_Delivery extends Component {
    constructor(props){
        super(props);
        this.state = {
            salesChannelChecked: 'b2c',
            showMoreField: false,
            chars_left : 25,
            valid: {
                companyName: { isValid: true, message: "" },
            }
        };
        this.deliveryForm = React.createRef();
    }

    onSalesChannelChange = (e) => {
        this.setState({ salesChannelChecked: e.target.value});
    }

    onClickMoreField = () => {
        this.setState({ showMoreField: !this.state.showMoreField });
    }
    
    onClickNext = (preventNavigate) => {
        let isValid = this.validateForm();
        let data = isValid ? this.getData() : false;
        this.props.handleDeliveryOrder(data, preventNavigate);
    }

    getData = () => {
        return this.deliveryForm.current;
    }

    wordCount = (e) => {
        let charCount = e.target.value.length;
        let charLeft = 25 - charCount;
        this.setState({ chars_left: charLeft});
    }

    validateForm = () => {
        let form = this.deliveryForm.current;
        let validState = this.state.valid;
        let isValid = true;
        
        let companyNameValidState = validState.companyName;
        if(!form.companyName.value) {
            companyNameValidState.isValid = false;
            companyNameValidState.message = "Company Name must be filled.";
            validState.companyName = companyNameValidState;
            this.setState({valid: validState});
            isValid = false;
        } 
        // else if(form.companyName.value.length >= 25) {
        //     companyNameValidState.isValid = false;
        //     companyNameValidState.message = "Character length must be equal or less then 25.";
        //     validState.companyName = companyNameValidState;
        //     this.setState({valid: validState});
        //     isValid = false;
        // }

        return isValid;
    }

    onClickChange = (e) => {
      var text = e.currentTarget.value;
      let regularExp = /[\x22\x24\x25\x2c\x2d\x3a\x3b\x5e\x5f\r\n_?]/g;
      e.currentTarget.value = text.match(regularExp)? text.replace(regularExp,''):text;
    }
   

    render(){
        return (
            <Fragment>
                <form ref={this.deliveryForm}>
                    <div className="row">
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input type="text" maxLength={25} className={"form-control" + (this.state.valid.companyName.isValid ? "" : " is-invalid")} id="companyName" name="ship_to" defaultValue={this.props.salesOrder.deliveryOrder["ship_to"]} onChange={this.onClickChange}/>
                                <FormFeedback valid={false}>{this.state.valid.companyName.message}</FormFeedback>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="originWarehouse">Origin Warehouse</label>
                                    <input id="originWarehouse" name="originWarehouse" type="text" readOnly className="form-control border-0" defaultValue={this.props.salesOrder.deliveryOrder["warehouse"]} maxLength={10} onChange={this.onClickChange}></input>
                                    {/* <select id="originWarehouse" name="originWarehouse" className="form-control" defaultValue={this.props.salesOrder.deliveryOrder["warehouse"]}>
                                        <option value="BLA">BLA</option>
                                        <option value="LAV">LAV</option>
                                    </select> */}
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="destinationCountry">Destination Country</label>
                                    <input id="destinationCountry" name="ship_to_country" type="text" readOnly className="form-control border-0" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_country"]} maxLength={2} onChange={this.onClickChange}></input>
                                    {/* <select id="destinationCountry" name="ship_to_country" className="form-control" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_country"]}>
                                        {countries.map((country) => (
                                            <option key={country.value} value={country.value}>{country.text}</option>
                                        ) )}                                       
                                    </select> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deliveryPhoneNumber">Delivery Phone Number</label>
                                <input type="text" maxLength={25} className="form-control" id="deliveryPhoneNumber" name="ship_to_phone_num" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_phone_num"]} onChange={this.onClickChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="orderId">Order ID</label>
                                <input type="text" readOnly className="form-control border-0" id="orderId" name="orderId" defaultValue={this.props.salesOrder.deliveryOrder["erp_order"]} />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="deliveryCode">Delivery Code</label>
                                    <select id="deliveryCode" name="delivery_code" className="form-control" defaultValue={this.props.salesOrder.deliveryOrder["delivery_code"]}>
                                        <option value=""></option>
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
                                    <input id="service" name="carrier_service" type="text" readOnly className="form-control border-0" defaultValue={this.props.salesOrder.deliveryOrder["carrier_service"]} maxLength={2} onChange={this.onClickChange}></input>
                                    {/* <select id="service" name="carrier_service" className="form-control" defaultValue={this.props.salesOrder.deliveryOrder["carrier_service"]}>
                                        <option value=""></option>
                                        <option value="S1">S1</option>
                                        <option value="X6">X6</option>
                                    </select> */}
                                </div>
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="deliveryEmailAddress">Delivery Email Address</label>
                                <input type="text" className="form-control" id="deliveryEmailAddress" name="ship_to_email_address" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_email_address"]} maxLength={50} onChange={this.onClickChange}/>
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="deliveryName">Delivery Name</label>
                                <input type="text" className="form-control" id="deliveryName" name="ship_to_name" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_name"]} maxLength={50} onChange={this.onClickChange}/>
                                {/* <input type="text" className={this.props.trigger === SalesOrderEdit.TRIGGER.DETAIL ? "" : "d-none"} id="deliveryName" name="ship_to_name" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_name"]} /> */}
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="deliveryAddress2">Delivery Address 2</label>
                                <textarea className="form-control" id="deliveryAddress2" name="ship_to_address2" rows="3" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_address2"]} maxLength={40} onChange={this.onClickChange}></textarea>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-group">
                                <label htmlFor="deliveryAddress1">Delivery Address 1</label>
                                <textarea className="form-control" id="deliveryAddress1" name="ship_to_address1" rows="3" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_address1"]} maxLength={40} onChange={this.onClickChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subUrb">Suburb</label>
                                <input type="text" className="form-control" id="subUrb" name="ship_to_city" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_city"]} maxLength={30} onChange={this.onClickChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="state" className="d-none">State</label>
                                <select id="state" name="ship_to_state" className="form-control" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_state"]}>
                                    <option value=""></option>
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
                                <input type="text" className="form-control" maxLength={4} id="postCode" name="ship_to_postal_code" defaultValue={this.props.salesOrder.deliveryOrder["ship_to_postal_code"]} onChange={this.onClickChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Sales Channel</label>
                                <div className="btn-group-toggle" data-toggle="buttons" >
                                    <label className={'btn btn-company' + (this.props.salesOrder.deliveryOrder["sales_channel"] === "b2c" ? ' active' : '')}>
                                    <input type="radio" id="salesChannel1" name="sales_channel" autoComplete="off" value="b2c" checked={this.props.salesOrder.deliveryOrder["sales_channel"] == "b2c"} onChange={this.onSalesChannelChange} />  B2C
                                    </label>
                                    <label className={'btn btn-company' + (this.props.salesOrder.deliveryOrder["sales_channel"] === "b2b" ? ' active' : '')}>
                                    <input type="radio" id="salesChannel2" name="sales_channel" autoComplete="off" value="b2b" checked={this.props.salesOrder.deliveryOrder["sales_channel"] == "b2b"} onChange={this.onSalesChannelChange} /> B2B
                                    </label>
                                </div>
                            </div>
                            <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
                                <label htmlFor="brandCode">Brand Code</label>
                                <input type="text" className="form-control" id="brandCode" name="brand_code" defaultValue={this.props.salesOrder.deliveryOrder["brand_code"] !== null ? this.props.salesOrder.deliveryOrder["brand_code"] : ""} maxLength={6} onChange={this.onClickChange} />
                            </div>
                            {/* <div className={"form-group" + (this.state.showMoreField ? "" : " d-none")}>
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
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="modal-footer-action mt-5">
                                <button type="button" className={"btn btn-link link-company-old mr-2"} onClick={this.onClickMoreField}>
                                    <i className={"fa fa-long-arrow-" + (this.state.showMoreField ? "up" : "down")} aria-hidden="true"></i> {this.state.showMoreField ? 'Show less' : 'Show more'}
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.onClickNext()}>NEXT</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default SalesOrderEdit_Delivery;