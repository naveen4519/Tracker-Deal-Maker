import React, { useState } from 'react';

const foodData = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'A classic Italian pizza topped with tomatoes, mozzarella cheese, and fresh basil.',
    price: 10
  },
  {
    id: 2,
    name: 'Sushi',
    description: 'Japanese dish consisting of vinegared rice accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.',
    price: 15
  },
  {
    id: 3,
    name: 'Burger',
    description: 'A beef patty served in a bun with lettuce, tomato, cheese, and condiments.',
    price: 12
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
    <div>
      <h2>Food</h2>

      {/* Custom Food Input */}
      <div>
        <h3>Buy a Custom Food Item</h3>
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
        <button onClick={handleCustomBuy}>Buy Custom Food</button>
      </div>

      {/* Existing Food List */}
      <h3>Available Food</h3>
      {foodData.map((food) => (
        <div key={food.id}>
          <h3>{food.name}</h3>
          <p>{food.description}</p>
          <p>Price: ${food.price}</p>
          <button onClick={() => onBuy(food)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Food;