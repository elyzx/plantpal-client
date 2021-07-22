import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import * as PATHS from "./utils/paths";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={PATHS.HOMEPAGE} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
