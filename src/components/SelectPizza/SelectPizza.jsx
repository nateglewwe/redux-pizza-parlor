import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Grid from "@mui/material/Grid";
import PizzaCard from "../PizzaCard/PizzaCard";
import "./SelectPizza.css";

export default function SelectPizza() {
  const history = useHistory();
  const [pizzaList, setPizzaList] = useState([]);
  const dispatch = useDispatch();

  // fetch list of pizzas
  const fetchPizzaList = () => {
    console.log("Fetching Pizza List");

    axios
      .get("/api/pizza")
      .then((response) => {
        console.log("Fetched pizzaList:", response.data);
        setPizzaList(response.data);
        //reset store
        dispatch({ type: "RESET_PIZZAS", payload: response.data });
      })
      .catch((err) => {
        console.error("ERROR in /api/pizza GET route:", err);
      });
  };

  const nextPageBtnClk = (event) => {
    history.push("/customer");
  };

  useEffect(() => {
    fetchPizzaList();
  }, []);
  return (
    <div className="select-pizza-div">
      <h2>Step 1: Select Your Pizza</h2>
      <span id="price-test">
        Total (for testing):$
        {useSelector((state) => state.orderInfo.totalPrice).toFixed(2)}{" "}
      </span>

      <Grid
        container
        spacing={2}>
        {pizzaList.map((pizza) => {
          return (
            <PizzaCard
              key={pizza.id}
              pizzaItem={pizza}
            />
          );
        })}
      </Grid>

      <button
        type="button"
        onClick={nextPageBtnClk}>
        Placeholder: Next Page Button
      </button>
    </div>
  );
}
