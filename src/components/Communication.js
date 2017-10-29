import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ACTIONS } from '../constants';

class Communication extends React.Component {
  render() {
    return (this.props.children);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.connect && nextProps.server && !this.socket) {
      // login
      const { updateErrorMessage } = this.props.actions;
      try {
        const socket = new WebSocket(nextProps.server);
        socket.addEventListener('open', () => {
          socket.send(JSON.stringify({ type: 'login', nickname: nextProps.nickname }));
        });
        socket.addEventListener('close', () => {
          this.props.actions.connectionStatusChange(false);
          if (this.socket) {
            this.socket.close();
            this.socket = null;
          }
        });
        socket.addEventListener('error', (event) => {
          updateErrorMessage({ server: `Unable to connect url: ${event.target.url}.` });
        });
        socket.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);
          this.handleMessage(event, data);
        });
        this.socket = socket;
      } catch (e) {
        updateErrorMessage({ server: e.message || JSON.stringfy(e) });
      }
    }

    if (this.props.connect && !nextProps.connect) {
      // logout
      if (this.socket) {
        this.socket.send(JSON.stringify({ type: 'logout' }));
      }
    }

    if (!this.props.messageSubmit && nextProps.messageSubmit && nextProps.message
      && nextProps.connect) {
      // send msg
      this.socket.send(JSON.stringify({ type: 'message', text: nextProps.message }));
    }
  }

  handleMessage(event, data) {
    const { type, accepted } = data;
    const {
      connectionStatusChange, updateErrorMessage, editMessage, receiveMessage,
    } = this.props.actions;

    switch (type) {
      case 'login':
        if (data.error) {
          updateErrorMessage({ nickname: data.error });
          if (this.socket) {
            this.socket.close();
            this.socket = null;
          }
        } else {
          connectionStatusChange(true);
        }
        break;
      case 'logout':
        this.props.actions.connectionStatusChange(false);
        if (this.socket) {
          this.socket.close();
          this.socket = null;
        }
        if (data.reason) {
          updateErrorMessage({ logout: data.reason });
        }
        break;
      case 'message':
        if (accepted) {
          editMessage('');
        } else if (data.data) {
          receiveMessage(data.data);
        }
        break;
      default:
        console.warn(`Received unsupported message type ${type}`);
    }
  }
}

Communication.propTypes = {
  children: PropTypes.any.isRequired,
  actions: PropTypes.object.isRequired,
  connect: PropTypes.bool,
  server: PropTypes.string,
  nickname: PropTypes.string,
  message: PropTypes.string,
  messageSubmit: PropTypes.bool,
};

const mapStateToProps = state => ({
  connect: state.connect,
  server: state.server,
  nickname: state.nickname,
  message: state.message,
  messageSubmit: state.messageSubmit,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    connectionStatusChange: isConnected => ({
      type: ACTIONS.CONNECTION_STATUS_CHANGE,
      isConnected,
    }),
    updateErrorMessage: error => ({ type: ACTIONS.ON_ERROR, error }),
    editMessage: message => ({
      type: ACTIONS.EDIT_MESSAGE,
      message,
    }),
    receiveMessage: data => ({
      type: ACTIONS.RECEIVE_MESSAGE,
      data,
    }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communication);
