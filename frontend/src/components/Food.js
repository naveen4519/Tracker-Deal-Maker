import React, { useState } from 'react';
import { PlusCircle, UtensilsCrossed } from 'lucide-react';
import '../App.css'

const foodData = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'A classic Italian pizza topped with tomatoes, mozzarella cheese, and fresh basil.',
    price: 10,
    icon: '🍕'
  },
  {
    id: 2,
    name: 'Sushi',
    description: 'Japanese dish consisting of vinegared rice accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.',
    price: 15,
    icon: '🍣'
  },
  {
    id: 3,
    name: 'Burger',
    description: 'A beef patty served in a bun with lettuce, tomato, cheese, and condiments.',
    price: 12,
    icon: '🍔'
  },
];

const Food = ({ onBuy }) => {
  const [customFood, setCustomFood] = useState({
    name: '',
    description: '',
    price: ''
  });

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
        {foodData.map((food) => (
          <div key={food.id} className="item-card">
            <h3>{food.icon} {food.name}</h3>
            <p>{food.description}</p>
            <p>Price: ${food.price}</p>
            <button 
              className="buy-btn" 
              onClick={() => onBuy(food)}
            >
              <UtensilsCrossed size={16} /> Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;