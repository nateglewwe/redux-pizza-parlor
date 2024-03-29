import './App.css';
import React from 'react';
import axios from 'axios';

import { HashRouter as Router, Route } from 'react-router-dom';
import Customer from '../Customer/Customer.jsx';
import SelectPizza from '../SelectPizza/SelectPizza.jsx';
import Header from '../Header/Header.jsx';
import CheckoutTemp from '../CheckoutTemp/CheckoutTemp.jsx';
import Admin from '../Admin/Admin.jsx';
import OrderDetail from '../OrderDetail/OrderDetail.jsx';
import Order from '../Order/Order.jsx';
import Checkout from '../Checkout/Checkout.jsx';

function App() {
  return (
    <>
      <Header />
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
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/orderDetail/:id">
          <OrderDetail />
        </Route>
      </Router>
    </>
  );
}

export default App;
