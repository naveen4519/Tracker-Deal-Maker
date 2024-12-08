// Movies.js
import React from 'react';

const moviesData = [
  {
    name: 'Inception',
    description: 'A mind-bending thriller about a thief who enters the dreams of others.',
    price: 15
  },
  {
    name: 'The Dark Knight',
    description: 'Batman sets out to dismantle the criminal organizations that plague Gotham City.',
    price: 18
  },
  {
    name: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    price: 20
  },
];

const Movies = ({ onBuy }) => {
  return (
    <div>
      <h2>Movies</h2>
      {moviesData.map((movie, index) => (
        <div key={index}>
          <h3>{movie.name}</h3>
          <p>{movie.description}</p>
          <p>Price: ${movie.price}</p>
          <button onClick={() => onBuy(movie.price)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Movies;
