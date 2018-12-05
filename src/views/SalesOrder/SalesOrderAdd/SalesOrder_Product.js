import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class SalesOrder_Product extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        products: []
      };
    }
    
    componentDidMount(){
        this.initializeProduct();
    }

    initializeProduct = () => {
        this.setState({ products: [this.createProduct()]});
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
        let isValid = this.validateForm();
        let products = null;
        if(isValid){
            products = this.state.products;
        }
        this.props.handleProduct(isValid, products);
    }

    validateForm = () => {
        return true;
    }

    handleAddRow = () => {
      let item = this.createProduct();
      let products = [...this.state.products, item];
      this.setState({ products: products });
    };

    handleRemoveRow = (idx) => () => {
      let products = [...this.state.products]
      products.splice(idx, 1)
      this.setState({ products })
    };
      
    handleChange = idx => e => {
      const { name, value } = e.target;
      let products = [...this.state.products];
      products[idx][name] = value;
      this.setState({ products });
    };

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
                          <th>Price ($AUD)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.products.map((item, idx) => (
                        <tr key={idx} data-idx={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <input id="productCode" name="productCode" type="text" className="form-control" placeholder="Add Product Code" value={this.state.products[idx].productCode} onChange={this.handleChange(idx)} />
                            {/* <input type="text" className="form-control" id="productCode" placeholder="Add Product Code" name="productCode" /> */}
                          </td>
                          <td>
                            <input id="qty" name="qty" type="number" className="form-control" placeholder="0" value={this.state.products[idx].qty} onChange={this.handleChange(idx)} />
                            {/* <input type="number" className="form-control" id="qty" placeholder="0" name="qty" /> */}
                          </td>
                          <td>
                            <select id="countryOfOrigin" name="countryOfOrigin" className="form-control" value={this.state.products[idx].countryOfOrigin} onChange={this.handleChange(idx)} >
                            {/* <select id="countryOfOrigin" className="form-control" name="countryOfOrigin" > */}
                              <option defaultValue>Select</option>
                              <option>...</option>
                            </select>
                          </td>
                          <td><input id="price" name="price" type="text" className="form-control" placeholder="0" value={this.state.products[idx].price} onChange={this.handleChange(idx)} /></td>
                          {/* <td><input type="text" className="form-control" id="price" placeholder="0" name="price" /></td> */}
                          
                          <td><button type="button" className="btn btn-outline-dark iconTrash" onClick={this.handleRemoveRow(idx)}><i className="fa fa-trash"></i></button></td>
                        </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button onClick={this.handleAddRow}>Add Product</Button>
                    <hr></hr>
                    <div>Total: 0</div>
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

export default SalesOrder_Product;
