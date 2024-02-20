import './Checkout.css';

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import BackButton from '../BackButton/BackButton';

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

    const backBtnClk = () => {
        history.push('/customer');
      };

    return (
    <div className="checkout-view">
        <h1>Step Three: Checkout</h1>
        <p className="order-type">{customerInfo.orderType}</p>
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
            {pizzaOrderInfo.pizzaList.map((pizza, index) => {return (pizza.quantity > 0 ? 
                <tr key={index} className="table-row">
                    <td>{pizza.name}</td>
                    <td>{pizza.quantity}</td>
                    <td>${pizza.price*pizza.quantity}</td>
                </tr>
                :
                <tr key={index}></tr>
            )})}
        </tbody>
        </table>
        <p className="total-cost">Total: ${pizzaOrderInfo.totalPrice}</p>
        <br/><br/><br/><br/><br/>
        <div>
            <BackButton backFunction={backBtnClk}/>
            <button className="checkout-button" type="button" onClick={submitBtnClk}>CHECKOUT</button>
        </div>
    </div>
    )
}

export default Checkout;