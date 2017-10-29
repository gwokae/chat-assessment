import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { ACTIONS } from '../constants';

const defaultState = {
  server: 'ws://127.0.0.1:6613',
  nickname: '',
};

const FieldGroup = (props) => {
  const {
    id, label, help, validationState, ...rest
  } = props;

  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...rest} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
  validationState: PropTypes.string,
};

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
    };

    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const { server, nickname } = this.state;
    const { error = {} } = this.props;
    return (
      <Modal show={this.props.showModal} onHide={ this.close }>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FieldGroup
              type='text'
              label='Server address'
              name='server'
              value={server}
              onChange={this.handleChange}
              validationState={ error.server ?  'error' : null }
              help={ error.server || '' }
              placeholder='ws://127.0.0.1:6613'
            />
            <FieldGroup
              type='text'
              label='Nickname'
              name='nickname'
              value={nickname}
              onChange={this.handleChange}
              validationState={ error.nickname ?  'error' : null }
              help={ error.nickname || '' }
              placeholder='John Doe'
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.close }>Close</Button>
          <Button onClick={ this.submit } bsStyle='primary'
            disabled={ server.length === 0 || nickname.length === 0 }
          >
            Connect
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  close() {
    this.props.actions.toggleLogin();
  }

  submit() {
    this.props.actions.loginSubmit({ ...this.state });
  }

  resetForm() {
    this.setState(defaultState);
  }

  handleChange({ target: { value, name } }) {
    const { error = {}, actions: { updateErrorMessage } } = this.props;
    let obj = {};
    obj[name] = value;
    if (error[name]) { // clean up error
      let errorMessage = {};
      errorMessage[name] = '';
      updateErrorMessage(errorMessage);
    }
    this.setState(obj);
  }
}

LoginModal.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object,
  showModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ showModal: state.openLoginModal, error: state.error });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleLogin: () => ({ type: ACTIONS.TOGGLE_LOGIN_MODAL }),
    loginSubmit: ({ nickname, server }) => ({ type: ACTIONS.LOGIN_SUBMIT, nickname, server }),
    updateErrorMessage: error => ({ type: ACTIONS.ON_ERROR, error }),
  }, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginModal);
