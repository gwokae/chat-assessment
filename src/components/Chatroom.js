import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Message from './Message';
import { ACTIONS } from '../constants';

class Chatroom extends React.Component {
  render() {
    let messages = [
      { type: 'user', timestamp: 1509288723034, nickname: 'John Doe', text: '1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada eget eros quis faucibus. Quisque at maximus dolor. Mauris sagittis magna a nulla congue placerat. Vivamus sit amet ligula mi. Donec finibus magna ut enim convallis porttitor. Nullam purus ligula, tristique nec sapien a, gravida consectetur nulla. Vestibulum tempus venenatis quam non efficitur. Integer dignissim, risus sed vehicula vulputate, nunc risus scelerisque tellus, vel interdum nunc justo at velit. Etiam molestie, tortor sed hendrerit vestibulum, tortor quam tristique eros, in vulputate erat nisi sit amet ipsum. Nunc viverra pharetra accumsan.' },
      { type: 'user', timestamp: 1509288723034, nickname: 'John Doe', text: '2L\'</p><script>alert(1)</script>orem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada eget eros quis faucibus. Quisque at maximus dolor. Mauris sagittis magna a nulla congue placerat. Vivamus sit amet ligula mi. Donec finibus magna ut enim convallis porttitor. Nullam purus ligula, tristique nec sapien a, gravida consectetur nulla. Vestibulum tempus venenatis quam non efficitur. Integer dignissim, risus sed vehicula vulputate, nunc risus scelerisque tellus, vel interdum nunc justo at velit. Etiam molestie, tortor sed hendrerit vestibulum, tortor quam tristique eros, in vulputate erat nisi sit amet ipsum. Nunc viverra pharetra accumsan.' },
      { type: 'user', timestamp: 1509288723034, nickname: 'John Doe', text: '3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada eget eros quis faucibus. Quisque at maximus dolor. Mauris sagittis magna a nulla congue placerat. Vivamus sit amet ligula mi. Donec finibus magna ut enim convallis porttitor. Nullam purus ligula, tristique nec sapien a, gravida consectetur nulla. Vestibulum tempus venenatis quam non efficitur. Integer dignissim, risus sed vehicula vulputate, nunc risus scelerisque tellus, vel interdum nunc justo at velit. Etiam molestie, tortor sed hendrerit vestibulum, tortor quam tristique eros, in vulputate erat nisi sit amet ipsum. Nunc viverra pharetra accumsan.' },
      { type: 'me', timestamp: 1509288723034, nickname: 'John Doe', text: '4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam malesuada eget eros quis faucibus. Quisque at maximus dolor. Mauris sagittis magna a nulla congue placerat. Vivamus sit amet ligula mi. Donec finibus magna ut enim convallis porttitor. Nullam purus ligula, tristique nec sapien a, gravida consectetur nulla. Vestibulum tempus venenatis quam non efficitur. Integer dignissim, risus sed vehicula vulputate, nunc risus scelerisque tellus, vel interdum nunc justo at velit. Etiam molestie, tortor sed hendrerit vestibulum, tortor quam tristique eros, in vulputate erat nisi sit amet ipsum. Nunc viverra pharetra accumsan.' },
      { type: 'system', timestamp: 1509288723034, text: 'Etiam euismod tortor sit amet arcu auctor, dictum malesuada dui tincidunt. In lacinia velit eget condimentum ullamcorper. Maecenas sed efficitur ipsum, nec efficitur mauris. Praesent cursus felis nec mauris aliquet porta. Duis mattis nulla augue, et consequat orci dignissim ut. Maecenas consequat erat nisi, et porta leo sodales nec. Donec justo eros, bibendum rutrum sollicitudin nec, dapibus ac arcu. Aliquam ornare ipsum ac tortor vulputate sodales. Quisque nulla urna, facilisis quis suscipit ultrices, viverra a mi. Ut gravida, nulla vitae dictum euismod, risus ipsum consequat libero, quis molestie lectus ligula ut sem. Mauris maximus consectetur orci sit amet tincidunt. Cras nec tincidunt enim, sit amet varius massa. In tortor urna, cursus eu sem nec, iaculis interdum risus. Aenean tempor enim ante, sit amet gravida justo gravida eget.' },
    ];
    const { message = '', actions, connect: isConnected } = this.props;
    if (!isConnected) return null;
    return (
      <div className= 'container'>
      <Row className='chatroom'>
        <Col xs={12}>
          <ul>{messages.map((m, i) => <Message key={i} data={m}/>)}</ul>
        </Col>
        <Col xs={10}>
          <Form>
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
          <Button block bsStyle='success' type='submit' disabled={message.length === 0}>
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
  nickname: PropTypes.string,
};

const mapStateToProps = state => ({
  connect: state.connect,
  nickname: state.nickname,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    editMessage: message => ({
      type: ACTIONS.EDIT_MESSAGE,
      message,
    }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
