import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import "./PizzaCard.css";

export default function PizzaCard({ pizzaItem }) {
  const dispatch = useDispatch();

  const storeQty = useSelector((state) => {
    const targetElement = state.orderInfo.pizzaList.filter(
      (pizzaElement) => pizzaElement.id === pizzaItem.id
    );
    return targetElement[0].quantity;
  });

  const addPizzaClk = (event) => {
    console.log("Add Pizza Clicked");
    dispatch({ type: "ADD_PIZZA", payload: pizzaItem.id });
  };

  const removePizzaClk = (event) => {
    console.log("Remove Pizza Clicked");
    dispatch({ type: "REMOVE_PIZZA", payload: pizzaItem.id });
  };

  return (
    <Grid item>
      <div className="pizza-card-div">
        <img
          src={pizzaItem.image_path}
          alt="A fresh Pizza"
        />
        <div className="pizza-text">
          <h2>{pizzaItem.name}</h2>
          <p>{pizzaItem.description}</p>
          <span>${pizzaItem.price}</span>
        </div>
        <div className="pizza-selector">
          {storeQty > 0 ? (
            <h1 onClick={removePizzaClk}>REMOVE</h1>
          ) : (
            <h1 onClick={addPizzaClk}>ADD</h1>
          )}
          <span>
            QTY (for testing):
            {storeQty}
          </span>
        </div>
      </div>
    </Grid>
  );
}
