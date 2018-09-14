import 'raf/polyfill';
import React from 'react';
import Rooms from './Rooms';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import List from '@material-ui/core/List';

Enzyme.configure({
  adapter: new Adapter(),
});

const props = {
  currentUser: {
    rooms: [{
      id: '1',
      name: 'Room 1',
    }],
  },
  joinablerooms: [{
    id: '21',
    name: 'Room 2',
  }, {
    id: '22',
    name: 'Room 3',
  }],
  history: {
    replace: () => arguments,
  },
};

const store = {
  getState: () => "",
  subscribe: (a) => a,
  dispatch: (a) => a,
}
describe("Rooms Component <Rooms />", function() {
  it('should render', function(){
    const roomsComponent = shallow(<Rooms {...props} store={store} />);
    expect(roomsComponent).to.have.lengthOf(1);
  })
  it('should render two <List /> components', function(){
    const roomsComponent = mount(<Rooms {...props} store={store} />);
    expect(roomsComponent.find(List)).to.have.lengthOf(2);
  })
})
