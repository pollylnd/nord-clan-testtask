import React from "react";
import { Switch, Route } from "react-router-dom";

import DashBoard from "components/pages/Dashboard";
import RecipeShow from "components/pages/Recipe/Show";
import RecipeEdit from "components/pages/Recipe/Edit";
import RecipeCreate from "components/pages/Recipe/Create";
import MyRecipes from "components/pages/MyRecipes"

export default function LoggedApp() {
  return (
    <Switch>
      <Route exact path="/" component={DashBoard} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/recipe/create" component={RecipeCreate} />
      <Route path="/recipe/user" component={MyRecipes} />
      <Route exact path="/recipe/:id" component={RecipeShow} />
      <Route path="/recipe/:id/edit" component={RecipeEdit} />
    </Switch>
  );
}
