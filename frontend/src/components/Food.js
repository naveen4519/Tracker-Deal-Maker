import React, { useState, useEffect } from 'react';
import { PlusCircle, UtensilsCrossed } from 'lucide-react';
import '../App.css';

const Food = ({ onBuy }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [customFood, setCustomFood] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    // Fetch food data from backend
    fetch('http://localhost:5000/foods')  // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error('Error fetching food:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomFood(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomBuy = () => {
    if (customFood.name && customFood.description && customFood.price) {
      onBuy({
        name: customFood.name,
        description: customFood.description,
        price: parseFloat(customFood.price)
      });

      // Reset form after buying
      setCustomFood({
        name: '',
        description: '',
        price: ''
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="category-page">
      <h2><UtensilsCrossed size={24} /> Food</h2>

      {/* Custom Food Input */}
      <div className="custom-input-section">
        <h3><PlusCircle size={20} /> Buy a Custom Food Item</h3>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={customFood.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Food Description"
          value={customFood.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={customFood.price}
          onChange={handleInputChange}
        />
        <button
          className="buy-btn"
          onClick={handleCustomBuy}
        >
          <PlusCircle size={16} /> Buy Custom Food
        </button>
      </div>

      {/* Existing Food List */}
      <h3>Available Food</h3>
      <div className="item-list">
        {foodItems.length > 0 ? (
          foodItems.map((food) => (
            <div key={food._id} className="item-card">
              <h3>{food.icon} {food.name}</h3> {/* Display icon along with name */}
              <p>{food.description}</p>
              <p>Price: ${food.price}</p>
              <button
                className="buy-btn"
                onClick={() => onBuy(food)}
              >
                <UtensilsCrossed size={16} /> Buy
              </button>
            </div>
          ))
        ) : (
          <p>Loading food items...</p>
        )}
      </div>
    </div>
  );
};

export default Food;
