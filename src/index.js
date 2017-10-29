import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './style.scss';
import reducer from './reducer';
import Communication from './components/Communication';
import TopNavibar from './components/TopNavibar';
import Welcome from './components/Welcome';
import Chatroom from './components/Chatroom';

const store = createStore(reducer);
const Layout = () => (
  <div>
    <Communication>
      <TopNavibar />
      <Welcome />
    </Communication>
  </div>
);
ReactDOM.render(
  (
    <Provider store={store}>
      <Layout />
    </Provider>
  ), document.getElementById('app'),
);
