import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { BrowserRouter } from "react-router-dom";

import NotLogged from "components/routing/NotLogged";
import TopBar from "components/blocks/TopBar";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopBar />
        <Container className="container" maxWidth="lg">
          <Card className="container-card">
            <CardContent>
              <NotLogged />
            </CardContent>
          </Card>
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
