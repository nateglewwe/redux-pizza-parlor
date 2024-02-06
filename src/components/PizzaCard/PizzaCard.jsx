import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import "./PizzaCard.css";

export default function PizzaCard({ pizzaItem }) {
  const dispatch = useDispatch();

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
      </div>
    </Grid>
  );
}
