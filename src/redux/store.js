import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";

// reducers go here
const orderInfo = (state = { totalPrice: 0, pizzaList: [] }, action) => {
  // State definition - object containg two key-values
  // totalPrice : integer containing order total price
  // pizzaList : array of objects with quantity, id, name, and price of each pizza

  if (action.type === "RESET_PIZZAS") {
    const newPizzaList = [];
    const pizzas = action.payload;
    pizzas.forEach((pizza) => {
      newPizzaList.push({
        quantity: 0,
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
      });
    });
    // console.table(newPizzaList);
    return { totalPrice: 0, pizzaList: newPizzaList };
  }

  if (action.type === "ADD_PIZZA") {
    const targetPizzaArrayEle = state.pizzaList.filter(
      (arrayEle) => arrayEle.id === action.payload
    )[0];
    targetPizzaArrayEle.quantity += 1;
    // console.log("targetPizzaArrayEle", targetPizzaArrayEle);

    const newPizzaList = [];
    state.pizzaList.forEach((pizzaEle) => {
      if (pizzaEle.id === action.payload) {
        newPizzaList.push(targetPizzaArrayEle);
      } else {
        newPizzaList.push(pizzaEle);
      }
    });

    const newTotalPrice = state.totalPrice + +targetPizzaArrayEle.price;

    return { totalPrice: newTotalPrice, pizzaList: newPizzaList };
  }

  if (action.type === "REMOVE_PIZZA") {
    const targetPizzaArrayEle = state.pizzaList.filter(
      (arrayEle) => arrayEle.id === action.payload
    )[0];
    targetPizzaArrayEle.quantity -= 1;
    // console.log("targetPizzaArrayEle", targetPizzaArrayEle);

    const newPizzaList = [];
    state.pizzaList.forEach((pizzaEle) => {
      if (pizzaEle.id === action.payload) {
        newPizzaList.push(targetPizzaArrayEle);
      } else {
        newPizzaList.push(pizzaEle);
      }
    });

    const newTotalPrice = state.totalPrice - +targetPizzaArrayEle.price;

    return { totalPrice: newTotalPrice, pizzaList: newPizzaList };
  }

  return state;
};

const customerInfo = (state = [], action) => {
  if (action.type === "SUBMIT_DATA") {
    //update state
    return action.payload.customerData;
  }
  return state;
};

const store = createStore(
  combineReducers({
    orderInfo,
    customerInfo,
  }),
  applyMiddleware(logger)
);

export default store;
