import React from 'react';

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
  return (
    <div>
      <h2>Food</h2>
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