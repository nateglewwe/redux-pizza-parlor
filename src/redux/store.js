import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

// reducers go here
const orderInfo = (state = { totalPrice: 0, pizzaList: [] }, action) => {
  // State definition - object containg two key-values
  // totalPrice : integer containing order total price
  // pizzaList : array of objects with quantity, id, name, and price of each pizza

  // Retrieve list of pizzas from server
  if (action.type === 'RESET_PIZZAS') {
    let newPizzaList = [];
    let newTotalPrice = 0;
    const pizzas = action.payload;
    console.log('Current Pizza List Length:', state.pizzaList.length);
    if (state.pizzaList.length === 0) {
      pizzas.forEach((pizza) => {
        newPizzaList.push({
          quantity: 0,
          id: pizza.id,
          name: pizza.name,
          price: pizza.price,
        });
      });
    } else {
      newPizzaList = state.pizzaList;
      newTotalPrice = state.totalPrice;
    }
    // console.table(newPizzaList);
    return { totalPrice: newTotalPrice, pizzaList: newPizzaList };
  }

  // Set all pizza order quantities to 0
  if (action.type === 'CLEAR_PIZZA_ORDER') {
    const newPizzaList = state.pizzaList.map((pizza) => {
      return {
        ...pizza,
        quantity: 0
      }
    });

    return { totalPrice: 0, pizzaList: newPizzaList };
  }

  if (action.type === 'ADD_PIZZA') {
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

    let newTotalPrice = state.totalPrice + +targetPizzaArrayEle.price;
    newTotalPrice = +Number.parseFloat(newTotalPrice).toFixed(2);

    return { totalPrice: newTotalPrice, pizzaList: newPizzaList };
  }

  if (action.type === 'REMOVE_PIZZA') {
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

    let newTotalPrice = state.totalPrice - +targetPizzaArrayEle.price;
    newTotalPrice = +Number.parseFloat(newTotalPrice).toFixed(2);

    return { totalPrice: newTotalPrice, pizzaList: newPizzaList };
  }

  return state;
};

const customerInfo = (state = [], action) => {
  if (action.type === 'SUBMIT_DATA') {
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
