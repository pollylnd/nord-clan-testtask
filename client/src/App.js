import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import authActions from "store/auth/actions";

import TopBar from "components/blocks/TopBar";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./App.css";
import LoggedApp from "components/routing/Logged";
import NotLoggedApp from "components/routing/NotLogged";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("feathers-jwt");

    if (accessToken) {
      dispatch(authActions.signInJWT(accessToken));
    }
  }, [dispatch]);

  const currentUser = useSelector((state) => _.get(state.auth, "user"));

  return (
    <>
      <TopBar />
      <Container className="container" maxWidth="lg">
        <Card className="container-card">
          <CardContent>
            {!_.isNil(currentUser) ? <LoggedApp /> : <NotLoggedApp />}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default App;
