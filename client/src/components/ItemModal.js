import React, { useContext, useState } from 'react';
import { ShoppingContext } from '../context/ShoppingContext';

import useError from '../hooks/useError';
import useAuth from '../hooks/useAuth';

import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const ItemModal = () => {
  const { dispatch } = useContext(ShoppingContext);
  const [state, setState] = useState({ modal: false, name: '' });

  const { tokenConfig } = useAuth();
  const { returnErrors } = useError();

  const toggle = () => {
    setState({ ...state, modal: !state.modal })
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const addItem = (e) => {
    e.preventDefault();
    axios.post('/api/items', { name: state.name }, tokenConfig())
    .then(res => dispatch({ type: 'UPDATE_LIST', item: res.data }))
    .catch(err => returnErrors(err.response.data, err.response.status));
    setState({ modal: !state.modal });
  }

  return (
    <div>
      <Button color="dark" 
              style={{marginBottom: '2rem'}} 
              onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={state.modal}
             toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to your list</ModalHeader>
        <ModalBody>
          <Form onSubmit={addItem}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input type="text" name="name" id="item" placeholder="Enter the item..." onChange={onChange} />
              <Button color="dark" style={{marginTop: '2rem'}} block>Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemModal;
