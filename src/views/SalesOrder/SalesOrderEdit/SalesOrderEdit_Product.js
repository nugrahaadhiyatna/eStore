import React, { Component } from 'react';
import { Table } from 'reactstrap';
import SalesOrderEdit from './SalesOrderEdit';
import CurrencyFormat from 'react-currency-format'; 

class SalesOrderEdit_Product extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        products: props.salesOrder.products
      };       
    }

    componentDidMount(){
      //
    }

    createProduct() {
        return {
            productCode: "",
            qty: 0,
            countryOfOrigin: "",
            price: "",
        };
    }

    onClickNext = () => {
        let products = this.state.products;
        this.props.handleProduct(products);
    }

    handleAddRow = () => {
      let item = this.createProduct();
      let products = [...this.state.products, item];
    //   this.setState({ products: products });
    };

    handleRemoveRow = (idx) => () => {
      let products = [...this.state.products]
      products.splice(idx, 1)
    //   this.setState({ products })
    };
      
    handleChange = idx => e => {
      const { name, value } = e.target;
      let products = [...this.state.products];
      products[idx][name] = value;
    //   this.setState({ products });
    };

    validate = () => {
        return true;
    }

    render(){
        return(
          <div>
          <Table hover responsive striped size="sm" className="table-condensed">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Product Code</th>
                    <th>QTY</th>
                    <th>Country of Origin</th>
                    <th>Price ($)</th>
                    <th className={this.props.trigger === SalesOrderEdit.TRIGGER.DETAIL ? "" : "d-none"}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.salesOrder.products.map((item, idx) => {
                  return (
                  <tr key={idx} data-idx={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      {/* <input id="productCode" name="productCode" type="text" className="form-control" placeholder="Add Product Code" value={item["PRODUCT"]} onChange={this.handleChange(idx)} readOnly={true} /> */}
                      <label>{item["PRODUCT"]}</label>
                    </td>
                    <td>
                      {/* <input id="qty" name="qty" type="number" className="form-control" placeholder="0" value={item["QUANTITY"]} onChange={this.handleChange(idx)} readOnly={true} /> */}
                      <label>{parseInt(item["QUANTITY"])}</label>
                    </td>
                    <td>
                      {/* <select id="countryOfOrigin" name="countryOfOrigin" className="form-control" defaultValue={item["COUNTRY_OF_ORIGIN"]} onChange={this.handleChange(idx)} readOnly={true} >
                        <option defaultValue>Select</option>
                        <option>...</option>
                      </select> */}
                      <label>{item["COUNTRY_OF_ORIGIN"]}</label>
                    </td>
                    <td>
                      {/* <input id="price" name="price" type="text" className="form-control" placeholder="0" value={item["ITEM_PRICE"]} onChange={this.handleChange(idx)} readOnly={true} /> */}
                      {/* <label>{item["ITEM_PRICE"]}</label> */}
                      <CurrencyFormat className="float-right" value={parseFloat(item["ITEM_PRICE"])} thousandSeparator={true} displayType={'text'} />
                    </td>
                    <td className={this.props.trigger === SalesOrderEdit.TRIGGER.DETAIL ? "" : "d-none"}>
                      <button type="button" className="btn btn-outline-dark iconTrash" onClick={this.handleRemoveRow(idx)}><i className="fa fa-trash"></i></button>
                    </td>
                  </tr>
                  )
                })}
                </tbody>
              </Table>
              {/* <Button onClick={this.handleAddRow} className={this.props.trigger === SalesOrderEdit.TRIGGER.DETAIL ? "" : "d-none"}>Add Product</Button> */}
              <hr></hr>
              <div className='row'>
                  <div className='col-9'>
                    <label className="float-right">Total: </label>
                  </div>
                  <div className='col-3'>
                      <CurrencyFormat className="float-right" value={ this.props.salesOrder.products.reduce((acc, cur) => { return (parseFloat(cur["ITEM_PRICE"])) + acc;}, 0)} thousandSeparator={true} displayType={'text'} />
                  </div>
              </div>
              <div className="row">
                  <div className="col-12">
                      <div className="modal-footer-action mt-5">
                          <button type="button" className="btn btnWhite mr-auto" onClick={this.props.onClickBack}>BACK</button>
                          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClickNext}>NEXT</button>
                      </div>
                  </div>
              </div>
      </div>
        );
    }
}

export default SalesOrderEdit_Product;
