import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './Sagas';
import SlackCloneApp from './SlackCloneApp';
import { Provider } from 'react-redux';
import 'typeface-roboto';

const routes = makeMainRoutes();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(SlackCloneApp, {
  profile:{},
  currentScreen: 'WhatIsYourUsernameScreen',
  currentUser: false,
  userRooms: {
    currentrooms: [],
    joinablerooms:[]
  },
  chatManager: false,
  chatRoom: {},
}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
  {routes}
  </Provider>,
  document.getElementById('root')
);
