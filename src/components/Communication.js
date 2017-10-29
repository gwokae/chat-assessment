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
    if (!this.props.connect && nextProps.server && nextProps.server !== this.props.server) {
      // connect
      const socket = new WebSocket(nextProps.server);
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ type: 'login', nickname: nextProps.nickname }));
        this.props.actions.connectionStatusChange(true);
      });
      socket.addEventListener('close', () => this.props.actions.connectionStatusChange(false));
      socket.addEventListener('message', (event) => {
          console.log('Message from server ', event, event.data);
      });
    }
  }
}

Communication.propTypes = {
  children: PropTypes.any.isRequired,
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
    connectionStatusChange: isConnected => ({ type: ACTIONS.CONNECTION_STATUS_CHANGE, isConnected }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communication);
