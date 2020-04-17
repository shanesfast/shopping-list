import React, { useEffect } from 'react';
import { ShoppingProvider } from './context/ShoppingContext';
import useAuth from './hooks/useAuth';

import AppNavBar from './components/AppNavBar';
import ItemModal from './components/ItemModal';
import ShoppingList from './components/ShoppingList';

import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <AppNavBar />
      <ShoppingProvider>
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </ShoppingProvider>
    </div>
  );
}

export default App;
