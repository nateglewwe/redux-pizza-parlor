import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderDetail.css';
import DetailCard from '../DetailCard/DetailCard';

export default function OrderDetail() {
  const { id } = useParams();

  const [orderInfo, setOrderInfo] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState([]);
  const [orderLineItems, setOrderLineItems] = useState([]);

  const fetchOrder = () => {
    axios
      .get('/api/order')
      .then((response) => {
        console.log('Received orders', response.data);
        const targetOrderInfo = response.data.filter((item) => {
          return item.id === +id;
        });
        setOrderInfo(targetOrderInfo[0]);
      })
      .catch((err) => {
        console.error('ERROR in client Orders GET route', err);
      });

    axios
      .get('/api/pizza')
      .then((response) => {
        console.log('Received pizzas', response.data);
        setPizzaDetails(response.data);
      })
      .catch((err) => {
        console.error('ERROR in client Orders GET route', err);
      });

    axios
      .get('/api/order/lineitems')
      .then((response) => {
        console.log('Received lineitems', response.data);
        const targetLineItems = response.data.filter((item) => {
          return item.order_id === +id;
        });
        console.log('Order Line Items:', targetLineItems);
        setOrderLineItems(targetLineItems);
      })
      .catch((err) => {
        console.error('ERROR in client Orders GET route', err);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="order-detail-div">
      <h2>Order Details:</h2>
      <div className="details-div">
        <div>
          <p>{orderInfo.customer_name}</p>
          <p>{orderInfo.street_address}</p>
          <p>{orderInfo.city}</p>
        </div>
        <div>
          <h2>For {orderInfo.type}</h2>
        </div>
      </div>
      <div className="detail-cards-div">
        {orderLineItems.map((pizzaItem) => {
          return (
            <DetailCard
              pizza={
                pizzaDetails.filter((item) => {
                  return item.id === pizzaItem.pizza_id;
                })[0]
              }
              quantity={pizzaItem.quantity}
              key={pizzaItem.id}
            />
          );
        })}
      </div>
      <div className="order-price-div">
        <h2>Order Total: ${orderInfo.total}</h2>
      </div>
    </div>
  );
}
