import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({
  adapter: new Adapter()
});

it('App renders', () => {
  const app = shallow(<App />);
  expect(app.length).to.equal(1);
});
