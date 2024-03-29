import axios from 'axios';
import { useEffect, useState } from 'react';
import './Admin.css';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Admin() {
  const [orderList, setOrderList] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [expanders, setExpanders] = useState([]);
  const history = useHistory();

  const fetchOrders = () => {
    axios
      .get('/api/order')
      .then((response) => {
        console.log('Received orders', response.data);
        setOrderList(response.data);
        const tempArr = [...expanders];
        response.data.forEach((item) => {
          tempArr[item.id] = false;
        });
        setExpanders(tempArr);
      })
      .catch((err) => {
        console.error('ERROR in client Orders GET route', err);
      });

    axios
      .get('/api/pizza')
      .then((response) => {
        console.log('Received pizzas', response.data);
        setPizzaDetails(response.data);
      })
      .catch((err) => {
        console.error('ERROR in client Orders GET route', err);
      });

    axios
      .get('/api/order/lineitems')
      .then((response) => {
        console.log('Received lineitems', response.data);
        setLineItems(response.data);
      })
      .catch((err) => {
        console.error('ERROR in client Orders GET route', err);
      });
  };

  const toggleExpander = (event, id) => {
    event.preventDefault();
    const tempArr = [...expanders];
    tempArr[id] = !tempArr[id];
    setExpanders(tempArr);
    document.getElementById(`expander${id}`).classList.toggle('hidden');
  };

  const detailsClk = (id) => {
    history.push(`/orderDetail/${id}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {/* {JSON.stringify(expanders)} */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time Order Placed</th>
            <th>Type</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            return (
              <React.Fragment key={order.id}>
                <tr className="outer">
                  <td className="order-name">
                    <div>
                      {order.customer_name} (
                      <span onClick={() => detailsClk(order.id)}>
                        Order Detail Page
                      </span>
                      )
                    </div>
                    {!expanders[order.id] ? (
                      <AddIcon
                        className="expand-selector"
                        onClick={() => {
                          toggleExpander(event, order.id);
                        }}
                      />
                    ) : (
                      <RemoveIcon
                        className="expand-selector"
                        onClick={() => {
                          toggleExpander(event, order.id);
                        }}
                      />
                    )}
                  </td>
                  <td>{moment(order.time).format('MM/DD/YYYY [at] h:mmA')}</td>
                  <td>{order.type}</td>
                  <td>${order.total}</td>
                </tr>
                <tr
                  className=" expander hidden"
                  id={`expander${order.id}`}>
                  <td
                    colSpan={4}
                    className="details-data">
                    <table className="order-detail-table">
                      <thead>
                        <tr>
                          <th>Pizza</th>
                          <th>QTY</th>
                          <th>Unit Price</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lineItems
                          .filter((lineItem) => {
                            return lineItem.order_id === order.id;
                          })
                          .map((item) => {
                            return (
                              <tr
                                className="inner"
                                key={item.id}>
                                <td>
                                  {
                                    pizzaDetails.filter((pizza) => {
                                      return pizza.id === item.pizza_id;
                                    })[0].name
                                  }
                                </td>
                                <td>{item.quantity}</td>
                                <td>
                                  $
                                  {
                                    pizzaDetails.filter((pizza) => {
                                      return pizza.id === item.pizza_id;
                                    })[0].price
                                  }
                                </td>
                                <td>
                                  $
                                  {(
                                    +pizzaDetails.filter((pizza) => {
                                      return pizza.id === item.pizza_id;
                                    })[0].price * +item.quantity
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
