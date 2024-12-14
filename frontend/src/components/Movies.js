import React, { useState } from 'react';
import { PlusCircle, Film } from 'lucide-react';
import '../App.css'

const moviesData = [
  {
    id: 1,
    name: 'Inception',
    description: 'A sci-fi thriller about dream infiltration and reality manipulation.',
    price: 12.99,
    icon: '🎬'
  },
  {
    id: 2,
    name: 'The Shawshank Redemption',
    description: 'A powerful drama about hope and friendship in prison.',
    price: 9.99,
    icon: '🍿'
  },
  {
    id: 3,
    name: 'Interstellar',
    description: 'An epic science fiction film exploring space travel and human survival.',
    price: 14.50,
    icon: '🚀'
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
    <div className="category-page">
      <h2><Film size={24} /> Movies</h2>

      {/* Custom Movie Input */}
      <div className="custom-input-section">
        <h3><PlusCircle size={20} /> Buy a Custom Movie</h3>
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
        <button 
          className="buy-btn" 
          onClick={handleCustomBuy}
        >
          <PlusCircle size={16} /> Buy Custom Movie
        </button>
      </div>

      {/* Existing Movies List */}
      <h3>Available Movies</h3>
      <div className="item-list">
        {moviesData.map((movie) => (
          <div key={movie.id} className="item-card">
            <h3>{movie.icon} {movie.name}</h3>
            <p>{movie.description}</p>
            <p>Price: ${movie.price}</p>
            <button 
              className="buy-btn" 
              onClick={() => onBuy(movie)}
            >
              <Film size={16} /> Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;