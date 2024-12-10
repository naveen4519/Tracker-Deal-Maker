import React from 'react';

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
  return (
    <div>
      <h2>Movies</h2>
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