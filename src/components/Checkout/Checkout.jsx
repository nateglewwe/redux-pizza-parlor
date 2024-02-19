import './Checkout.css';

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Checkout () {
    const customerInfo = useSelector((state) => state.customerInfo);
    const pizzaOrderInfo = useSelector((state) => state.orderInfo);
    const dispatch = useDispatch();
    const history = useHistory();
  
    const submitBtnClk = () => {
      console.log("Submit Button Clicked");
  
      // create data package
      const pizzaData = [];
      pizzaOrderInfo.pizzaList.forEach((pizza) => {
        if (pizza.quantity > 0) {
          pizzaData.push({ id: pizza.id, quantity: pizza.quantity });
        }
      });
  
      const orderData = {
        customer_name: customerInfo.name,
        street_address: customerInfo.address,
        city: customerInfo.city,
        zip: customerInfo.zip,
        total: pizzaOrderInfo.totalPrice,
        type: customerInfo.orderType,
        pizzas: pizzaData,
      };
  
      axios
        .post("/api/order", orderData)
        .then((result) => {
          console.log("Order submitted to server - Clearing Order data");
          dispatch({ type: "CLEAR_PIZZA_ORDER" });
          // dispatch({type: /* some reducer action to clear customerInfo store*/})
          history.push('/');
        })
        .catch((err) => {
          console.error("ERROR in client POST:", err);
        });
    };

    return (
    <>
        <h1>Step Three: Checkout</h1>
        <p className="DOM-right">{customerInfo.orderType}</p>
        <span>{customerInfo.name}</span><br/>
        <span>{customerInfo.address}</span><br/>
        <span>{customerInfo.city} {customerInfo.zip}</span>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>No. of pizzas</th>
                <th>Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[0].name}</td>
                <td>{pizzaOrderInfo.pizzaList[0].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[0].price*pizzaOrderInfo.pizzaList[0].quantity}</td>
            </tr>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[1].name}</td>
                <td>{pizzaOrderInfo.pizzaList[1].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[1].price*pizzaOrderInfo.pizzaList[1].quantity}</td>
            </tr>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[2].name}</td>
                <td>{pizzaOrderInfo.pizzaList[2].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[2].price*pizzaOrderInfo.pizzaList[2].quantity}</td>
            </tr>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[3].name}</td>
                <td>{pizzaOrderInfo.pizzaList[3].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[3].price*pizzaOrderInfo.pizzaList[3].quantity}</td>
            </tr>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[4].name}</td>
                <td>{pizzaOrderInfo.pizzaList[4].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[4].price*pizzaOrderInfo.pizzaList[4].quantity}</td>
            </tr>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[5].name}</td>
                <td>{pizzaOrderInfo.pizzaList[5].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[5].price*pizzaOrderInfo.pizzaList[5].quantity}</td>
            </tr>
            <tr>
                <td>{pizzaOrderInfo.pizzaList[6].name}</td>
                <td>{pizzaOrderInfo.pizzaList[6].quantity}</td>
                <td>${pizzaOrderInfo.pizzaList[6].price*pizzaOrderInfo.pizzaList[6].quantity}</td>
            </tr>
        </tbody>
        </table>
        <p className="DOM-right">${pizzaOrderInfo.totalPrice}</p>
        <br/><br/><br/>
        <button className="DOM-right" type="button" onClick={submitBtnClk}>CHECKOUT</button>
    </>
    )
}

export default Checkout;