import React from 'react'

import {
  Switch,
  Route,
} from 'react-router-dom'

import Dashboard from 'components/pages/Dashboard'
import Login from 'components/pages/Login'
import RecipeShow from 'components/pages/Recipe/Show'
import RecipeEdit from 'components/pages/Recipe/Edit'
import RecipeCreate from 'components/pages/Recipe/Create'
import SignUp from 'components/pages/SignUp'

export default function LoggedApp() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sign-in" component={Login} />
      <Route path="/recipe" component={RecipeShow} />
      <Route path="/recipe-edit" component={RecipeEdit} />
      <Route path="/recipe-create" component={RecipeCreate} />
      <Route path="/sign-up" component={SignUp} />
    </Switch>
  )
}