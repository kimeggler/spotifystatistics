import React from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import Logincallback from "./auth/logincallback";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/callback" component={Logincallback} />
      </Switch>
      <AppRouter />
    </div>
  );
}

export default App;
