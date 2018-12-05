import React from 'react';
import ReactDOM from 'react-dom';
import SalesOrder from './SalesOrder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SalesOrder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
