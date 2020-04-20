import React, { useContext, useEffect, useState } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap';

const LoginModal = () => {
  const [registerState, setRegisterState] = useState({ 
    modal: false, 
    email: '',
    password: '',
    msg: null
  });

  const { isAuthenticated, login } = useAuth();
  const { clearErrors } = useError();
  const { errorState } = useContext(ErrorContext);

  const toggle = () => {
    clearErrors();
    setRegisterState(r => { return { ...r, modal: !registerState.modal } });
  }

  const onChange = (e) => {
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = registerState;
    const user = { email, password }

    login(user);
  }

  const handleRegisterError = (msg) => {
    setRegisterState(r => { return {...r, msg} });
  }

  useEffect(() => {
    // Check for register errorState
    if (errorState.id === 'LOGIN_FAIL') handleRegisterError(errorState.msg.msg);
    else handleRegisterError(null);

    // Close modal if registration is succesful
    if (registerState.modal && isAuthenticated) setRegisterState(r => { return {...r, modal: false} });
  }, [errorState.id, errorState.msg.msg, isAuthenticated, registerState.modal]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={registerState.modal}
             toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          { registerState.msg ? (<Alert color="danger">{registerState.msg}</Alert>) : null }
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input className="mb-3" type="email" name="email" id="email" placeholder="Email" onChange={onChange} />

              <Label for="password">Password</Label>
              <Input className="mb-3" type="password" name="password" id="password" placeholder="Password" onChange={onChange} />

              <Button color="dark" style={{marginTop: '2rem'}} block>Login</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;
