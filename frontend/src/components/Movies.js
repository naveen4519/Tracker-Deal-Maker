import React, { useState } from 'react';

const moviesData = [
  {
    id: 1,
    name: 'Inception',
    description: 'A mind-bending thriller about a thief who enters the dreams of others.',
    price: 15
  },
  {
    id: 2,
    name: 'The Dark Knight',
    description: 'Batman sets out to dismantle the criminal organizations that plague Gotham City.',
    price: 18
  },
  {
    id: 3,
    name: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    price: 20
  },
];

const Movies = ({ onBuy }) => {
  const [customMovie, setCustomMovie] = useState({
    name: '',
    description: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomBuy = () => {
    if (customMovie.name && customMovie.description && customMovie.price) {
      onBuy({
        name: customMovie.name,
        description: customMovie.description,
        price: parseFloat(customMovie.price)
      });

      // Reset form after buying
      setCustomMovie({
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
      <h2>Movies</h2>

      {/* Custom Movie Input */}
      <div>
        <h3>Buy a Custom Movie</h3>
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={customMovie.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Movie Description"
          value={customMovie.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={customMovie.price}
          onChange={handleInputChange}
        />
        <button onClick={handleCustomBuy}>Buy Custom Movie</button>
      </div>

      {/* Existing Movies List */}
      <h3>Available Movies</h3>
      {moviesData.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.name}</h3>
          <p>{movie.description}</p>
          <p>Price: ${movie.price}</p>
          <button onClick={() => onBuy(movie)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Movies;