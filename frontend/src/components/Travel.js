import React from 'react';

const travelData = [
  {
    id: 1,
    location: 'Paris',
    description: 'The capital city of France, famous for its art, history, and landmarks like the Eiffel Tower.',
    price: 1200
  },
  {
    id: 2,
    location: 'New York',
    description: 'A bustling metropolis known for its iconic skyline, Statue of Liberty, and Broadway shows.',
    price: 1000
  },
  {
    id: 3,
    location: 'Tokyo',
    description: 'The capital of Japan, blending traditional culture with modern innovation.',
    price: 1500
  },
];

const Travel = ({ onBuy }) => {
  return (
    <div>
      <h2>Travel</h2>
      {travelData.map((travel) => (
        <div key={travel.id}>
          <h3>{travel.location}</h3>
          <p>{travel.description}</p>
          <p>Price: ${travel.price}</p>
          <button onClick={() => onBuy(travel)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Travel;