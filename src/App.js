import React from "react";
import { Route, Switch } from "wouter";
import Banner from "./Banner";
import Events from "./Events";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Banner} />
        <Route path="/events" component={Events} />
      </Switch>
    </div>
  );
}

export default App;
