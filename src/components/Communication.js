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
    if (!this.props.connect && nextProps.server) {
      const { updateErrorMessage } = this.props.actions;
      // connect
      try {
        const socket = new WebSocket(nextProps.server);
        socket.addEventListener('open', () => {
          socket.send(JSON.stringify({ type: 'login', nickname: nextProps.nickname }));
        });
        socket.addEventListener('close', () => this.props.actions.connectionStatusChange(false));
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
  }

  handleMessage(event, data) {
    const { type } = data;
    const { connectionStatusChange, updateErrorMessage} = this.props.actions;

    switch (type) {
      case 'login':
        if (data.error) {
          updateErrorMessage({ nickname: data.error });
        } else {
          connectionStatusChange(true);
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
};

const mapStateToProps = state => ({
  connect: state.connect,
  server: state.server,
  nickname: state.nickname,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    connectionStatusChange: isConnected => ({
      type: ACTIONS.CONNECTION_STATUS_CHANGE,
      isConnected,
    }),
    updateErrorMessage: error => ({ type: ACTIONS.ON_ERROR, error }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communication);
