import React, { Component } from 'react';
import { 
  Card,
  CardBody, 
  Col,
  Row, 
  Form, FormGroup, Label, Input, FormFeedback, FormText
} from 'reactstrap';

class Inventory extends Component {
  constructor(props) {
    super(props);   
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card className="cardTransparent">
              <CardBody>
                <Row className="align-items-center">
                  <Col col="12" xl className="mb-3 mb-xl-0">
                    <h4><strong>Inventory</strong></h4>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            </Col>
        </Row>
      </div>
    );
  }
}

export default Inventory;
