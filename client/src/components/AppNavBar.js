import React, { useState } from 'react';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';

import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';

const AppNavBar = () => {
  const [state, setState] = useState({
    isOpen: false,
  });

  const toggle = () => {
    setState({ isOpen: !state.isOpen });
  }
  
  return (
    <section>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <RegisterModal />
              </NavItem>

              <NavItem>
                <Logout />
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default AppNavBar;
