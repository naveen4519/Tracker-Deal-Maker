import React, { useState } from 'react';

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
  const [customTravel, setCustomTravel] = useState({
    location: '',
    description: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomTravel(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomBuy = () => {
    if (customTravel.location && customTravel.description && customTravel.price) {
      onBuy({
        location: customTravel.location,
        description: customTravel.description,
        price: parseFloat(customTravel.price)
      });

      // Reset form after buying
      setCustomTravel({
        location: '',
        description: '',
        price: ''
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h2>Travel</h2>

      {/* Custom Travel Input */}
      <div>
        <h3>Buy a Custom Travel Destination</h3>
        <input
          type="text"
          name="location"
          placeholder="Travel Location"
          value={customTravel.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Travel Description"
          value={customTravel.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={customTravel.price}
          onChange={handleInputChange}
        />
        <button onClick={handleCustomBuy}>Buy Custom Travel</button>
      </div>

      {/* Existing Travel List */}
      <h3>Available Travel Destinations</h3>
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