import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default () => (
  <Navbar inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Yet another Chat</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="https://www.linkedin.com/in/gwokae/">My LinkedIn</NavItem>
      <NavDropdown eventKey={2} title="Source Code" id="basic-nav-dropdown">
        <NavItem eventKey={2.1} href="https://github.com/gwokae/chat-assessment">Client</NavItem>
        <NavItem eventKey={2.2} href="https://github.com/gwokae/chat-server-assessment">Server</NavItem>
        <MenuItem divider />
        <MenuItem eventKey={2.3} href="https://github.com/gwokae">My github</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem>Connect to server</NavItem>
    </Nav>
  </Navbar>
);
