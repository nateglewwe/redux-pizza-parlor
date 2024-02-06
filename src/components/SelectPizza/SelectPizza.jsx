import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SelectPizza() {
  const history = useHistory();
  const [pizzaList, setPizzaList] = useState([]);
  // fetch list of pizzas
  const fetchPizzaList = () => {
    console.log("Fetching Pizza List");

    axios
      .get("/api/pizza")
      .then((response) => {
        console.log("Fetched pizzaList:", response.data);
        setPizzaList(response.data);
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
      <h1>I am the select pizza component</h1>
      <img src="images/pizza_photo.png" />
      <p>Pizza is great.</p>
      {pizzaList.map((pizza) => {
        return <h6 key={pizza.id}>{pizza.name}</h6>;
      })}

      <button
        type="button"
        onClick={nextPageBtnClk}>
        Placeholder: Next Page Button
      </button>
    </div>
  );
}
