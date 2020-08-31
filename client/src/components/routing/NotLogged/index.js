import React from "react";

import { Switch, Route } from "react-router-dom";

import SignIn from "components/pages/SignIn";
import SignUp from "components/pages/SignUp";
import Dashboard from "components/pages/Dashboard";
import RecipeShow from "components/pages/Recipe/Show";
import RecipeEdit from "components/pages/Recipe/Edit";
import RecipeCreate from "components/pages/Recipe/Create";

export default function LoggedApp() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/recipe/:id" component={RecipeShow} />
      <Route path="/recipe/:id/edit" component={RecipeEdit} />
      <Route path="/create-recipe" component={RecipeCreate} />
    </Switch>
  );
}
