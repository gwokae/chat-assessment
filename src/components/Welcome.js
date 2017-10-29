import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ACTIONS } from '../constants';

class Welcome extends React.Component {
  render() {
    const { actions } = this.props;
    return (
      <Jumbotron>
        <div className='container'>
          <h1>Just a simple chat room</h1>
          <p>Please connect to a server by click following botton</p>
          <p>
            <Button bsStyle="primary"
              onClick={ () => (actions.toggleLogin()) }
            >
              Connect to server
            </Button>
          </p>
          <h2>Author</h2>
          <p><a href='https://www.linkedin.com/in/gwokae/'>Leonard Lin</a></p>
        </div>
      </Jumbotron>
    );
  }
}

Welcome.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleLogin: () => ({ type: ACTIONS.TOGGLE_LOGIN_MODAL }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
