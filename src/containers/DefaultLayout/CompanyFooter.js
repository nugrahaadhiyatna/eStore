import React, { Component } from 'react';

class CompanyFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bla: 5,
    };
  }
  
  render() {
    return (
      <React.Fragment>
          <div class="company-footer">{this.props.child}</div>
      </React.Fragment>
    );
  }
}

export default CompanyFooter;
