import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Product />, div);
  ReactDOM.unmountComponentAtNode(div);
});