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
  const { id, label, help, ...rest } = props;
  return (
    <FormGroup controlId={id}>
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
              placeholder='ws://127.0.0.1:6613'
            />
            <FieldGroup
              type='text'
              label='Nickname'
              name='nickname'
              value={nickname}
              onChange={this.handleChange}
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
    let obj = {};
    obj[name] = value;
    this.setState(obj);
  }
}

LoginModal.propTypes = {
  actions: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ showModal: state.openLoginModal });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    toggleLogin: () => ({ type: ACTIONS.TOGGLE_LOGIN_MODAL }),
    loginSubmit: ({ nickname, server }) => ({ type: ACTIONS.LOGIN_SUBMIT, nickname, server }),
  }, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginModal);
