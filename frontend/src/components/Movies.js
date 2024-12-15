import React, { useState, useEffect } from 'react';
import { PlusCircle, Film } from 'lucide-react';
import '../App.css';

const Movies = ({ onBuy }) => {
  const [movies, setMovies] = useState([]);
  const [customMovie, setCustomMovie] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [purchaseSuccessItemId, setPurchaseSuccessItemId] = useState(null);  // Track the purchased item ID

  useEffect(() => {
    // Fetch movies data from backend
    fetch('http://localhost:5000/movies')  // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomBuy = () => {
    if (customMovie.title && customMovie.description && customMovie.price) {
      onBuy({
        title: customMovie.title,
        description: customMovie.description,
        price: parseFloat(customMovie.price)
      });

      // Set the purchased item ID for the success message
      setPurchaseSuccessItemId('custom'); // 'custom' represents custom movie
      setTimeout(() => setPurchaseSuccessItemId(null), 500); // Hide after 0.5 seconds

      // Reset form after booking
      setCustomMovie({
        title: '',
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
          name="title"
          placeholder="Movie Title"
          value={customMovie.title}
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

        {/* Display Success Message only for custom item */}
        {purchaseSuccessItemId === 'custom' && (
          <div className="success-message">
            Successfully Purchased!
          </div>
        )}
      </div>

      {/* Existing Movies List */}
      <h3>Available Movies</h3>
      <div className="item-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="item-card">
              <h3>{movie.icon} {movie.title}</h3> {/* Display icon along with title */}
              <p>{movie.description}</p>
              <p>Price: ${movie.price.toLocaleString()}</p>
              <button
                className="buy-btn"
                onClick={() => {
                  onBuy(movie);

                  // Set the purchased item ID for the success message
                  setPurchaseSuccessItemId(movie._id);
                  setTimeout(() => setPurchaseSuccessItemId(null), 500); // Hide after 0.5 seconds
                }}
              >
                <Film size={16} /> Buy
              </button>

              {/* Display Success Message only for the purchased item */}
              {purchaseSuccessItemId === movie._id && (
                <div className="success-message">
                  Successfully Purchased!
                </div>
              )}
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
