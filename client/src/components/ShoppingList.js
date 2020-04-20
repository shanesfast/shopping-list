import React, { useContext } from 'react';
import { ShoppingContext } from '../context/ShoppingContext';
import useAuth from '../hooks/useAuth';
import useErrors from '../hooks/useError';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

const ShoppingList = () => {
  const { state, dispatch } = useContext(ShoppingContext);
  const { items } = state;

  const { tokenConfig } = useAuth();
  const { returnErrors } = useErrors();

  const removeItem = (_id) => {
    axios.delete(`/api/items/${_id}`, tokenConfig())
         .then(res => dispatch({ type: 'REMOVE_ITEM', _id }))
         .catch(err => returnErrors(err.response.data, err.response.status));
  }

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          { items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button className="remove-btn" 
                        color="danger" 
                        size="sm"
                        onClick={() => { removeItem(_id) }}>
                  &times;
                </Button>
                { name }
              </ListGroupItem>
            </CSSTransition>
          )) }
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

export default ShoppingList;
