import React, { useState, useEffect } from 'react';
import { PlusCircle, Film } from 'lucide-react';
import '../App.css';
import axios from 'axios';

const Movies = ({ onBuy }) => {
  const [movies, setMovies] = useState([]);
  const [customMovie, setCustomMovie] = useState({
    name: '',
    description: '',
    price: ''
  });

  // Fetch movies from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/movies');
        setMovies(response.data); // Set the movies state with data from backend
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures this runs once when the component mounts

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
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="item-card">
               <h3>{movie.icon} {movie.name}</h3> 
              {/* <h3>{movie.name}</h3> */}
              <p>{movie.description}</p>
              <p>Price: ${movie.price}</p>
              <button
                className="buy-btn"
                onClick={() => onBuy(movie)}
              >
                <Film size={16} /> Buy
              </button>
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
