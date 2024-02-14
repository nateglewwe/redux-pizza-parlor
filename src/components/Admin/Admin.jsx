import axios from "axios";
import { useEffect, useState } from "react";
import "./Admin.css";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";

export default function Admin() {
  const [orderList, setOrderList] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState([]);
  const [lineItems, setLineItems] = useState([]);

  const fetchOrders = () => {
    axios
      .get("/api/order")
      .then((response) => {
        console.log("Received orders", response.data);
        setOrderList(response.data);
      })
      .catch((err) => {
        console.error("ERROR in client Orders GET route", err);
      });

    axios
      .get("/api/pizza")
      .then((response) => {
        console.log("Received pizzas", response.data);
        setPizzaDetails(response.data);
      })
      .catch((err) => {
        console.error("ERROR in client Orders GET route", err);
      });

    axios
      .get("/api/order/lineitems")
      .then((response) => {
        console.log("Received lineitems", response.data);
        setLineItems(response.data);
      })
      .catch((err) => {
        console.error("ERROR in client Orders GET route", err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
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
              <>
                <tr>
                  <td className="order-name">
                    {order.customer_name} <AddIcon />
                  </td>
                  <td>{moment(order.time).format("MM/DD/YYYY [at] h:mmA")}</td>
                  <td>{order.type}</td>
                  <td>${order.total}</td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="details-data">
                    <table className="order-detail-table hidden">
                      <thead>
                        <tr>
                          <th>Pizza</th>
                          <th>QTY</th>
                          <th>Unit Price</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pizza Sample</td>
                          <td>Sample QTY</td>
                          <td>Sample Price</td>
                          <td>Sample Total</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
