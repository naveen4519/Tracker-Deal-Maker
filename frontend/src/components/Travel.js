// Travel.js
import React from 'react';

const travelData = [
  {
    location: 'Paris',
    description: 'The capital city of France, famous for its art, history, and landmarks like the Eiffel Tower.',
    price: 1200
  },
  {
    location: 'New York',
    description: 'A bustling metropolis known for its iconic skyline, Statue of Liberty, and Broadway shows.',
    price: 1000
  },
  {
    location: 'Tokyo',
    description: 'The capital of Japan, blending traditional culture with modern innovation.',
    price: 1500
  },
];

const Travel = ({ onBuy }) => {
  return (
    <div>
      <h2>Travel</h2>
      {travelData.map((travel, index) => (
        <div key={index}>
          <h3>{travel.location}</h3>
          <p>{travel.description}</p>
          <p>Price: ${travel.price}</p>
          <button onClick={() => onBuy(travel.price)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Travel;
