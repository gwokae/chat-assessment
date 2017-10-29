import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Message from './Message';
import { ACTIONS } from '../constants';

class Chatroom extends React.Component {
  render() {
    const { message = '', actions, connect: isConnected, messages } = this.props;
    if (!isConnected) return null;
    return (
      <div className= 'container'>
      <Row className='chatroom'>
        <Col xs={12}>
          <ul>{messages.map((m, i) => <Message key={i} data={m}/>)}</ul>
        </Col>
        <Col xs={10}>
          <Form onSubmit={e => actions.submitMessage() && e.preventDefault()}>
            <FormGroup controlId='formInlineName'>
              <FormControl type='text'
                value={message}
                onChange={e => actions.editMessage(e.target.value)}
                placeholder='Type your message here...'
              />
            </FormGroup>
          </Form>
        </Col>
        <Col xs={2}>
          <Button block bsStyle='success' type='submit' onClick={actions.submitMessage}
            disabled={message.length === 0}>
            Send
          </Button>
        </Col>
      </Row>
      </div>
    );
  }
}

Chatroom.propTypes = {
  actions: PropTypes.object.isRequired,
  connect: PropTypes.bool,
  message: PropTypes.string,
  messages: PropTypes.array.isRequired,
  nickname: PropTypes.string,
};

const mapStateToProps = state => ({
  connect: state.connect,
  nickname: state.nickname,
  message: state.message,
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    editMessage: message => ({
      type: ACTIONS.EDIT_MESSAGE,
      message,
    }),
    submitMessage: () => ({ type: ACTIONS.MESSAGE_SUBMIT }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
