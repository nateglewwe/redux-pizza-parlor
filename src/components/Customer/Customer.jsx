import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import NextButton from '../NextButton/NextButton';
import BackButton from '../BackButton/BackButton';
import './Customer.css';

export default function Customer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    orderType: 'Pickup', // Default to Pickup
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderTypeChange = (e) => {
    setFormData({
      ...formData,
      orderType: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch an action with the customer information
    dispatch({
      type: 'SUBMIT_DATA',
      payload: {
        customerData: formData,
      },
    });
    // Reset the form or navigate to the next step
    // (depending on your application flow)
    history.push('/checkout');
  };

  const backBtnClk = () => {
    history.push('/');
  };

  return (
    <>
      <h1>Step Two: Customer Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="customer-form">
          <div className="customer-data fields">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip"
              onChange={handleInputChange}
            />
          </div>

          <div className="radio-container">
            <input
              type="radio"
              id="pickup"
              name="order_type"
              value="Pickup"
              checked={formData.orderType === 'Pickup'}
              onChange={handleOrderTypeChange}></input>
            <label htmlFor="pickup">Pickup</label>
            <br></br>
            <input
              type="radio"
              id="delivery"
              name="order_type"
              value="Delivery"
              checked={formData.orderType === 'Delivery'}
              onChange={handleOrderTypeChange}></input>
            <label htmlFor="delivery">Delivery</label>
            <div className="radio-container">
              <NextButton />
              <BackButton backFunction={backBtnClk}/>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
