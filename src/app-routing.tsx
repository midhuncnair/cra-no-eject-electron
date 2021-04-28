import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from "./containers/dashboard/dashboard";

import Default from "./containers/default/default";

export default function AppRouting() {
    return (
        <Switch>
            <Route exact path='/'>
                <Default/>
            </Route>
            <Route exact path='/dashboard'>
                <Dashboard/>
            </Route>
        </Switch>
    );
}