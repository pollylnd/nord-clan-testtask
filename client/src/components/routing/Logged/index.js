import React from "react";
import { Switch, Route } from "react-router-dom";

import DashBoard from "components/pages/Dashboard";
import Recipe from "components/pages/Recipe";

export default function LoggedApp() {
  return (
    <Switch>
      <Route exact path="/" component={DashBoard} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/sign-in" component={DashBoard} />
      <Route path="/recipe" component={Recipe} />
    </Switch>
  );
}
