import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Welcome = () => (
  <Jumbotron>
    <div className='container'>
      <h1>Just a simple chat room</h1>
      <p>Please connect to a server by click following botton</p>
      <p><Button bsStyle="primary">Connect to server</Button></p>
      <h2>Author</h2>
      <p><a href='https://www.linkedin.com/in/gwokae/'>Leonard Lin</a></p>
    </div>
  </Jumbotron>
);

export default Welcome;
