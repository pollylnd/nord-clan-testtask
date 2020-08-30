import React from "react";
import NotLogged from "components/routing/NotLogged";
import TopBar from "components/blocks/TopBar";
import Container from "@material-ui/core/Container";
import { Provider } from "react-redux";
import { store } from "store/store";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopBar />
        <Container className="container" maxWidth="md">
          <NotLogged />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
