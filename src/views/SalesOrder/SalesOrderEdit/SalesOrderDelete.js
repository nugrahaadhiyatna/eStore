import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from 'reactstrap';
import axios from 'axios';

import Authentication from 'Auth/Authentication';
import AppComponent from 'AppComponent';


class SalesOrderEdit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modalDeleteConfirmation: { 
                isShow: false,
                message: '',
                statusName: '',
                statusCode: ''
            },
            isValid:false
        };
    }

    toggleDeleteConfirmation = () => {
        if(!this.state.isValid){ return; }
        let self = this;
        let successHandler = function(data){
            let modalDeleteConfirmation = self.state.modalDeleteConfirmation;
            modalDeleteConfirmation.message = data.MESSAGE;
            modalDeleteConfirmation.statusName = data.STATUS_NAME;
            modalDeleteConfirmation.statusCode = data.STATUS_CODE;
            self.setState({
                modalDeleteConfirmation: modalDeleteConfirmation
            });
            self.props.toggleModal();
            self.toggleDeleteAll();
        }
        let errorHandler = function(data){
            let modalDeleteConfirmation = self.state.modalDeleteConfirmation;
            modalDeleteConfirmation.message = data.MESSAGE;
            modalDeleteConfirmation.statusName = data.STATUS_NAME;
            modalDeleteConfirmation.statusCode = data.STATUS_CODE;
            self.setState({
                modalDeleteConfirmation: modalDeleteConfirmation
            });
            self.props.toggleModal();
            self.toggleDeleteAll();
        }
        this.doDelete(successHandler, errorHandler);
    }

    doDelete = (successHandler, errorHandler) => {
        let erpOrder = this.props.salesOrder.deliveryOrder["erp_order"];
        let id = this.props.salesOrder.deliveryOrder["id"];
        let endpoint = "scale/_proc/API_ShipmentDelete"
        let params = {
            erp_order: erpOrder,
            id: id,
        };
        axios.get(AppComponent.getBaseUrl() + endpoint, {
            params: params,
            headers: {
                'Content-Type': 'application/json',
                'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
                'X-Company-Code': Authentication.getCompanyCode(),
                'X-DreamFactory-Session-Token': Authentication.getToken()
            }
        })
        .then((response) => {
            return response.data;
        })
        // .catch(function (error) {
        //     if (error.response) {
        //         if(error.response.status === 400) {// whether display error if no items found
        //             console.log("Failed to proceess your request.");
        //         } else {
        //             console.log("Failed to proceess your request.");
        //         }
        //     } else {
        //         console.log("Failed to proceess your request.");
        //     }
        //     return {
        //         "STATUS_CODE": 400,
        //         "STATUS_NAME": "FAIL",
        //         "MESSAGE": "Failed to proceess your request."
        //     }
        // })
        .then(function(result) {
            if(result["STATUS_CODE"] == 4000) {
                successHandler(result);
            } else {
                errorHandler(result);
            }
        });
    }

    toggleDeleteAll = () => {
        let modalDeleteConfirmation = this.state.modalDeleteConfirmation;
        modalDeleteConfirmation.isShow = !modalDeleteConfirmation.isShow;
        let self = this;
        this.setState({ modalDeleteConfirmation: modalDeleteConfirmation }, function(){
            if(!self.state.modalDeleteConfirmation.isShow)
            self.redirectToSalesOrder();
        });
    }

    redirectToSalesOrder = () => {
        this.props.history.push('/salesOrder');
    }

  validate = (e) => {
    let value = e.target.value;
    this.setState({ isValid: value === "DEL" });
  };

  render() {
    return (
      <div>
         
          <div>
            <Row>
                    <Modal isOpen={this.props.isOpen} toggle={this.props.toggleModal} centered={true} className={'modal-company'} backdrop="static">
                            <ModalHeader toggle={this.props.toggleModal}>
                              Delete
                            </ModalHeader>
                            <form >
                            <ModalBody>
                            <Row>
                                <Col xs="12" md="12" className="mb-4">
                                    <div>
                                        <center>
                                            <span className="fa fa-trash fa-5x">
                                            </span>
                                        </center>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="mb-4">
                                    <center>
                                        <Label>Are you sure to delete?</Label><br></br>
                                        <Label>Once deleted this record can not be recovered.</Label><br></br>
                                        <Label>Please type <b>DEL</b> in the textbox confirm</Label>
                                    </center>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="mb-4">
                                    <center>
                                        <Input type="text" className="textCenterAlign" centered="true" placeholder="type DEL here" style={{width:"250px"}} onChange={this.validate}></Input>
                                    </center>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="mb-4">
                                    <div>
                                        <center>
                                            <Button style={{width:"250px"}} onClick= {this.toggleDeleteConfirmation} disabled={!this.state.isValid}>
                                                Delete
                                            </Button>
                                        </center>    
                                    </div>
                                    <div>
                                        
                                    </div>                        
                                </Col>
                            </Row>
                            </ModalBody>
                            </form>
                    </Modal>
            </Row>
          </div>
          <div>
            <Row>
                <Modal isOpen={this.state.modalDeleteConfirmation.isShow} toggle={this.toggleDeleteConfirmation} centered={true} className={'modal-company'} backdrop="static">
                    <ModalHeader toggle={this.toggleDeleteConfirmation}>
                        Delete
                    </ModalHeader>
                    
                      <ModalBody>
                    <Row>
                        <Col xs="12" md="12" className="mb-4">
                            <div>
                                <center>
                                    <span className={this.state.modalDeleteConfirmation.statusCode === "4000" ? "fa fa-check-circle fa-5x":"fa fa-minus-circle fa-5x"}></span>
                                </center>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="12" className="mb-4">
                            <center>
                                <Label>
                                    { this.state.modalDeleteConfirmation.message }
                                </Label>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="12" className="mb-4">
                            <center>
                                <Button style={{width:"250px"}} onClick={this.toggleDeleteAll}>
                                    OK
                                </Button>
                            </center>                            
                        </Col>
                    </Row>
                </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                </Modal>
            </Row>
          </div>
      </div>
    );
  }
}

export default SalesOrderEdit;
