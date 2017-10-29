import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Communication extends React.Component {
  render() {
    return (this.props.children);
  }
}

Communication.propTypes = {
  children: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ connect: state.connect });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Communication);
