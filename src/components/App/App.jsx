import React from "react";
import axios from "axios";
import styles from "./App.module.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Customer from "../Customer/Customer.jsx";
import SelectPizza from "../SelectPizza/SelectPizza.jsx";
import Header from '../Header/Header.jsx';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <Header />
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
