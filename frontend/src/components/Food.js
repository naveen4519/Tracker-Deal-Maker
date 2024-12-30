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
  const [purchaseSuccessItemId, setPurchaseSuccessItemId] = useState(null);  // Track the purchased item ID

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

      // Set the purchased item ID for the success message
      setPurchaseSuccessItemId('custom'); // 'custom' represents custom food item
      setTimeout(() => setPurchaseSuccessItemId(null), 500); // Hide after 0.5 seconds

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



  const handleBuy = (item) => {
    const purchase = {
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      category: 'food',
      timestamp: new Date().toISOString(),
    };

    // Send the purchase data to the backend
    fetch('http://localhost:5000/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchase),
    })
      .then((response) => response.json())
      .then(() => {
        setPurchaseSuccessItemId(item._id); // Set the purchased item's ID
        setTimeout(() => setPurchaseSuccessItemId(null), 1000); // Hide success message after 1 second
      })
      .catch((error) => console.error('Error saving purchase:', error));
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

        {/* Display Success Message only for custom item */}
        {purchaseSuccessItemId === 'custom' && (
          <div className="success-message">
            Successfully Purchased!
          </div>
        )}
      </div>

      {/* Existing Food List */}
      <h3>Available Food</h3>
      <div className="item-list">
        {foodItems.length > 0 ? (
          foodItems.map((food) => (
            <div key={food._id} className="item-card">
              <h3>{food.icon} {food.name}</h3> {/* Display icon along with name */}
              <p>{food.description}</p>
              <p>Price: ${food.price.toLocaleString()}</p>
              <button
                className="buy-btn"
                onClick={() => handleBuy(food)}
              >
                <UtensilsCrossed size={16} /> Buy
              </button>

              {/* Display Success Message only for the purchased item */}
              {purchaseSuccessItemId === food._id && (
                <div className="success-message">
                  Successfully Purchased!
                </div>
              )}
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
