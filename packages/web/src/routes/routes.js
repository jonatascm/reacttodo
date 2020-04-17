import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginPage from '../pages/LoginPage/LoginPage';
import TodoPage from '../pages/TodoPage/TodoPage';
import PrivateRoute from './private-route';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={()=> <LoginPage />} />
      <PrivateRoute path="/todo" component={()=> <TodoPage />} />
    </Switch>
  </BrowserRouter>
)

export default Routes;
