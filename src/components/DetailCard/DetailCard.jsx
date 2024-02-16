import axios from 'axios';

import './DetailCard.css';

export default function DetailCard({ pizza, quantity }) {
  console.log('Detail Card pizza prop:', pizza);
  return (
    <div className="detail-pizza-card">
      {/* <h3>
        I am a pizza card {JSON.stringify(pizza)} {quantity}
      </h3> */}
      <div className="left">
        <img src={pizza.image_path} />
      </div>
      <div className="center">
        <h3>{pizza.name}</h3>
        <p>{pizza.description}</p>
      </div>
      <div className="right">
        <p>Price: ${pizza.price}</p>
        <p>Quanity: {quantity}</p>
        <p>Subtotal: ${quantity * pizza.price}</p>
      </div>
    </div>
  );
}
