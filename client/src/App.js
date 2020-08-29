import React from 'react';
import NotLogged from 'components/routing/NotLogged';
import AppLayout from 'components/blocks/AppLayout';
import Container from '@material-ui/core/Container';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { BrowserRouter } from 'react-router-dom'

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
        <Container className="container" maxWidth="md">
          <NotLogged />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
