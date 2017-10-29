import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './style.scss';
import reducer from './reducer';
import Communication from './components/Communication';
import TopNavibar from './components/TopNavibar';
import Welcome from './components/Welcome';
import LoginModal from './components/LoginModal';
import ErrorModal from './components/ErrorModal';
import Chatroom from './components/Chatroom';

const store = createStore(reducer);
const Layout = () => (
  <div>
    <Communication>
      <TopNavibar />
      <Welcome />
      <Chatroom />
      <LoginModal />
      <ErrorModal monitor={['logout']} />
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

// setInterval(() => console.log(store.dispatch({type: 'TOGGLE_LOGIN_MODAL'})), 3000);
