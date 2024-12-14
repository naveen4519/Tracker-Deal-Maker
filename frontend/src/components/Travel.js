import React, { useState } from 'react';
import { PlusCircle, Plane } from 'lucide-react';
import '../App.css'

const travelData = [
  {
    id: 1,
    location: 'Paris, France',
    description: 'A romantic getaway to the City of Lights',
    price: 1500.00,
    icon: '🗼'
  },
  {
    id: 2,
    location: 'Tokyo, Japan',
    description: 'An exciting trip to explore Japanese culture and technology',
    price: 2000.00,
    icon: '🏯'
  },
  {
    id: 3,
    location: 'New York City, USA',
    description: 'An urban adventure in the Big Apple',
    price: 1200.00,
    icon: '🗽'
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
    <div className="category-page">
      <h2><Plane size={24} /> Travel</h2>

      {/* Custom Travel Input */}
      <div className="custom-input-section">
        <h3><PlusCircle size={20} /> Book a Custom Travel Destination</h3>
        <input
          type="text"
          name="location"
          placeholder="Destination"
          value={customTravel.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Trip Description"
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
        <button 
          className="buy-btn" 
          onClick={handleCustomBuy}
        >
          <PlusCircle size={16} /> Book Custom Destination
        </button>
      </div>

      {/* Existing Travel Destinations List */}
      <h3>Available Destinations</h3>
      <div className="item-list">
        {travelData.map((travel) => (
          <div key={travel.id} className="item-card">
            <h3>{travel.icon} {travel.location}</h3>
            <p>{travel.description}</p>
            <p>Price: ${travel.price.toLocaleString()}</p>
            <button 
              className="buy-btn" 
              onClick={() => onBuy(travel)}
            >
              <Plane size={16} /> Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Travel;