import React, { Component } from 'react';
import { 
    Col, 
    Row, 
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import './SalesOrderEditColumn.css'

export default class SalesOrderEditColumn extends Component {
    constructor(props){
        super(props);
        this.state = { };
        this.columnForm = React.createRef();
    }
    
    componentDidUpdate() {
        if(this.props.isOpen)
            this.setEnableElements();
    }

    onClickUpdateTable = () => {
        let columns = this.props.fields.map((element) => {
            element.isVisible = this.columnForm.current[element.id].checked;
            return element;
        });
        this.props.updateTableColumn(columns);
        this.props.toggle();
    }

    setEnableElements = () => {
        let form = this.columnForm.current;
        
        let totalCheckedCheckbox = this.props.fields.reduce((acc, cur) => {
            return (form[cur.id].checked ? 1 : 0) + acc;
        }, 0);
        this.props.fields.forEach((item, idx) => {
            if(item.id === 'orderId') return;
            form[item.id].disabled = totalCheckedCheckbox >= 10 && !form[item.id].checked;
        });   
    }
    render(){
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-company modal-lg animated fadeIn' backdrop="static">
                <ModalHeader toggle={this.props.toggle} tag="div">
                    <h3>Edit Columns</h3>
                    <p className="d-block m-0 p-0">Please select up to 10 of the below columns to show. </p>
                </ModalHeader>
                <ModalBody>
                    <div className="container-fluid px-4">
                        <Row>
                            <Col xs="12">
                                <form ref={this.columnForm}>
                                    <div className="form-row">
                                        {this.props.fields.map((item, idx) => (
                                            <div className="form-group col-12 col-sm-6 col-md-4" key={item.id}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultChecked={item.isVisible} value={item.value} id={item.id} name={item.id} disabled={item.isDisabled} onChange={this.setEnableElements} />
                                                    <label className="form-check-label" htmlFor={item.id}>
                                                        {item.checkboxLabelText}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <div className="col-12">
                                <div className="">
                                    <button type="button" className="btn btn-company font-weight-bold pull-right" onClick={this.onClickUpdateTable}>Update Table</button>    
                                </div>
                            </div>
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}