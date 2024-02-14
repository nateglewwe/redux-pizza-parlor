import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Customer from '../Customer/Customer.jsx';
import SelectPizza from '../SelectPizza/SelectPizza.jsx';
import Header from '../Header/Header.jsx';
import Order from '../Order/Order.jsx';

function App() {
  return (
    <>
      <Header />
      <Router>
        {/*All team routes go below this line*/}
        <Route path="/" exact>
          <SelectPizza />
        </Route>
        <Route path="/customer">
          <Customer />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
      </Router>
    </>
  );
}

export default App;
