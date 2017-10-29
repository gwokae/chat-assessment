import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { ACTIONS } from '../constants';

class ConnectStatus extends React.Component {
  render() {
    const {
      connect: isConnected,
      server, nickname, actions,
    } = this.props;

    if (isConnected) {
      let logout = () => {
        actions.connectionStatusChange(false);
      };
      return [
        <Navbar.Text key='info'>
          <span style={{ color: 'green' }}>●</span>
          {` Connected to ${server} (${nickname})`}
        </Navbar.Text>,
        <NavItem key='logout' onClick={logout}>Exit chat room</NavItem>,
      ];
    }
    return [
      <Navbar.Text key='info'>
        <span style={{ color: 'red' }}>●</span>
        { ' Not connected' }
      </Navbar.Text>,
      <NavItem key='login' onClick={this.props.actions.toggleLogin}>Login</NavItem>,
    ];
  }
}

ConnectStatus.propTypes = {
  actions: PropTypes.object.isRequired,
  connect: PropTypes.bool,
  server: PropTypes.string,
  nickname: PropTypes.string,
};

const mapStateToProps = state => ({
  connect: state.connect, server: state.server, nickname: state.nickname,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleLogin: () => ({ type: ACTIONS.TOGGLE_LOGIN_MODAL }),
    connectionStatusChange: isConnected => ({
      type: ACTIONS.CONNECTION_STATUS_CHANGE,
      isConnected,
    }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectStatus);
