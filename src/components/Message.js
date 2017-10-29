import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

class Message extends React.Component {
  render() {
    const {
      type, nickname, text, timestamp,
    } = this.props.data;

    let displayName = nickname;
    if (type === 'system') displayName = 'System';
    if (type === 'me') displayName = 'You';
    return (
      <li className={type} title={`${displayName} post this message @ ${new Date(timestamp).toString()}`}>
        <Image src={`http://lorempixel.com/64/64?${displayName || Date.now()}`} circle />
        <span>{displayName}</span>
        <p>{text}</p>
      </li>
    );
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Message;
