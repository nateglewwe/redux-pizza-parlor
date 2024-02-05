import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";

// reducers go here
const orderInfo = (state = { totalPrice: 0, pizzaList: [] }, action) => {
  // State definition - object containg two key-values
  // totalPrice : integer containing order total price
  // pizzaList : array of objects with quantity, type and cost of each pizza

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
    orderInfo, // 👈 Be sure to replace this, too!
    customerInfo,
  }),
  applyMiddleware(logger)
);

export default store;
