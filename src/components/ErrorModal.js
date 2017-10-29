import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { ACTIONS } from '../constants';

class ErrorModal extends React.Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }
  render() {
    const { error = {}, monitor } = this.props;

    let errors = monitor.reduce((result, name) => {
      if (error[name]) {
        return [
          ...result,
          {
            name,
            text: error[name],
          },
        ];
      }
      return result;
    }, []);
    return (
      <Modal show={errors.length > 0} onHide={ this.close }>
        <Modal.Header closeButton>
          <Modal.Title>{`Error: ${errors.map(item => item.name).join(', ')}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reason(s):</h4>
          <ul>
            {errors.map((item, i) => (<li key={i}>{item.text}</li>))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.close }>Okay</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  close() {
    const { error = {}, monitor, actions } = this.props;
    const hits = monitor.filter(name => !!error[name]);

    if (hits.length > 0) {
      let obj = {};
      hits.forEach((name) => {
        obj[name] = '';
      });
      actions.updateErrorMessage(obj);
    }
  }
}

ErrorModal.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object,
  monitor: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({ showModal: state.openErrorModal, error: state.error });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateErrorMessage: error => ({ type: ACTIONS.ON_ERROR, error }),
  }, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorModal);
