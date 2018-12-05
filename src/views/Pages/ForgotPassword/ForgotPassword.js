import React, { Component } from 'react';
import bgVideo from '../../../assets/video/homepage-loop.mp4'
import eStoreIcon from '../../../assets/img/brand/estore_logistics_logo.svg'
import Reaptcha from 'reaptcha';
import Recaptcha from 'react-recaptcha';
import { Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Container, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row, 
  FormGroup, 
} from 'reactstrap';
import './ForgotPassword.css';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
    // this.reloadListener();
  }


  verifyCallback = (response) => {
      console.log("responsenya"+response);
      if(response)
        this.setState({verified:true});
  }

  buttonSendEmailClickHandler = () =>{
    this.props.history.push('/salesOrder');
  }

  imageClickHandler = () =>{
    this.props.history.push('/login');
  }

  componentWillMount = () => {
    // this.Reaptcha.render();
    console.log('test');
  }

  verifyCallback = (response) => {
    console.log("rresponnyua tokennya"+ response);
    this.setState({
      verified: true
    });
  };

  // reloadListener = () => {
  //   if (window.performance) {
  //     if (performance.navigation.type == 1) {
  //       console.log('reloaded');
  //     } 
  //   }
  // }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <video className='bgVideo' autoPlay loop muted>
          <source src={bgVideo} />
        </video>
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
                <Card>
                  <CardHeader className="card-header-yellow">
                    <Row className="align-items-center">
                      <Col col="12" xl className="mb-3 mb-xl-0">
                        <h1>Forgot Password</h1>
                      </Col>
                      <Col col="6" sm="4" md="3" xl="3" className="mb-3 mb-xl-0">
                        <img src={eStoreIcon} onClick={this.imageClickHandler} className="pointer" />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <p className="text-muted">Make sure you can receive email from eStore</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email address" autoComplete="email" />
                      </InputGroup>
                      <FormGroup>
                        {/* chaptcha for localhost */}
                        {/* <Reaptcha sitekey="6Lfx9XMUAAAAAL3XF668CUr9uFzMQ49D3Dr6NNiz" onVerify={this.onVerify} /> */}
                        {/* chaptcha for demo */}
                        {/* <Reaptcha sitekey="6LegHHQUAAAAAEaWdLS5Q5uMrBUq2ryard35AJ6V" onVerify={this.onVerify} /> */}
                        <Recaptcha sitekey="6Ld0nXcUAAAAAAXmbqf2nzffETdRKKCtY3sekT2T" verifyCallback={this.verifyCallback}/>
                      </FormGroup>
                      <Row>
                        <Col xs="12">
                          <Button onClick={this.buttonSendEmailClickHandler} disabled={!this.state.verified} color="primary-yellow" className="px-4 btn-primary-yellow" block>Send Email</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
