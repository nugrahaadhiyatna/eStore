import React, { Component } from 'react';
import bgVideo from '../../../assets/video/homepage-loop.mp4'
import eStoreIcon from '../../../assets/img/brand/estore_logistics_logo.svg'
import { Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Container,
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row, FormFeedback } 
  from 'reactstrap';

import Authentication from '../../../Auth/Authentication';


class Login extends Component {
      
    constructor(props){
    super(props);
    this.state = {
        formValidation: {
            isSuccess: true,
            message: ''
        },
        valid:{
          email:{
              isValid:true,
              message: ''
          },
          password:{
            isValid:true,
            message: ''
          }
        },
        isAlreadyLogin:false
    }
    this.loginForm = React.createRef();
    }

    validateForm = () => {
      let form = this.loginForm.current;
      let validState = this.state.valid;
  
      validState.email.isValid = form.email.value.length > 0;
      if(!validState.email.isValid) {
        validState.email.message = "Email / Username must be filled.";
      }
  
      validState.password.isValid = form.password.value.length > 0;
      if(!validState.password.isValid) {
        validState.password.message = "Password must be filled.";
      }
      
      this.setState({valid: validState});
      return validState.email.isValid && validState.password.isValid;
    
    }  

    LoginClick = () => {
      let isValid = this.validateForm();
      let form = this.loginForm.current;
      let params = {
          email: form.email.value,
          password: form.password.value,
          remember_me: form.rememberMe.checked
      }
      if(!isValid) { return; }

      this.setState({isAlreadyLogin:true});

        
        (new Authentication()).authenticationHandler(params)
            .then((result) => {
                if(result.isSuccess) {
                  
                    this.setState({isAlreadyLogin:false});
                    let defaultSuccessUrl = '/salesOrder';
                    //let successUrl = this.props.location.state ? this.props.location.state.returnUrl : defaultSuccessUrl;
                    let successUrl = defaultSuccessUrl;
                    this.props.history.push(successUrl);
                    return;
                }
                
                this.setState({formValidation: result}); 
                this.setState({isAlreadyLogin:false});
            });
      }

    buttonLoginClickHandler = () => {
      let isValid = this.validateForm();
      let form = this.loginForm.current;
      let params = {
          email: form.email.value,
          password: form.password.value,
          remember_me: true
      }
      if(!isValid) { return; }

      this.setState({isAlreadyLogin:true});

        (new Authentication()).authenticationHandler(params)
            .then((result) => {
                if(result.isSuccess) {
                 
                   this.setState({isAlreadyLogin:false});
                    let defaultSuccessUrl = '/salesOrder';
                    let successUrl = this.props.location.state ? this.props.location.state.returnUrl : defaultSuccessUrl;
                    this.props.history.push(successUrl);
                    return;
                }
                this.setState({formValidation: result,isAlreadyLogin:false}); 
            });
      }

    buttonForgotClickHandler = () => {
      this.props.history.push('/forgotPassword');
    }

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
                        <h1>Login</h1>
                      </Col>
                      <Col col="6" sm="4" md="3" xl="3" className="mb-3 mb-xl-0">
                        <img alt="" src={eStoreIcon} />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <form ref={this.loginForm} onSubmit={ (e)=>{e.preventDefault(); this.LoginClick() }}>
                      <p className="text-muted">Enter your credential below</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="email" type="text" placeholder="Email / Username" autoComplete="email" className={(this.state.valid.email.isValid ? "" : " is-invalid")}/>
                        <FormFeedback valid={false}>{this.state.valid.email.message}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" id="password" type="password" placeholder="Password" autoComplete="current-password" className={(this.state.valid.password.isValid ? "" : " is-invalid")}/>
                        <FormFeedback valid={false}>{this.state.valid.password.message}</FormFeedback>
                      </InputGroup>
                      <div className={"alert alert-danger" + (this.state.formValidation.isSuccess ? " d-none" : "")} role="alert" id="errorMessage">
                        {this.state.formValidation.message}
                      </div>
                      <Row>
                        <Col xs="12 mb-2">
                          <Button type="submit" color="primary-yellow" className="px-4 btn-primary-yellow" block>      
                            Login
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                        <div className={!this.state.isAlreadyLogin?'d-none':''}>
                          <i className= {this.state.isAlreadyLogin?'fa fa-refresh fa-2x fa-spin iconSpace':''}></i>
                          <label>loading...</label>
                        </div>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button onClick={this.buttonForgotClickHandler} color="link" className="btn-link-company px-0 flost-right">
                          <span>
                              Forgot password?
                          </span>
                          </Button>
                        </Col>
                      </Row>
                      <Row className="p-3">
                        <Col xs="12" className="text-right px-0">  
                          <input className="form-check-input" name="rememberMe" type="checkbox" defaultChecked={false} />
                          <span className="text-muted">
                              Remember Me
                          </span>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
    );
  }
}

export default Login;
