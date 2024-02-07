import React from "react";
import axios from "axios";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Customer from "../Customer/Customer.jsx";
import SelectPizza from "../SelectPizza/SelectPizza.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Prime Pizza</h1>
      </header>
      <Router>
        {/*All team routes go below this line*/}
        <Route
          path="/"
          exact>
          <SelectPizza />
        </Route>
        <Route path="/customer">
          <Customer />
        </Route>
      </Router>
    </div>
  );
}

export default App;
