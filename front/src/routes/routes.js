import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../containers/Home';
import Product from '../containers/Product';

export default (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/items/:ID" component={Product}/>
        <Redirect from="/items" to="/" />
    </Switch>
);
