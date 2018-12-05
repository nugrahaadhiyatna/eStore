import React, { Component } from 'react';
import { 
  Card,
  CardBody, 
  Col, 
  Row, 
  Table,
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import Paging from '../General/Paging';
import AppComponent from 'AppComponent';
import initSalesOrders from './initSalesOrders';
import Authentication from 'Auth/Authentication';
import { sortObject } from '../../AppComponent/Helper';
import SalesOrderEditColumn from './SalesOrderEditColumn';
import SalesOrderAdd from './SalesOrderAdd/SalesOrderAdd';

import "react-datepicker/dist/react-datepicker.css";
import './SalesOrder.css'

class SalesOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {          
          isVisible: [],
          before_date: null,
          after_date: null,
          displayContent: "INIT",
          notFoundMessage: '',
          isLoaded: false,
          isSearch: false,
          modalAdd: false,
          salesOrders: [],
          displayMoreColumnModal: false,
          searchTermsTooltip: false,
          currentPage:1,
          startIndex:0,
          lastIndex:0,
          displayPage:50,
          totalRows:0,
          maxPage:0,
          columns: [
            {id:"originWarehouse", checkboxLabelText:"Warehouse", tableHeaderText: "Warehouse", isVisible: true, key: "WAREHOUSE" },
            {id:"orderId", checkboxLabelText:"Shipment ID", tableHeaderText: "Shipment ID", isVisible: true, key: "ERP_ORDER", isDisabled: true },
            {id:"company", checkboxLabelText:"Company", tableHeaderText: "Company", isVisible: true, key: "SHIP_TO" },
            {id:"deliveryName", checkboxLabelText:"Name", tableHeaderText: "Name", isVisible: true, key: "SHIP_TO_NAME" },
            {id:"deliveryAddress1", checkboxLabelText:"Address Line 1", tableHeaderText: "Address Line 1", isVisible: false, key: "SHIP_TO_ADDRESS1" },
            {id:"deliveryAddress2", checkboxLabelText:"Address Line 2", tableHeaderText: "Address Line 2", isVisible: false, key: "SHIP_TO_ADDRESS2" },
            {id:"subUrb", checkboxLabelText:"Suburb", tableHeaderText: "Suburb", isVisible: false, key: "SHIP_TO_CITY" },
            {id:"state", checkboxLabelText:"State", tableHeaderText: "State", isVisible: true, key: "SHIP_TO_STATE" },
            {id:"deliveryCountry", checkboxLabelText:"Country", tableHeaderText: "Country", isVisible: true, key: "SHIP_TO_COUNTRY" },
            {id:"postCode", checkboxLabelText:"Postcode", tableHeaderText: "Postcode", isVisible: true, key: "SHIP_TO_POSTAL_CODE" },
            {id:"deliveryEmailAddress", checkboxLabelText:"Email", tableHeaderText: "Email", isVisible: false, key: "SHIP_TO_EMAIL_ADDRESS" },
            {id:"deliveryPhoneNumber", checkboxLabelText:"Phone", tableHeaderText: "Phone", isVisible: false, key: "SHIP_TO_PHONE_NUM" },
            {id:"orderStatus", checkboxLabelText:"Order Status", tableHeaderText: "Status", isVisible: true, key: "ORDER_STATUS" },
            {id:"trackingNumber", checkboxLabelText:"Tracking Number", tableHeaderText: "Tracking Number", isVisible: false, key: "TRACKING_NUM" },
            {id:"deliveryCode", checkboxLabelText:"Delivery Code", tableHeaderText: "Delivery Code", isVisible: false, key: "DELIVERY_CODE" },
            {id:"carrier", checkboxLabelText:"Carrier", tableHeaderText: "Carrier", isVisible: true, key: "CARRIER" },
            {id:"service", checkboxLabelText:"Carrier Service", tableHeaderText: "Carrier Service", isVisible: false, key: "CARRIER_SERVICE" },
            {id:"salesChannel", checkboxLabelText:"Sales Channel", tableHeaderText: "Sales Channel", isVisible: false, key: "SALES_CHANNEL" },
            {id:"brandCode", checkboxLabelText:"Brand Code", tableHeaderText: "Brand Code", isVisible: false, key: "BRAND_CODE" },
            {id:"creationDate", checkboxLabelText:"Creation Date", tableHeaderText: "Creation Date", isVisible: false, key: "CREATION_DATETIME" },
          ],
          filterData: {
            showPopup: false,
            item: {
              "beforeDateItem": { text: "Before Date", isVisible: true },
              "afterDateItem": { text: "After Date", isVisible: true },
              "companyItem": { text: "Company", isVisible: false },
              "orderStatusItem": { text: "Order Status", isVisible: false },
              "warehouseItem": { text: "Warehouse", isVisible: false },
              "serviceItem": { text: "Service", isVisible: false },
              "carrierItem": { text: "Carrier", isVisible: false },
              // "deliveryCountryItem": { text: "Delivery Country", isVisible: false },
              "countryItem": { text: "Country", isVisible: false },
              "salesChannelItem": { text: "Sales Channel", isVisible: false },
            },
          },
          masterResource: [],
        };
        this.salesOrderAdd = React.createRef();
        this.searchForm = React.createRef();
        this.filterCheckbox = {};
      }

  

  toggleDisplayMoreColumn = () => {
      this.setState({ displayMoreColumnModal: !this.state.displayMoreColumnModal });
  }
  
  handleDetailClick = (erpOrder, id, e) => {
    this.props.history.push(`/SalesOrder/${erpOrder}/${id}`);
  }

  componentDidMount(){
    this.loadMasterResource();
  }
  
  loadMasterResource = () => {
    let params = {}
    let endpoint = "scale/_proc/API_FilterCriteria";
    let self = this;
    axios.get(AppComponent.getBaseUrl() + endpoint, {
    // axios.get("http://demo.onebyone.co.id/api/caller/getz?endpoint=https://testapi.estorelogistics.com.au/api/v2/scale/_proc/API_FilterCriteria", {
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
        'X-Company-Code': Authentication.getCompanyCode(),
        'X-DreamFactory-Session-Token': Authentication.getToken()
      }
    })
    .then(res => {
      // console.log(res)
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
      console.log("Failed to proceess your request.");
      } else {
      console.log("Failed to proceess your request.");
      }
      return {};
    })
    .then(function(result) {
      self.setState({ masterResource: result });
      // localStorage.setItem("list", JSON.stringify(result));
    });
  }

  diplaySearchTermsTooltip = (isDisplay) => {
    this.setState({ searchTermsTooltip: isDisplay });
  }

  isValidSearchPayload = (form) => {
    return form.search_term.value;
  }


    doSearch = () => {
      console.log("a");
      let self = this;

      let form = this.searchForm.current;
        if(!this.isValidSearchPayload(form)) {
          // this.diplaySearchTermsTooltip(true);
          return;
        }

        this.setState({isSearch:true,currentPage:1,startIndex:0,lastIndex:0,totalRows:0,maxPage:0});
        let params = {};
        if(form.before_date.value && this.state.filterData.item["beforeDateItem"].isVisible) params.before_date = form.before_date.value;
        if(form.after_date.value && this.state.filterData.item["afterDateItem"].isVisible) params.after_date = form.after_date.value;
        if(form.search_term.value) params.search_term = form.search_term.value;
        if(form.orderStatus.value && this.state.filterData.item["orderStatusItem"].isVisible) params.order_status = form.orderStatus.value;
        if(form.company.value && this.state.filterData.item["companyItem"].isVisible) params.company = form.company.value;
        if(form.warehouse.value && this.state.filterData.item["warehouseItem"].isVisible) params.warehouse = form.warehouse.value;
        if(form.service.value && this.state.filterData.item["serviceItem"].isVisible) params.service = form.service.value;
        if(form.carrier.value && this.state.filterData.item["carrierItem"].isVisible) params.carrier = form.carrier.value;
        if(form.country.value && this.state.filterData.item["countryItem"].isVisible) params.country = form.country.value;
        if(form.sales_channel.value && this.state.filterData.item["salesChannelItem"].isVisible) params.sales_channel = form.sales_channel.value;

        //let self = this;
        let endpoint = "scale/_proc/API_SalesOrderSearch";
        axios.get(AppComponent.getBaseUrl() + endpoint, {
            params: params,
            headers: {
                'Content-Type': 'application/json',
                'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
                'X-Company-Code': Authentication.getCompanyCode(),
                'X-DreamFactory-Session-Token': Authentication.getToken()
            }
        })
        .then(res => {
          self.setState({ displayContent: "FOUND", isSearch:false,isLoaded:false });
           return res.data.resource;
        })
        .catch(function (error) {
          self.setState({ displayContent: "NOT_FOUND" });
          if (error.response) {
            if(error.response.status === 400) {// whether display error if no items found
                self.setState({ notFoundMessage: error.response.data.MESSAGE,isSearch:false,isLoaded:false });
              } else {
                
                console.log("Failed to proceess your request.");
                
              }
          } else {
            self.setState({ notFoundMessage: "Failed to proceess your request.", isSearch:false,isLoaded:false });
          }
           
          return [];
        })
        .then(function(result) {
            if(result.length > self.state.displayPage){
              let totalPage = result.length % self.state.displayPage
              if(totalPage > 0){
                totalPage += 1;
              }else{
                totalPage =  result.length / self.state.displayPage
              }
              self.setState({ salesOrders: result,totalRows:result.length,maxPage:totalPage });
            }else{
              self.setState({ salesOrders: result,totalRows:result.length,maxPage:1 });
            }

            self.numberEventClick(self.state.currentPage);
        });
    }

  initializeSalesOrders = () => {
    const key = "salesOrders";
    const strSalesOrders = localStorage.getItem(key);
    if(strSalesOrders !== null){
      this.setState({ salesOrders: JSON.parse(strSalesOrders) });
    } else {
      this.setState({ salesOrders: initSalesOrders });
    }
  }

  toggleModalAdd = () => {
    if(this.state.modalAdd) {
      this.salesOrderAdd.current.activeTabIndex(1);
    }
    this.setState({ modalAdd: !this.state.modalAdd });
    console.log(Authentication.getToken());
  }

  updateTableColumn = (columns) => {
    this.setState({ columns: columns })
  }

  triggerChangeFilterBox = (id) => (e) => {
    console.log(this.filterCheckbox[id]);
    //this.filterCheckbox[id].click();
    e.stopPropagation();
  }

  toggleAddFilter = () => {
    let filterData = this.state.filterData;
    filterData.showPopup = !filterData.showPopup;
    // filterData.item = this.getRawFilterDataItem();
    this.setState({ filterData: filterData });
  }

  itemFilterCheckedClick = (key,e) => {
    let isChecked = e.currentTarget.checked;
    let filterdata = this.state.filterData;
      if(isChecked){
        filterdata.item[key].isVisible= isChecked;
      }else{
        filterdata.item[key].isVisible= false;
      }
      this.setState({filterData:filterdata});
      e.stopPropagation();
    }
    
    itemFilterClick = (key, e) => {
      e.stopPropagation();
      this.toggleItemFilterShow(key);
    }

  toggleItemFilterShow = (key) => {
    this.setState((state) => {
      state.filterData.item[key].isVisible = !state.filterData.item[key].isVisible;
      return state;
    });
  }

  getRawFilterDataItem = () => {
    let filterDataItem = this.state.filterData.item;
    Object.keys(this.filterCheckbox).map((key) => {
      filterDataItem[key].isVisible = this.filterCheckbox[key].checked;
    });
    return filterDataItem;
  }

  removeFilterField = (e) => {
    let id = e.currentTarget.dataset.id;
    // this.filterCheckbox[id].click();
    console.log(id);
    this.setState((state) => {
      this.filterCheckbox[id] = state.filterData.item[id].isVisible = false;
      return state;
    });
  }

  nextPageClick = () => {
      if(this.state.currentPage < this.state.maxPage){
        this.setState((prev,next) => { 
          {currentPage:prev.currentPage++};
          this.changeStartIndex(prev.currentPage);
          this.changeLastIndex(prev.currentPage);
        } );
      }
  }

  changeStartIndex = (currentPage) => {
    //if(this.state.startIndex <= this.state.salesOrders.length && this.state.lastIndex <= this.state.salesOrders.length)
        this.setState({startIndex:(parseInt(currentPage) * this.state.displayPage) - this.state.displayPage});
  }

  changeLastIndex = (currentPage) => {
    //if(this.state.salesOrders.length >= this.state.lastIndex)
      this.setState({lastIndex:parseInt(currentPage) * this.state.displayPage});
  }


  backPageClick = () => {
    if(this.state.currentPage > 1){
      this.setState((prev,next) => { 
        {currentPage:prev.currentPage--};
        this.changeStartIndex(prev.currentPage);
        this.changeLastIndex(prev.currentPage);
      } );
    }
  }

  numberEventClick = (currentPage) => {
     let page = parseInt(currentPage);
     this.setState({currentPage:page});
     this.changeStartIndex(page);
     this.changeLastIndex(page);
  }

  beforeDateChange = (date) => {
    this.setState({ before_date: date});
  }

  afterDateChange = (date) => {
    this.setState({ after_date: date});
  }

  render() {
    let content;
    

    switch(this.state.displayContent) {
      case "FOUND":
        content = 
        <Card className={this.state.isSearch?"init-table-content border-0":"listHeight border-0"}>
            <div className={this.state.isSearch?'d-none':''}>
                <CardBody className="p-0">
                  <div className="displayMoreColumn" onClick={this.toggleDisplayMoreColumn}></div>
                  <Table hover responsive striped size="sm" className="table-condensed mb-0">
                    <thead>
                      <tr>
                          {this.state.columns.map((item, idx) => {
                              if(item.isVisible)  
                                  return <th className="p-3 text-justify" key={idx}>{item.tableHeaderText}</th>
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.salesOrders.slice(this.state.startIndex,this.state.lastIndex).map((item, idx) => (
                          <tr key={idx}>
                              {this.state.columns.map((column, columnIdx) => {
                                
                                  if(column.isVisible){
                                      if(column.id === "orderId"){
                                          return <td key={columnIdx} className="px-3 text-justify"><u><a className="company-link" onClick={ (e) => this.handleDetailClick(item["ERP_ORDER"], item["ID"], e)} href={"#/salesOrder/"+ item['ERP_ORDER']+"/"+item["ID"]} >{item[column.key]}</a></u></td>
                                      }
                                      if(column.id === "deliveryCountry") {
                                          return <td key={columnIdx} className="px-3 text-justify">{item[column.key]}</td>
                                      }
                                      return <td key={columnIdx} className="px-3 text-justify">{item[column.key]}</td>
                                  }
                              })}
                          </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                <div className="bg-transparent card-footer text-center border-company border-top-0">
                    {/* <span>1</span> - <span>11</span> of <span>120</span> list | <button className="btn btn-link company-link p-0" onClick={this.backPageClick}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</button> <button className="btn btn-link company-link p-0">1</button> <button className="btn btn-link company-link p-0">2</button> <button className="btn btn-link company-link p-0">3</button> ... <button className="btn btn-link company-link p-0">10</button> <button className="btn btn-link company-link p-0" onClick={this.nextPageClick}>Next <i className="fa fa-chevron-right" aria-hidden="true"></i></button> */}
                    <Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick} totalRows={this.state.totalRows} displayPage={this.state.displayPage} currentPage={this.state.currentPage} maxPage={this.state.maxPage} numberEventClick={this.numberEventClick}/>
                    {/* <button className="btn btn-link company-link p-0" onClick={this.backPageClick}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</button> |  <button className="btn btn-link company-link p-0" onClick={this.nextPageClick}>Next <i className="fa fa-chevron-right" aria-hidden="true"></i></button> */}
                    
                </div>
            </div>

              <div className="d-flex h-100 position-relative">
                <div className="bg-transparent mx-auto my-auto text-center">
                    <div className={this.state.isSearch?"":"d-none"}>
                      <i className= {!this.state.isLoaded ? 'fa fa-refresh fa-10x fa-spin':'fa fa-refresh fa-10x d-none'}></i>
                      <br/>
                      <label>loading...</label>
                    </div>
                </div>
              </div>
        </Card>

        break;
      default: 
        content = 
            <Card className="init-table-content border-0">
              <div className="d-flex h-100 position-relative">
                <div className="bg-transparent mx-auto my-auto text-center">
                    <div className={!this.state.isSearch?"":"d-none"}>
                      <div className={this.state.displayContent === "INIT" ? "init-content-image" : "not-found-content-image"}></div>
                      <p className="font-2xl color-gray">{ this.state.displayContent === "INIT" ? "Search for a specific sales order and select a filter to narrow down your search" : this.state.notFoundMessage }</p>
                    </div>
                    <div className={this.state.isSearch?"":"d-none"}>
                      <i className= {!this.state.isLoaded ? 'fa fa-refresh fa-10x fa-spin':'fa fa-refresh fa-10x d-none'}></i>
                      <br/>
                      <label>loading...</label>
                    </div>
                </div>
              </div>
            </Card>
    }
    
   
    return (
      <React.Fragment>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card className="cardTransparent">
              <CardBody className="px-0">
                <Row className="align-items-center">
                  <Col md="6">
                    <h4 className="headerTitle">Sales Order Search</h4>
                  </Col>
                  <Col md="6">
                    {/* <Button className="btnWhite float-right" style={{width:"135px"}} outline color="dark" onClick={this.toggleModalAdd}>
                      <div>
                      <i className="fa fa-plus iconSpace">
                      </i>
                      <a className="textYellowBg">
                        Add Sales Order
                      </a>
                      </div>
                    </Button> */}
                    <SalesOrderAdd ref={this.salesOrderAdd} isOpen={this.state.modalAdd} toggle={this.toggleModalAdd} addSalesOrder={this.addSalesOrder} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="border-0">
              <CardBody>
                <form ref={this.searchForm} onSubmit={ (e) => { e.preventDefault(); this.doSearch(); } }>
                  <Row className="margin-bottom-limabelas">
                      <Col md="12">
                        <FormGroup>
                        <InputGroup>
                          <Input name="search_term" id="searchBox" autoComplete="off" size="16" type="text" placeholder="Search Sales Order..." />
                          {/* <Input name="search_term" id="searchBox" size="16" type="text" placeholder="Search Sales Order..." required onChange={(e) => { if(e.target.value.length > 0) this.diplaySearchTermsTooltip(false); }} />
                          <Tooltip placement="bottom-end" isOpen={this.state.searchTermsTooltip} target={'searchBox'} toggle={() => { this.diplaySearchTermsTooltip(false, this)} }>
                            Please fill out this content.
                          </Tooltip> */}
                          <InputGroupAddon addonType="append">
                            <Button type="submit" color="secondary" className="float-right" style={{width:"135px"}} onClick={this.doSearch}>
                              <i className="fa fa-search iconSpace"></i> Search
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>

                    </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <div className="input-group">
                      <div className="bbb" style={{position: "relative", "WebkitBoxFlex": 1, "MsFlex": "1 1 auto", flex: "1 1 auto", width: "1%", "marginBottom": 0 }}>
                        <Row>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["afterDateItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <DatePicker
                                  name="after_date"
                                  placeholderText="Created After"
                                  className="form-control"
                                  selected={this.state.after_date}
                                  onChange={this.afterDateChange}
                                  dateFormat="YYYY-MM-DD"
                                />
                                <InputGroupAddon addonType="append">
                                <Button onClick={this.removeFilterField} data-id="afterDateItem" color="company-inverse" className="no-radius">
                                     <i className="fa fa-times" aria-hidden="true"></i>
                                </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["beforeDateItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <DatePicker
                                  name="before_date"
                                  placeholderText="Created Before"
                                  className="form-control"
                                  selected={this.state.before_date}
                                  onChange={this.beforeDateChange}
                                  dateFormat="YYYY-MM-DD"
                                />
                                <InputGroupAddon addonType="append">
                                <Button onClick={this.removeFilterField} data-id="beforeDateItem" color="company-inverse" className="no-radius">
                                  <i className="fa fa-times" aria-hidden="true"></i>
                                </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["companyItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="company" type="select" id="select_1">
                                  <option value="">Company</option>
                                  <option value="steven">steven</option>
                                  <option value="company 2">company 2</option>
                                </Input>
                              <InputGroupAddon addonType="append">
                              <Button onClick={this.removeFilterField} data-id="companyItem" color="company-inverse" className="no-radius"><i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                            </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["warehouseItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="warehouse" type="select" id="select_1">
                                  {this.state.masterResource.filter((item) => item.FILTER_NAME === "WAREHOUSE").sort((a, b) => sortObject(a, b, "EXTENDED_VALUE")).map((item) => (
                                            <option key={item.SYS_VALUE} value={item.SYS_VALUE}>{item.EXTENDED_VALUE}</option>
                                        ) )}
                                </Input>
                                <InputGroupAddon addonType="append">
                                <Button onClick={this.removeFilterField} data-id="warehouseItem" color="company-inverse" className="no-radius">
                                    <i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["orderStatusItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="orderStatus" type="select" id="orderStatus">
                                  <option value="">Order Status</option>
                                  <option value="In Pool">In Pool</option>
                                  <option value="In Process">In Process</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Closed">Closed</option>
                                </Input>
                                <InputGroupAddon addonType="append"><Button onClick={this.removeFilterField} data-id="orderStatusItem" color="company-inverse" className="no-radius"><i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["serviceItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="service" type="select" id="select_3">
                                {this.state.masterResource.filter((item) => item.FILTER_NAME === "SERVICE").sort((a, b) => sortObject(a, b, "EXTENDED_VALUE")).map((item, i) => (
                                    <option key={"SERVICE_" + i + item.SYS_VALUE} value={item.SYS_VALUE}>{item.EXTENDED_VALUE}</option>
                                ) )}
                                </Input>
                                <InputGroupAddon addonType="append"><Button onClick={this.removeFilterField} data-id="serviceItem" color="company-inverse" className="no-radius"><i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["carrierItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="carrier" type="select" id="select_3">
                                  {this.state.masterResource.filter((item) => item.FILTER_NAME === "CARRIER").sort((a, b) => sortObject(a, b, "EXTENDED_VALUE")).map((item, i) => (
                                      <option key={"CARRIER_" + i + item.SYS_VALUE} value={item.SYS_VALUE}>{item.EXTENDED_VALUE}</option>
                                  ) )}
                                </Input>
                                <InputGroupAddon addonType="append"><Button onClick={this.removeFilterField} data-id="carrierItem" color="company-inverse" className="no-radius"><i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["countryItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="country" type="select" id="select_4">
                                {/* {this.state.masterResource.filter((item) => item.FILTER_NAME === "COUNTRY").sort((a, b) => { return (a.EXTENDED_VALUE < b.EXTENDED_VALUE) ? -1 : (a.EXTENDED_VALUE > b.EXTENDED_VALUE) ? 1 : 0}).map((item, i) => ( */}
                                {this.state.masterResource.filter((item) => item.FILTER_NAME === "COUNTRY").sort((a, b) => sortObject(a, b, "EXTENDED_VALUE")).map((item, i) => (
                                    <option key={"COUNTRY_" + i + item.SYS_VALUE} value={item.SYS_VALUE}>{item.EXTENDED_VALUE}</option>
                                ) )}
                                </Input>
                                <InputGroupAddon addonType="append"><Button onClick={this.removeFilterField} data-id="countryItem" color="company-inverse" className="no-radius"><i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                              </InputGroup>
                            </Col>
                            <Col lg="2" md="3" sm="6" className={"mb-1" + (this.state.filterData.item["salesChannelItem"].isVisible ? "" : " d-none")}>
                              <InputGroup className="input-group-custom">
                                <Input name="sales_channel" type="select" id="select_4">
                                  {this.state.masterResource.filter((item) => item.FILTER_NAME === "SALES_CHANNEL").sort((a, b) => sortObject(a, b, "EXTENDED_VALUE")).map((item, i) => (
                                      <option key={"SALES_CHANNEL_" + i + item.SYS_VALUE} value={item.SYS_VALUE}>{item.EXTENDED_VALUE}</option>
                                  ) )}
                                  </Input>
                                <InputGroupAddon addonType="append"><Button onClick={this.removeFilterField} data-id="salesChannelItem" color="company-inverse" className="no-radius"><i className="fa fa-times" aria-hidden="true"></i></Button></InputGroupAddon>
                              </InputGroup>
                            </Col>
                          </Row>
                      </div>
                      <div className="ml-2">
                      <ButtonDropdown isOpen={this.state.filterData.showPopup} toggle={this.toggleAddFilter}>
                        <DropdownToggle caret className="btnWhite float-right" block outline color="dark" style={{width:"135px"}}>
                          <i className="fa fa-tasks iconSpace"></i>
                          <a className="textYellowBg" > Add filter </a>
                        </DropdownToggle>
                        <DropdownMenu right className="rounded-0" style={{border: "1px solid #000000"}}>
                            {
                              Object.keys(this.state.filterData.item).map((key, idx) => {
                                let item = this.state.filterData.item[key];
                                

                                // this.state.filterData.items.map((item, idx) => {
                                  // let key = item.id;
                                  if(key!="serviceItem" && key !="companyItem"){
                                    return (
                                      <DropdownItem key={key} id={key} className="border-0" onClick={ (e) => {this.itemFilterClick(key,e);} }>
                                          <div style={{margin: "-10px -20px", padding: "10px 20px" }} onClick={ (e) => { this.itemFilterClick(key, e)} }>
                                            <div className="form-check">
                                                {/* <input disabled={key==="serviceItem" || key==="companyItem" ? true:false} className="form-check-input" ref={ el => { this.filterCheckbox[key] = el } } type="checkbox" checked={ item.isVisible } value={ item.text } id={ key } onChange={(e) => { this.itemFilterCheckedClick(key,e);}} onClick={ (e) => { this.itemFilterCheckedClick(key,e);} } /> */}
                                                <input className="form-check-input" ref={ el => { this.filterCheckbox[key] = el } } type="checkbox" checked={ item.isVisible } value={ item.text } id={ key } onChange={(e) => { this.itemFilterCheckedClick(key,e);}} onClick={ (e) => { this.itemFilterCheckedClick(key,e);} } />
                                                <label className="form-check-label" htmlFor={ key } onClick={ (e) => {this.itemFilterClick(key,e);} } >
                                                    { item.text }
                                                </label>
                                            </div>
                                          </div>
                                          </DropdownItem>
                                        )
                                  }

                                }
                              )      
                            }
                        </DropdownMenu>
                      </ButtonDropdown>
                      </div>
                    </div>
                      
                    </Col>
                    <Col md="1">
                      
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>

            {/* {this.state.first ? null : (<div>bla</div>)} */}
           
            {content}
          </Col>
        </Row>
      </div>
      <SalesOrderEditColumn isOpen={this.state.displayMoreColumnModal} toggle={this.toggleDisplayMoreColumn} fields={this.state.columns} updateTableColumn={this.updateTableColumn} />
      </React.Fragment>
    );
  }
}

export default SalesOrder;
// Comment