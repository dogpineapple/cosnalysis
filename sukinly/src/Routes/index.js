import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "../About";
import Homepage from "../Homepage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route exact path ="/">
        <Homepage/>
      </Route>
    </Switch>
  );
}

export default Routes;