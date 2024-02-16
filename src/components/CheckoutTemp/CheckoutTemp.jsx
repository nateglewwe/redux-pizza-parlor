// This component is temporary for the purposes of testing other components

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function CheckoutTemp() {
  const customerInfo = useSelector((state) => state.customerInfo);
  const pizzaOrderInfo = useSelector((state) => state.orderInfo);
  const dispatch = useDispatch();

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
      })
      .catch((err) => {
        console.error("ERROR in client POST:", err);
      });
  };

  return (
    <div>
      <h1>Temporary Placeholder Component for Testing</h1>
      <button
        type="button"
        onClick={submitBtnClk}>
        TEST SUBMIT
      </button>
    </div>
  );
}
