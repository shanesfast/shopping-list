import React, { useContext, useState } from 'react';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';

import { AuthContext } from '../context/AuthContext';

import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';

const AppNavBar = () => {
  const [state, setState] = useState({ isOpen: false });
  const { state: authState } = useContext(AuthContext);
  const { isAuthenticated, user } = authState;

  const toggle = () => {
    setState({ isOpen: !state.isOpen });
  }
  
  const authLinks = (
    <>
      <NavItem><span className="navbar-text mr-3"><strong>{ user ? `Welcome, ${user.name}.` : '' }</strong></span></NavItem>
      <NavItem><Logout /></NavItem>
    </>
  );
  
  const guestLinks = (
    <>
      <NavItem><RegisterModal /></NavItem>
      <NavItem><LoginModal /></NavItem>
    </>
  );

  return (
    <section>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { isAuthenticated ? authLinks : guestLinks }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default AppNavBar;
