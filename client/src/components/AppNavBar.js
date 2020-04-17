import React, { useState } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';

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
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default AppNavBar;
