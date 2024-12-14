import React, { useState, useEffect } from 'react';
import { PlusCircle, Plane } from 'lucide-react';
import '../App.css';

const Travel = ({ onBuy }) => {
  const [travelDestinations, setTravelDestinations] = useState([]);
  const [customTravel, setCustomTravel] = useState({
    location: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    // Fetch travel data from backend
    fetch('http://localhost:5000/travels')  // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => setTravelDestinations(data))
      .catch((error) => console.error('Error fetching travel destinations:', error));
  }, []);

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

      // Reset form after booking
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
        {travelDestinations.length > 0 ? (
          travelDestinations.map((travel) => (
            <div key={travel._id} className="item-card">
              <h3>{travel.icon} {travel.location}</h3> {/* Display icon along with location */}
              <p>{travel.description}</p>
              <p>Price: ${travel.price.toLocaleString()}</p>
              <button
                className="buy-btn"
                onClick={() => onBuy(travel)}
              >
                <Plane size={16} /> Book
              </button>
            </div>
          ))
        ) : (
          <p>Loading destinations...</p>
        )}
      </div>
    </div>
  );
};

export default Travel;
